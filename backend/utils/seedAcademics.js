const mongoose = require('mongoose');
const AcademicsPage = require('../models/AcademicsPage');
require('dotenv').config();

const academicsData = {
  departments: [
    {
      name: 'Aquaculture',
      description: 'Fish culture, breeding, and production techniques',
      icon: 'fish'
    },
    {
      name: 'Fishery Resource Management',
      description: 'Sustainable fishery and resource conservation',
      icon: 'shield'
    },
    {
      name: 'Fish Processing Technology',
      description: 'Food technology and value addition in fishery',
      icon: 'gear'
    },
    {
      name: 'Aquatic Environment Management',
      description: 'Environmental aspects of aquatic ecosystems',
      icon: 'leaf'
    }
  ],
  calendar: {
    events: [
      { event: 'Admission Opens', date: 'June 2025' },
      { event: 'Classes Begin', date: 'July 2025' },
      { event: 'Mid-term Examinations', date: 'October 2025' },
      { event: 'Final Examinations', date: 'December 2025' },
      { event: 'Results Declaration', date: 'January 2026' },
      { event: 'Summer Vacation', date: 'April-May 2026' }
    ]
  },
  regulations: [
    {
      title: 'Attendance',
      description: 'Minimum 75% attendance required for all subjects'
    },
    {
      title: 'Examinations',
      description: 'Mid-term and final examination system with continuous assessment'
    },
    {
      title: 'Grading',
      description: 'Credit-based grading system (CBGS) with letter grades'
    },
    {
      title: 'Practical Work',
      description: 'Mandatory field work and laboratory practicals'
    }
  ],
  faculty: {
    title: 'Expert Faculty Members',
    description: 'Our highly qualified and experienced faculty members specialize in various fields of fishery science, bringing decades of research and industry experience to provide world-class education.'
  }
};

async function seedAcademicsPage() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cof');
    console.log('Connected to MongoDB');

    // Clear existing academics page data
    await AcademicsPage.deleteMany({});
    console.log('Cleared existing academics page data');

    // Insert new academics page data
    const academicsPage = new AcademicsPage(academicsData);
    await academicsPage.save();
    
    console.log('✅ Successfully seeded academics page data!');
    console.log(`📄 Created academics page with:`);
    console.log(`   - ${academicsData.departments.length} departments`);
    console.log(`   - ${academicsData.calendar.events.length} calendar events`);
    console.log(`   - ${academicsData.regulations.length} academic regulations`);
    console.log(`   - Faculty section configured`);

  } catch (error) {
    console.error('❌ Error seeding academics page:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the seeding function
seedAcademicsPage();