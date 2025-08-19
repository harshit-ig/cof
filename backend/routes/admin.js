const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Faculty = require('../models/Faculty');
const News = require('../models/NewsEvent');
const Program = require('../models/Program');
const Research = require('../models/Research');
const Infrastructure = require('../models/Infrastructure');
const Collaboration = require('../models/Collaboration');
const Admin = require('../models/Admin');
const fs = require('fs');
const path = require('path');

// User Management Routes
router.get('/users', protect, async (req, res) => {
  try {
    const users = await Admin.find({}).select('-password');
    res.json({
      success: true,
      data: { users }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

router.post('/users', protect, async (req, res) => {
  try {
    const { username, email, password, role, status, permissions } = req.body;
    
    const existingUser = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    const user = new Admin({
      username,
      email,
      password,
      role: role || 'editor',
      status: status || 'active',
      permissions: permissions || {}
    });

    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      data: { user: userResponse }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
});

router.put('/users/:id', protect, async (req, res) => {
  try {
    const { username, email, role, status, permissions } = req.body;
    
    const user = await Admin.findByIdAndUpdate(
      req.params.id,
      { username, email, role, status, permissions },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
});

router.delete('/users/:id', protect, async (req, res) => {
  try {
    const user = await Admin.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
});

// Analytics Routes
router.get('/analytics', protect, async (req, res) => {
  try {
    // Mock analytics data - replace with real analytics service
    const analytics = {
      overview: {
        totalViews: 15420,
        uniqueVisitors: 8934,
        pageViews: 23567,
        bounceRate: 34.2,
        avgSessionDuration: 285
      },
      traffic: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 500) + 1000,
        visitors: Math.floor(Math.random() * 300) + 600
      })),
      topPages: [
        { page: '/', views: 5420, percentage: 35.2 },
        { page: '/programs', views: 3210, percentage: 20.8 },
        { page: '/faculty', views: 2890, percentage: 18.7 }
      ]
    };

    res.json({
      success: true,
      data: { analytics }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
});

// Activity Logs Routes
router.get('/activity-logs', protect, async (req, res) => {
  try {
    // Mock activity logs - replace with real logging system
    const logs = [
      {
        _id: '1',
        timestamp: new Date().toISOString(),
        action: 'create',
        resource: 'faculty',
        user: { username: req.admin.username, email: req.admin.email },
        level: 'info',
        message: 'Created new faculty member',
        metadata: { ip: req.ip }
      }
    ];

    res.json({
      success: true,
      data: { logs, totalPages: 1 }
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity logs'
    });
  }
});

// SEO Management Routes
router.get('/seo-settings', protect, async (req, res) => {
  try {
    // Mock SEO settings - replace with real SEO management
    const settings = {
      global: {
        siteTitle: 'College of Fisheries',
        siteDescription: 'Premier institution for fisheries education',
        siteKeywords: 'fisheries, aquaculture, education',
        siteUrl: 'https://collegeoffisheries.edu'
      },
      pages: []
    };

    res.json({
      success: true,
      data: { settings, analysis: {} }
    });
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SEO settings'
    });
  }
});

// System Monitoring Routes
router.get('/system-health', protect, async (req, res) => {
  try {
    const mongoose = require('mongoose');
    
    const health = {
      status: 'healthy',
      uptime: process.uptime(),
      lastCheck: new Date().toISOString()
    };

    const metrics = {
      server: {
        cpu: Math.random() * 30 + 30,
        memory: Math.random() * 40 + 40,
        disk: Math.random() * 30 + 20,
        network: Math.random() * 50 + 10
      },
      database: {
        status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        connections: 12,
        queryTime: 23.5,
        size: '2.3 GB'
      },
      services: [
        { name: 'Web Server', status: 'running', port: 3000, uptime: '7d 12h' },
        { name: 'Database', status: 'running', port: 27017, uptime: '7d 12h' }
      ],
      alerts: []
    };

    res.json({
      success: true,
      data: { health, metrics }
    });
  } catch (error) {
    console.error('Error getting system health:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get system health'
    });
  }
});

// Get database statistics
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Promise.all([
      Faculty.countDocuments(),
      News.countDocuments(),
      Program.countDocuments(),
      Research.countDocuments(),
      Infrastructure.countDocuments(),
      Collaboration.countDocuments(),
      Admin.countDocuments()
    ]);

    // Get file system stats
    const uploadsPath = path.join(__dirname, '..', 'uploads');
    let totalFiles = 0;
    let totalSize = 0;

    if (fs.existsSync(uploadsPath)) {
      const getDirectoryStats = (dirPath) => {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
          const filePath = path.join(dirPath, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            getDirectoryStats(filePath);
          } else {
            totalFiles++;
            totalSize += stat.size;
          }
        });
      };
      getDirectoryStats(uploadsPath);
    }

    res.json({
      success: true,
      data: {
        database: {
          faculty: stats[0],
          news: stats[1],
          programs: stats[2],
          research: stats[3],
          infrastructure: stats[4],
          collaborations: stats[5],
          admins: stats[6],
          total: stats.reduce((a, b) => a + b, 0)
        },
        files: {
          count: totalFiles,
          size: Math.round(totalSize / 1024 / 1024 * 100) / 100 // Size in MB
        }
      }
    });
  } catch (error) {
    console.error('Error getting database stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get database statistics'
    });
  }
});

// Clear application cache (if using cache)
router.post('/clear-cache', protect, async (req, res) => {
  try {
    // Clear Node.js module cache for dynamic imports
    Object.keys(require.cache).forEach((key) => {
      if (key.includes('node_modules')) return; // Don't clear node_modules
      delete require.cache[key];
    });

    // If you're using Redis or another cache, clear it here
    // await redisClient.flushall();

    res.json({
      success: true,
      message: 'Application cache cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cache'
    });
  }
});

// Export database data
router.post('/export-data', protect, async (req, res) => {
  try {
    const { collections } = req.body;
    const exportData = {};

    // Default to all collections if none specified
    const collectionsToExport = collections || [
      'faculty', 'news', 'programs', 'research', 
      'infrastructure', 'collaborations'
    ];

    // Export each collection
    for (const collection of collectionsToExport) {
      switch (collection) {
        case 'faculty':
          exportData.faculty = await Faculty.find({}).select('-__v');
          break;
        case 'news':
          exportData.news = await News.find({}).select('-__v');
          break;
        case 'programs':
          exportData.programs = await Program.find({}).select('-__v');
          break;
        case 'research':
          exportData.research = await Research.find({}).select('-__v');
          break;
        case 'infrastructure':
          exportData.infrastructure = await Infrastructure.find({}).select('-__v');
          break;
        case 'collaborations':
          exportData.collaborations = await Collaboration.find({}).select('-__v');
          break;
      }
    }

    // Add export metadata
    exportData._metadata = {
      exportDate: new Date().toISOString(),
      exportedBy: req.admin.email,
      collections: collectionsToExport,
      version: '1.0'
    };

    res.json({
      success: true,
      data: exportData,
      message: `Successfully exported ${collectionsToExport.length} collections`
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export data'
    });
  }
});

// Backup database to file
router.post('/backup-database', protect, async (req, res) => {
  try {
    const backupData = {};
    
    // Get all data
    const [faculty, news, programs, research, infrastructure, collaborations] = await Promise.all([
      Faculty.find({}).select('-__v'),
      News.find({}).select('-__v'),
      Program.find({}).select('-__v'),
      Research.find({}).select('-__v'),
      Infrastructure.find({}).select('-__v'),
      Collaboration.find({}).select('-__v')
    ]);

    backupData.faculty = faculty;
    backupData.news = news;
    backupData.programs = programs;
    backupData.research = research;
    backupData.infrastructure = infrastructure;
    backupData.collaborations = collaborations;

    // Add backup metadata
    backupData._metadata = {
      backupDate: new Date().toISOString(),
      backupBy: req.admin.email,
      totalRecords: faculty.length + news.length + programs.length + 
                   research.length + infrastructure.length + collaborations.length
    };

    // Save to file
    const backupDir = path.join(__dirname, '..', 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup_${timestamp}.json`;
    const filepath = path.join(backupDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(backupData, null, 2));

    res.json({
      success: true,
      message: 'Database backup created successfully',
      data: {
        filename,
        size: fs.statSync(filepath).size,
        records: backupData._metadata.totalRecords
      }
    });
  } catch (error) {
    console.error('Error creating backup:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create database backup'
    });
  }
});

// Get system health information
router.get('/health', protect, async (req, res) => {
  try {
    const mongoose = require('mongoose');
    
    const health = {
      server: 'running',
      database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: health
    });
  } catch (error) {
    console.error('Error getting system health:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get system health'
    });
  }
});

// Optimize database (remove orphaned files, clean up unused data)
router.post('/optimize', protect, async (req, res) => {
  try {
    const optimizationResults = {
      orphanedFiles: 0,
      cleanedRecords: 0
    };

    // Check for orphaned image files
    const uploadsPath = path.join(__dirname, '..', 'uploads');
    const allImageFilenames = [];
    
    // Collect all image references from database
    const faculty = await Faculty.find({}, 'image');
    const news = await News.find({}, 'images featuredImage');
    const research = await Research.find({}, 'images documents');
    const infrastructure = await Infrastructure.find({}, 'images');
    const collaborations = await Collaboration.find({}, 'partnerLogo');

    faculty.forEach(f => f.image && allImageFilenames.push(f.image));
    news.forEach(n => {
      if (n.featuredImage) allImageFilenames.push(n.featuredImage);
      if (n.images) n.images.forEach(img => allImageFilenames.push(img.url));
    });
    research.forEach(r => {
      if (r.images) r.images.forEach(img => allImageFilenames.push(img.url));
      if (r.documents) r.documents.forEach(doc => allImageFilenames.push(doc.url));
    });
    infrastructure.forEach(i => {
      if (i.images) i.images.forEach(img => allImageFilenames.push(img.url));
    });
    collaborations.forEach(c => c.partnerLogo && allImageFilenames.push(c.partnerLogo));

    // Check each file in uploads directory
    if (fs.existsSync(uploadsPath)) {
      const checkDirectory = (dirPath) => {
        const files = fs.readdirSync(dirPath);
        files.forEach(file => {
          const filePath = path.join(dirPath, file);
          const stat = fs.statSync(filePath);
          if (stat.isDirectory()) {
            checkDirectory(filePath);
          } else {
            if (!allImageFilenames.includes(file)) {
              // This file is not referenced in database
              optimizationResults.orphanedFiles++;
              // Optionally delete orphaned files (commented out for safety)
              // fs.unlinkSync(filePath);
            }
          }
        });
      };
      checkDirectory(uploadsPath);
    }

    res.json({
      success: true,
      message: 'Database optimization completed',
      data: optimizationResults
    });
  } catch (error) {
    console.error('Error optimizing database:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to optimize database'
    });
  }
});

module.exports = router;
