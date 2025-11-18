const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// Import all models
const Faculty = require('./models/Faculty');
const Gallery = require('./models/Gallery');
const NewsEvent = require('./models/NewsEvent');
const Program = require('./models/Program');
const Slideshow = require('./models/Slideshow');
const Research = require('./models/Research');
const Partner = require('./models/Partner');
const FarmerResource = require('./models/FarmerResource');
const Incubation = require('./models/Incubation');
const Content = require('./models/Content');

// Configuration
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DRY_RUN = process.argv.includes('--dry-run') || process.argv.includes('-d');
const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Statistics
let stats = {
  totalFiles: 0,
  referencedFiles: 0,
  orphanedFiles: 0,
  deletedFiles: 0,
  errors: 0,
  bytesSaved: 0
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Extract file paths from various model fields
async function collectReferencedFiles() {
  const referencedFiles = new Set();

  log('\n📋 Collecting referenced files from database...', 'cyan');

  try {
    // Faculty - image field
    const faculties = await Faculty.find({}).select('image');
    faculties.forEach(f => {
      if (f.image) referencedFiles.add(f.image);
    });
    log(`  ✓ Faculty: ${faculties.length} records`, 'green');

    // Gallery - imageUrl and imagePath
    const galleries = await Gallery.find({}).select('imageUrl imagePath');
    galleries.forEach(g => {
      if (g.imageUrl) referencedFiles.add(g.imageUrl);
      if (g.imagePath) referencedFiles.add(g.imagePath);
    });
    log(`  ✓ Gallery: ${galleries.length} records`, 'green');

    // NewsEvent - images array and attachments
    const newsEvents = await NewsEvent.find({}).select('images attachments');
    newsEvents.forEach(n => {
      if (n.images && Array.isArray(n.images)) {
        n.images.forEach(img => {
          if (img.url) referencedFiles.add(img.url);
        });
      }
      if (n.attachments && Array.isArray(n.attachments)) {
        n.attachments.forEach(att => {
          if (att.url) referencedFiles.add(att.url);
        });
      }
    });
    log(`  ✓ News/Events: ${newsEvents.length} records`, 'green');

    // Programs - image field
    const programs = await Program.find({}).select('image');
    programs.forEach(p => {
      if (p.image) referencedFiles.add(p.image);
    });
    log(`  ✓ Programs: ${programs.length} records`, 'green');

    // Slideshow - image field
    const slideshows = await Slideshow.find({}).select('image');
    slideshows.forEach(s => {
      if (s.image) referencedFiles.add(s.image);
    });
    log(`  ✓ Slideshow: ${slideshows.length} records`, 'green');

    // Research - images, documents, filename
    const researches = await Research.find({}).select('images documents filename');
    researches.forEach(r => {
      if (r.filename) referencedFiles.add(r.filename);
      if (r.images && Array.isArray(r.images)) {
        r.images.forEach(img => {
          if (img.url) referencedFiles.add(img.url);
        });
      }
      if (r.documents && Array.isArray(r.documents)) {
        r.documents.forEach(doc => {
          if (doc.url) referencedFiles.add(doc.url);
        });
      }
    });
    log(`  ✓ Research: ${researches.length} records`, 'green');

    // Partners - logo field
    const partners = await Partner.find({}).select('logo');
    partners.forEach(p => {
      if (p.logo) referencedFiles.add(p.logo);
    });
    log(`  ✓ Partners: ${partners.length} records`, 'green');

    // FarmerResource - filename field
    const farmerResources = await FarmerResource.find({}).select('filename');
    farmerResources.forEach(f => {
      if (f.filename) referencedFiles.add(f.filename);
    });
    log(`  ✓ Farmer Resources: ${farmerResources.length} records`, 'green');

    // Incubation - image and filename
    const incubations = await Incubation.find({}).select('image filename');
    incubations.forEach(i => {
      if (i.image) referencedFiles.add(i.image);
      if (i.filename) referencedFiles.add(i.filename);
    });
    log(`  ✓ Incubation: ${incubations.length} records`, 'green');

    // Content - images array
    const contents = await Content.find({}).select('images');
    contents.forEach(c => {
      if (c.images && Array.isArray(c.images)) {
        c.images.forEach(img => {
          if (img.url) referencedFiles.add(img.url);
        });
      }
    });
    log(`  ✓ Content: ${contents.length} records`, 'green');

    stats.referencedFiles = referencedFiles.size;
    log(`\n✅ Found ${referencedFiles.size} referenced files in database`, 'green');

    return referencedFiles;
  } catch (error) {
    log(`\n❌ Error collecting referenced files: ${error.message}`, 'red');
    throw error;
  }
}

// Normalize file path to match database references
function normalizeFilePath(filePath) {
  // Remove /uploads/ prefix if present
  let normalized = filePath.replace(/^\/uploads\//, '').replace(/^uploads[\/\\]/, '');
  
  // Convert backslashes to forward slashes
  normalized = normalized.replace(/\\/g, '/');
  
  return normalized;
}

// Get all files recursively from a directory
async function getAllFiles(dirPath, arrayOfFiles = []) {
  try {
    const files = await fs.readdir(dirPath);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        // Skip .gitkeep or system files
        if (file !== '.gitkeep') {
          arrayOfFiles = await getAllFiles(fullPath, arrayOfFiles);
        }
      } else {
        // Skip .gitkeep files
        if (file !== '.gitkeep') {
          arrayOfFiles.push({
            fullPath,
            relativePath: path.relative(UPLOADS_DIR, fullPath),
            size: stat.size
          });
        }
      }
    }

    return arrayOfFiles;
  } catch (error) {
    log(`Error reading directory ${dirPath}: ${error.message}`, 'red');
    stats.errors++;
    return arrayOfFiles;
  }
}

// Check if a file is referenced in the database
function isFileReferenced(filePath, referencedFiles) {
  const normalized = normalizeFilePath(filePath);
  
  // Check various formats that might be stored in DB
  const possibleFormats = [
    normalized,
    `/uploads/${normalized}`,
    `uploads/${normalized}`,
    path.basename(filePath),
    `/${normalized}`,
    normalized.replace(/\//g, '\\')
  ];

  for (const format of possibleFormats) {
    if (referencedFiles.has(format)) {
      return true;
    }
  }

  return false;
}

// Delete a file
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    log(`  ❌ Error deleting ${filePath}: ${error.message}`, 'red');
    stats.errors++;
    return false;
  }
}

// Main cleanup function
async function cleanupUnusedFiles() {
  log('\n' + '='.repeat(60), 'cyan');
  log('🧹 CLEANUP UNUSED FILES SCRIPT', 'cyan');
  log('='.repeat(60), 'cyan');

  if (DRY_RUN) {
    log('\n⚠️  DRY RUN MODE - No files will be deleted', 'yellow');
  } else {
    log('\n⚠️  LIVE MODE - Files will be permanently deleted!', 'red');
    log('⚠️  Make sure you have a backup before proceeding!', 'red');
  }

  try {
    // Connect to MongoDB
    log('\n🔌 Connecting to MongoDB...', 'cyan');
    await mongoose.connect(process.env.MONGODB_URI);
    log('✅ Connected to MongoDB', 'green');

    // Collect all referenced files from database
    const referencedFiles = await collectReferencedFiles();

    // Get all files from uploads directory
    log('\n📁 Scanning uploads directory...', 'cyan');
    const allFiles = await getAllFiles(UPLOADS_DIR);
    stats.totalFiles = allFiles.length;
    log(`✅ Found ${allFiles.length} files in uploads directory`, 'green');

    // Find orphaned files
    log('\n🔍 Identifying orphaned files...', 'cyan');
    const orphanedFiles = [];

    for (const file of allFiles) {
      if (!isFileReferenced(file.relativePath, referencedFiles)) {
        orphanedFiles.push(file);
        stats.orphanedFiles++;
        stats.bytesSaved += file.size;
      }
    }

    // Display results
    log('\n' + '='.repeat(60), 'cyan');
    log('📊 CLEANUP REPORT', 'cyan');
    log('='.repeat(60), 'cyan');
    log(`Total files scanned:     ${stats.totalFiles}`, 'blue');
    log(`Referenced in database:  ${stats.totalFiles - stats.orphanedFiles}`, 'green');
    log(`Orphaned files found:    ${stats.orphanedFiles}`, 'yellow');
    log(`Space to be freed:       ${(stats.bytesSaved / (1024 * 1024)).toFixed(2)} MB`, 'magenta');

    if (orphanedFiles.length === 0) {
      log('\n✅ No orphaned files found! Everything is clean.', 'green');
      return;
    }

    // Show orphaned files
    log('\n📋 Orphaned files:', 'yellow');
    orphanedFiles.forEach((file, index) => {
      const sizeKB = (file.size / 1024).toFixed(2);
      if (VERBOSE) {
        log(`  ${index + 1}. ${file.relativePath} (${sizeKB} KB)`, 'yellow');
      }
    });

    if (!VERBOSE && orphanedFiles.length > 10) {
      log(`  ... and ${orphanedFiles.length - 10} more files`, 'yellow');
      log('\n  Use --verbose flag to see all files', 'cyan');
    }

    // Delete files if not in dry-run mode
    if (!DRY_RUN) {
      log('\n🗑️  Deleting orphaned files...', 'red');
      
      for (const file of orphanedFiles) {
        const deleted = await deleteFile(file.fullPath);
        if (deleted) {
          stats.deletedFiles++;
          if (VERBOSE) {
            log(`  ✓ Deleted: ${file.relativePath}`, 'green');
          }
        }
      }

      log(`\n✅ Deleted ${stats.deletedFiles} orphaned files`, 'green');
      log(`✅ Freed ${(stats.bytesSaved / (1024 * 1024)).toFixed(2)} MB of space`, 'green');
    } else {
      log('\n💡 Run without --dry-run flag to delete these files', 'cyan');
    }

    if (stats.errors > 0) {
      log(`\n⚠️  ${stats.errors} errors occurred during cleanup`, 'yellow');
    }

  } catch (error) {
    log(`\n❌ Fatal error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  } finally {
    // Close MongoDB connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      log('\n🔌 Disconnected from MongoDB', 'cyan');
    }
  }

  log('\n' + '='.repeat(60), 'cyan');
  log('✅ Cleanup completed!', 'green');
  log('='.repeat(60) + '\n', 'cyan');
}

// Run the script
cleanupUnusedFiles().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
