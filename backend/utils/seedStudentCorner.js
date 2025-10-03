const mongoose = require('mongoose');
const StudentCorner = require('../models/StudentCorner');

// Student Corner seed data
const getStudentCornerData = () => {
  return [
    // Admission Guidelines
    {
      type: 'admission',
      category: 'Eligibility Criteria',
      description: 'Academic qualifications and requirements for admission to B.F.Sc and M.F.Sc programs.',
      guidelines: [
        'B.F.Sc: 10+2 with Physics, Chemistry, Biology/Mathematics (50% marks)',
        'M.F.Sc: B.F.Sc or equivalent degree (55% marks)',
        'Age limit: 17-25 years for UG, 21-35 years for PG',
        'Relaxation in marks and age as per Government norms',
        'Valid entrance test score (AUAT/NET/GATE as applicable)'
      ],
      sortOrder: 1,
      isActive: true
    },
    {
      type: 'admission',
      category: 'Application Process',
      description: 'Step-by-step procedure for submitting admission applications.',
      guidelines: [
        'Online application through university portal',
        'Upload required documents in prescribed format',
        'Payment of application fee through online mode',
        'Print application form after successful submission',
        'Submit hard copy with documents at college office'
      ],
      sortOrder: 2,
      isActive: true
    },
    {
      type: 'admission',
      category: 'Required Documents',
      description: 'List of documents to be submitted along with the application form.',
      guidelines: [
        'Mark sheets and certificates of qualifying examination',
        'Transfer certificate and migration certificate',
        'Character certificate from head of last institution',
        'Caste certificate (if applicable)',
        'Income certificate (for fee concession)',
        'Medical fitness certificate',
        'Recent passport size photographs'
      ],
      sortOrder: 3,
      isActive: true
    },
    {
      type: 'admission',
      category: 'Important Dates',
      description: 'Key dates and deadlines for admission process.',
      guidelines: [
        'Application Start Date: May 15, 2025',
        'Last Date for Application: June 15, 2025',
        'Entrance Test Date: June 25, 2025',
        'Merit List Publication: July 5, 2025',
        'Counseling and Admission: July 10-20, 2025',
        'Commencement of Classes: August 1, 2025'
      ],
      sortOrder: 4,
      isActive: true
    },
    // Scholarships
    {
      type: 'scholarships',
      name: 'Merit-cum-Means Scholarship',
      description: 'Government scholarship for meritorious students from economically weaker sections.',
      eligibility: 'Students with >75% marks and annual family income <₹2 lakh',
      amount: '₹12,000 per year',
      duration: 'Throughout the course',
      benefits: [
        'Tuition fee waiver',
        'Maintenance allowance',
        'Book allowance',
        'Hostel fee concession'
      ],
      sortOrder: 1,
      isActive: true
    },
    {
      type: 'scholarships',
      name: 'SC/ST Scholarship',
      description: 'Special scholarship scheme for scheduled caste and scheduled tribe students.',
      eligibility: 'Students belonging to SC/ST category',
      amount: '₹15,000 per year',
      duration: 'Throughout the course',
      benefits: [
        'Complete fee waiver',
        'Monthly stipend',
        'Hostel accommodation',
        'Medical assistance'
      ],
      sortOrder: 2,
      isActive: true
    },
    {
      type: 'scholarships',
      name: 'Research Fellowship (PG)',
      description: 'Fellowship for postgraduate students engaged in research activities.',
      eligibility: 'M.F.Sc students with >60% marks',
      amount: '₹8,000 per month',
      duration: '2 years',
      benefits: [
        'Monthly stipend',
        'Research contingency',
        'Conference participation support',
        'Publication assistance'
      ],
      sortOrder: 3,
      isActive: true
    },
    {
      type: 'scholarships',
      name: 'Girl Child Incentive',
      description: 'Special incentive scheme to promote higher education among girls.',
      eligibility: 'Female students with >65% marks',
      amount: '₹10,000 per year',
      duration: 'Throughout the course',
      benefits: [
        'Financial assistance',
        'Priority in hostel allocation',
        'Safety and security measures',
        'Career guidance support'
      ],
      sortOrder: 4,
      isActive: true
    },
    // Student Clubs
    {
      type: 'clubs',
      name: 'Student Council',
      role: 'Student Governance',
      description: 'Representative body for student welfare and academic matters.',
      activities: [
        'Student grievance redressal',
        'Academic and administrative liaison',
        'Cultural and sports event organization',
        'Student welfare initiatives',
        'Discipline and conduct management'
      ],
      positions: ['President', 'Vice-President', 'Secretary', 'Cultural Secretary', 'Sports Secretary'],
      sortOrder: 1,
      isActive: true
    },
    {
      type: 'clubs',
      name: 'Aquaculture Club',
      role: 'Technical Activities',
      description: 'Club focused on practical aspects of aquaculture and fishery management.',
      activities: [
        'Technical workshops and seminars',
        'Field visits to fish farms',
        'Hands-on training programs',
        'Research project discussions',
        'Industry interaction sessions'
      ],
      positions: ['President', 'Secretary', 'Technical Coordinator', 'Event Manager'],
      sortOrder: 2,
      isActive: true
    },
    {
      type: 'clubs',
      name: 'Cultural Club',
      role: 'Cultural Activities',
      description: 'Organizing cultural events, festivals, and artistic activities on campus.',
      activities: [
        'Annual cultural festival',
        'Traditional and modern dance performances',
        'Music and drama competitions',
        'Art and craft exhibitions',
        'Inter-college cultural competitions'
      ],
      positions: ['Cultural Secretary', 'Dance Coordinator', 'Music Coordinator', 'Drama Coordinator'],
      sortOrder: 3,
      isActive: true
    },
    {
      type: 'clubs',
      name: 'Sports Club',
      role: 'Sports & Recreation',
      description: 'Promoting sports activities and physical fitness among students.',
      activities: [
        'Inter-college sports competitions',
        'Annual sports meet',
        'Fitness and health awareness programs',
        'Sports equipment management',
        'Coaching and training sessions'
      ],
      positions: ['Sports Secretary', 'Indoor Games Coordinator', 'Outdoor Games Coordinator'],
      sortOrder: 4,
      isActive: true
    },
    {
      type: 'clubs',
      name: 'Literary Society',
      role: 'Academic & Literary',
      description: 'Encouraging literary activities, debates, and academic discussions.',
      activities: [
        'Debates and elocution competitions',
        'Essay writing competitions',
        'Book reading sessions',
        'Academic seminars',
        'College magazine publication'
      ],
      positions: ['Editor', 'Literary Secretary', 'Debate Coordinator', 'Publication Head'],
      sortOrder: 5,
      isActive: true
    },
    {
      type: 'clubs',
      name: 'Environmental Club',
      role: 'Environmental Conservation',
      description: 'Promoting environmental awareness and conservation activities.',
      activities: [
        'Campus tree plantation drives',
        'Water conservation awareness',
        'Waste management initiatives',
        'Environmental seminars and workshops',
        'Clean campus campaigns'
      ],
      positions: ['Environmental Secretary', 'Conservation Coordinator', 'Awareness Head'],
      sortOrder: 6,
      isActive: true
    }
  ];
};

// Function to seed student corner data
const seedStudentCorner = async () => {
  try {
    console.log('Seeding student corner data...');
    
    const studentCornerData = getStudentCornerData();
    const studentCorner = await StudentCorner.create(studentCornerData);
    
    console.log(`${studentCorner.length} student corner items seeded`);
    
    // Count by type for detailed logging
    const admissionCount = studentCorner.filter(item => item.type === 'admission').length;
    const scholarshipsCount = studentCorner.filter(item => item.type === 'scholarships').length;
    const clubsCount = studentCorner.filter(item => item.type === 'clubs').length;
    
    console.log(`  - Admission Guidelines: ${admissionCount} items`);
    console.log(`  - Scholarships: ${scholarshipsCount} items`);
    console.log(`  - Student Clubs: ${clubsCount} items`);
    
    return studentCorner;
  } catch (error) {
    console.error('Error seeding student corner data:', error);
    throw error;
  }
};

// Export for use in main seed file
module.exports = {
  seedStudentCorner,
  getStudentCornerData
};

// Allow running this file directly for testing
if (require.main === module) {
  require('dotenv').config();
  
  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  };

  const runSeed = async () => {
    await connectDB();
    
    // Clear existing data
    await StudentCorner.deleteMany({});
    console.log('Cleared existing student corner data');
    
    // Seed new data
    await seedStudentCorner();
    
    mongoose.connection.close();
    console.log('Database connection closed');
  };

  runSeed().catch(console.error);
}