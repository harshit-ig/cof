const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fishery_college')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const Incubation = require('../models/Incubation');

const incubationSeedData = [
  // Activities
  {
    title: 'Startup Incubation',
    subtitle: 'Business Development Support',
    description: 'Comprehensive support for fisheries startups from ideation to market launch with mentorship and funding assistance.',
    category: 'activity',
    icon: 'Lightbulb',
    color: 'blue',
    order: 1,
    isPublished: true,
    tags: ['startup', 'mentorship', 'funding']
  },
  {
    title: 'Innovation Programs',
    subtitle: 'Creative Solutions',
    description: 'Innovation challenges, hackathons, and design thinking workshops to foster creativity in fisheries technology.',
    category: 'activity',
    icon: 'TrendingUp',
    color: 'green',
    order: 2,
    isPublished: true,
    tags: ['innovation', 'technology', 'workshop']
  },
  {
    title: 'Entrepreneurship Training',
    subtitle: 'Skill Development',
    description: 'Training programs on business planning, financial management, and marketing for aspiring entrepreneurs.',
    category: 'activity',
    icon: 'Users',
    color: 'purple',
    order: 3,
    isPublished: true,
    tags: ['training', 'business', 'skills']
  },
  {
    title: 'Technology Transfer',
    subtitle: 'Research Commercialization',
    description: 'Facilitating transfer of research innovations to commercial applications in aquaculture sector.',
    category: 'activity',
    icon: 'Target',
    color: 'red',
    order: 4,
    isPublished: true,
    tags: ['research', 'commercialization', 'technology']
  },
  {
    title: 'Industry Partnerships',
    subtitle: 'Collaboration Network',
    description: 'Building partnerships with industry leaders for mentorship, funding, and market access opportunities.',
    category: 'activity',
    icon: 'Building',
    color: 'indigo',
    order: 5,
    isPublished: true,
    tags: ['partnership', 'collaboration', 'industry']
  },
  {
    title: 'Awards & Recognition',
    subtitle: 'Excellence Promotion',
    description: 'Recognition programs and awards for outstanding innovations and successful startup ventures.',
    category: 'activity',
    icon: 'Award',
    color: 'yellow',
    order: 6,
    isPublished: true,
    tags: ['awards', 'recognition', 'excellence']
  },

  // Governing Body
  {
    title: 'Chairperson',
    name: 'Dr. R.K. Sharma',
    position: 'Vice Chancellor',
    designation: 'Chairperson',
    organization: 'NDVSU',
    location: 'Jabalpur',
    email: 'vc@ndvsu.org',
    description: 'Strategic leadership and policy guidance for the incubation center.',
    category: 'governing-body',
    order: 1,
    isPublished: true,
    expertise: ['Leadership', 'Policy Making', 'Strategic Planning'],
    tags: ['leadership', 'policy']
  },
  {
    title: 'Member Secretary',
    name: 'Dr. Shashikant',
    position: 'Dean',
    designation: 'Member Secretary',
    organization: 'College of Fishery Sciences',
    location: 'Jabalpur',
    email: 'dean@cofs.edu',
    bio: 'Leading academic and research initiatives in fisheries science with over 20 years of experience.',
    description: 'Academic oversight and coordination of incubation activities.',
    category: 'governing-body',
    order: 2,
    isPublished: true,
    expertise: ['Fisheries Science', 'Research Management', 'Academic Leadership'],
    tags: ['academic', 'research']
  },
  {
    title: 'Member',
    name: 'Dr. P.K. Verma',
    position: 'Director Research Services',
    designation: 'Member',
    organization: 'NDVSU',
    location: 'Jabalpur',
    description: 'Research coordination and innovation strategy development.',
    category: 'governing-body',
    order: 3,
    isPublished: true,
    expertise: ['Research Management', 'Innovation Strategy'],
    tags: ['research', 'innovation']
  },
  {
    title: 'Member',
    name: 'Dr. A.K. Singh',
    position: 'Director Extension Services',
    designation: 'Member',
    organization: 'NDVSU',
    location: 'Jabalpur',
    description: 'Extension services and community outreach coordination.',
    category: 'governing-body',
    order: 4,
    isPublished: true,
    expertise: ['Extension Services', 'Community Outreach'],
    tags: ['extension', 'community']
  },

  // Management Committee
  {
    title: 'Chairperson',
    name: 'Dr. Shashikant',
    position: 'Dean',
    designation: 'Chairperson',
    organization: 'College of Fishery Sciences',
    location: 'Jabalpur',
    email: 'dean@cofs.edu',
    phone: '+91-761-2681693',
    bio: 'Operational leadership of the incubation center with focus on startup development and entrepreneurship.',
    description: 'Operational oversight and day-to-day management of incubation activities.',
    category: 'management-committee',
    order: 1,
    isPublished: true,
    expertise: ['Leadership', 'Startup Development', 'Entrepreneurship'],
    tags: ['leadership', 'operations']
  },
  {
    title: 'Chief Operating Officer',
    name: 'Dr. Rajesh Kumar',
    position: 'COO',
    designation: 'Chief Operating Officer',
    organization: 'Incubation Centre',
    location: 'Jabalpur',
    email: 'coo@incubation.cofs.edu',
    bio: 'Managing daily operations and startup mentorship programs.',
    description: 'Daily operations management and startup support coordination.',
    category: 'management-committee',
    order: 2,
    isPublished: true,
    expertise: ['Operations Management', 'Startup Mentorship', 'Business Development'],
    tags: ['operations', 'mentorship']
  },
  {
    title: 'Business Development Manager',
    name: 'Ms. Priya Sharma',
    position: 'BDM',
    designation: 'Business Development Manager',
    organization: 'Incubation Centre',
    location: 'Jabalpur',
    email: 'bdm@incubation.cofs.edu',
    bio: 'Entrepreneurship support and startup acceleration programs.',
    description: 'Business development and entrepreneurship support services.',
    category: 'management-committee',
    order: 3,
    isPublished: true,
    expertise: ['Business Development', 'Entrepreneurship', 'Market Analysis'],
    tags: ['business', 'entrepreneurship']
  },
  {
    title: 'Finance & Accounts Officer',
    name: 'Mr. Suresh Gupta',
    position: 'FAO',
    designation: 'Finance & Accounts Officer',
    organization: 'Incubation Centre',
    location: 'Jabalpur',
    email: 'finance@incubation.cofs.edu',
    bio: 'Financial management and funding coordination for startups.',
    description: 'Financial management and funding support for incubated startups.',
    category: 'management-committee',
    order: 4,
    isPublished: true,
    expertise: ['Financial Management', 'Funding', 'Accounting'],
    tags: ['finance', 'funding']
  },
  {
    title: 'Legal & IPR Expert',
    name: 'Adv. Meera Jain',
    position: 'Legal Advisor',
    designation: 'Legal & IPR Expert',
    organization: 'Incubation Centre',
    location: 'Jabalpur',
    email: 'legal@incubation.cofs.edu',
    bio: 'Intellectual property rights and legal advisory services for startups.',
    description: 'Legal advisory and intellectual property rights management.',
    category: 'management-committee',
    order: 5,
    isPublished: true,
    expertise: ['Legal Advisory', 'Intellectual Property', 'Startup Law'],
    tags: ['legal', 'ipr']
  },
  {
    title: 'MIS & Data Manager',
    name: 'Mr. Amit Patel',
    position: 'Data Manager',
    designation: 'MIS & Data Manager',
    organization: 'Incubation Centre',
    location: 'Jabalpur',
    email: 'mis@incubation.cofs.edu',
    bio: 'Information systems management and data analytics for incubation programs.',
    description: 'Management information systems and data analytics support.',
    category: 'management-committee',
    order: 6,
    isPublished: true,
    expertise: ['Data Management', 'Information Systems', 'Analytics'],
    tags: ['data', 'technology']
  }
];

const seedIncubationData = async () => {
  try {
    // Clear existing data
    await Incubation.deleteMany({});
    console.log('Cleared existing incubation data');

    // Insert seed data
    const insertedData = await Incubation.insertMany(incubationSeedData);
    console.log(`Inserted ${insertedData.length} incubation items`);

    // Log summary
    const counts = {};
    insertedData.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    console.log('\nSeed data summary:');
    Object.entries(counts).forEach(([category, count]) => {
      console.log(`${category}: ${count} items`);
    });

    console.log('\nIncubation seed data created successfully!');
  } catch (error) {
    console.error('Error seeding incubation data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed function
seedIncubationData();