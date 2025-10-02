// Test script to create a sample program with slug
const mongoose = require('mongoose');
require('dotenv').config();

const Program = require('./models/Program');

const testProgram = {
  title: 'Bachelor of Fishery Science',
  slug: 'bachelor-fishery-science', // Custom slug for SEO-friendly URL
  shortName: 'B.F.Sc.',
  description: 'Comprehensive undergraduate program in fishery science and aquaculture',
  overview: 'A comprehensive 4-year undergraduate program designed to provide students with strong foundation in fishery science.',
  duration: '4 Years (8 Semesters)',
  eligibility: {
    qualification: '10+2 or equivalent',
    subjects: 'Physics, Chemistry, Biology/Mathematics',
    percentage: '50% aggregate marks',
    entrance: 'Valid entrance test score'
  },
  detailedCurriculum: {
    semester1: [
      'Mathematics and Statistics',
      'Physics',
      'Chemistry',
      'Biology',
      'Introduction to Fisheries'
    ],
    semester2: [
      'Biochemistry',
      'Cell Biology',
      'Genetics',
      'Ecology',
      'Fish Biology'
    ],
    semester3: [
      'Fish Physiology',
      'Microbiology',
      'Taxonomy',
      'Limnology',
      'Soil Science'
    ],
    semester4: [
      'Fish Nutrition',
      'Fish Pathology',
      'Aquaculture Engineering',
      'Fish Breeding',
      'Fishery Statistics'
    ]
  },
  fees: {
    tuition: '₹50,000',
    hostel: '₹25,000',
    mess: '₹30,000',
    total: '₹1,05,000',
    annual: 105000
  },
  intake: 60,
  highlights: [
    'Comprehensive curriculum',
    'Practical training in hatcheries',
    'Field visits and internships',
    'Research project opportunities',
    'Industry exposure programs',
    'Placement assistance'
  ],
  careerOpportunities: [
    'Fishery Officer',
    'Aquaculture Manager',
    'Fish Farm Consultant',
    'Research Assistant',
    'Extension Officer',
    'Quality Control Officer'
  ],
  admissionProcess: {
    process: 'Entrance Test + Counseling',
    application: 'Online application',
    importantDates: [
      { event: 'Application Start', date: 'March 1, 2025' },
      { event: 'Application End', date: 'May 15, 2025' },
      { event: 'Entrance Test', date: 'June 10, 2025' },
      { event: 'Result Declaration', date: 'June 25, 2025' }
    ]
  },
  department: 'Fishery Science',
  level: 'undergraduate',
  isActive: true
};

async function createTestProgram() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cof');
    console.log('Connected to MongoDB');
    
    // Check if program already exists
    const existing = await Program.findOne({ slug: testProgram.slug });
    if (existing) {
      console.log('Test program already exists');
      return;
    }
    
    const program = new Program(testProgram);
    await program.save();
    
    console.log('Test program created successfully!');
    console.log('Slug:', program.slug);
    console.log('URL will be: /programs/bachelor-fishery-science');
    
  } catch (error) {
    console.error('Error creating test program:', error);
  } finally {
    await mongoose.connection.close();
  }
}

createTestProgram();