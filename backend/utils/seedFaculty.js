const mongoose = require('mongoose');
const Faculty = require('../models/Faculty');
require('dotenv').config();

const teachingFacultyData = [
  {
    name: 'Dr. Rajesh Kumar Sharma',
    designation: 'Professor & Head',
    staffType: 'Teaching Staff',
    department: 'Fishery Science',
    qualification: 'Ph.D. in Fishery Science, M.F.Sc., B.F.Sc.',
    specialization: 'Fish Biology and Ecology',
    experience: 25,
    email: 'rajesh.sharma@cof.edu.in',
    phone: '+91-9876543210',
    bio: 'Dr. Rajesh Kumar Sharma is a distinguished professor with over 25 years of experience in fishery science. He has contributed significantly to fish biology research and has published numerous papers in international journals.',
    researchInterests: [
      'Fish Biology and Physiology',
      'Aquatic Ecology',
      'Fish Disease Management',
      'Sustainable Fisheries'
    ],
    publications: [
      {
        title: 'Fish Biodiversity in Freshwater Ecosystems of Northern India',
        journal: 'Journal of Fish Biology',
        year: 2023,
        url: 'https://doi.org/10.1111/jfb.15234'
      },
      {
        title: 'Impact of Climate Change on Fish Population Dynamics',
        journal: 'Aquatic Sciences',
        year: 2022,
        url: 'https://doi.org/10.1007/s00027-022-0845-2'
      }
    ],
    awards: [
      {
        title: 'Best Researcher Award',
        year: 2023,
        organization: 'Indian Society of Fishery Professionals'
      },
      {
        title: 'Excellence in Teaching Award',
        year: 2021,
        organization: 'University Academic Council'
      }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/dr-rajesh-sharma',
      researchgate: 'https://researchgate.net/profile/Rajesh-Sharma-123',
      googleScholar: 'https://scholar.google.com/citations?user=xyz123',
      orcid: 'https://orcid.org/0000-0002-1234-5678'
    },
    joinDate: new Date('2015-07-01'),
    image: 'Dr_Rajesh_Sharma.jpg'
  },
  {
    name: 'Dr. Priya Kumari Singh',
    designation: 'Associate Professor',
    staffType: 'Teaching Staff',
    department: 'Aquaculture',
    qualification: 'Ph.D. in Aquaculture, M.F.Sc., B.F.Sc.',
    specialization: 'Fish Nutrition and Feed Technology',
    experience: 18,
    email: 'priya.singh@cof.edu.in',
    phone: '+91-9876543211',
    bio: 'Dr. Priya Singh specializes in fish nutrition and has developed several innovative feed formulations for sustainable aquaculture. Her research focuses on improving fish growth and health through nutritional interventions.',
    researchInterests: [
      'Fish Nutrition',
      'Feed Technology',
      'Aquaculture Systems',
      'Fish Health Management'
    ],
    publications: [
      {
        title: 'Novel Feed Formulations for Enhanced Fish Growth',
        journal: 'Aquaculture Nutrition',
        year: 2023,
        url: 'https://doi.org/10.1111/anu.13567'
      }
    ],
    awards: [
      {
        title: 'Young Scientist Award',
        year: 2020,
        organization: 'National Academy of Agricultural Sciences'
      }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/dr-priya-singh',
      researchgate: 'https://researchgate.net/profile/Priya-Singh-456'
    },
    joinDate: new Date('2018-08-15'),
    image: 'Dr_Priya_Singh.jpg'
  },
  {
    name: 'Dr. Amit Kumar Verma',
    designation: 'Assistant Professor',
    staffType: 'Teaching Staff',
    department: 'Fish Processing Technology',
    qualification: 'Ph.D. in Food Technology, M.Tech., B.Tech.',
    specialization: 'Fish Processing and Value Addition',
    experience: 12,
    email: 'amit.verma@cof.edu.in',
    phone: '+91-9876543212',
    bio: 'Dr. Amit Verma is an expert in fish processing technology with focus on value addition and product development. He has worked extensively on developing innovative fish products and preservation techniques.',
    researchInterests: [
      'Fish Processing Technology',
      'Value Addition',
      'Food Safety',
      'Product Development'
    ],
    publications: [
      {
        title: 'Innovative Fish Processing Techniques for Extended Shelf Life',
        journal: 'Food Processing & Technology',
        year: 2023,
        url: 'https://doi.org/10.4172/2157-7110.1000456'
      }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/dr-amit-verma'
    },
    joinDate: new Date('2020-01-10'),
    image: 'Dr_Amit_Verma.jpg'
  },
  {
    name: 'Dr. Sunita Devi',
    designation: 'Assistant Professor',
    staffType: 'Teaching Staff',
    department: 'Fishery Resource Management',
    qualification: 'Ph.D. in Fishery Science, M.F.Sc., B.F.Sc.',
    specialization: 'Fishery Resource Assessment and Management',
    experience: 10,
    email: 'sunita.devi@cof.edu.in',
    phone: '+91-9876543213',
    bio: 'Dr. Sunita Devi focuses on sustainable fishery resource management and conservation. Her research contributes to policy development for responsible fishing practices.',
    researchInterests: [
      'Fishery Resource Assessment',
      'Conservation Biology',
      'Sustainable Fishing',
      'Policy Development'
    ],
    joinDate: new Date('2021-07-01'),
    image: 'Dr_Sunita_Devi.jpg'
  },
  {
    name: 'Dr. Vikash Kumar',
    designation: 'Assistant Professor',
    staffType: 'Teaching Staff',
    department: 'Aquatic Environment Management',
    qualification: 'Ph.D. in Environmental Science, M.Sc., B.Sc.',
    specialization: 'Aquatic Ecosystem Health and Water Quality',
    experience: 8,
    email: 'vikash.kumar@cof.edu.in',
    phone: '+91-9876543214',
    bio: 'Dr. Vikash Kumar specializes in aquatic environment management with focus on water quality assessment and ecosystem health monitoring.',
    researchInterests: [
      'Water Quality Management',
      'Aquatic Ecosystem Health',
      'Environmental Monitoring',
      'Pollution Control'
    ],
    joinDate: new Date('2022-08-01'),
    image: 'Dr_Vikash_Kumar.jpg'
  },
  {
    name: 'Prof. Shashikant Sadashiv Gaikwad',
    designation: 'Dean',
    staffType: 'Teaching Staff',
    department: 'Fishery Science',
    qualification: 'Ph.D. in Fishery Science, M.F.Sc., B.F.Sc.',
    specialization: 'Fish Genetics and Breeding',
    experience: 30,
    email: 'dean@cof.edu.in',
    phone: '+91-9876543200',
    bio: 'Prof. Shashikant Gaikwad is the Dean of College of Fishery with over 30 years of experience in fishery education and research. He has made significant contributions to fish genetics and breeding programs.',
    researchInterests: [
      'Fish Genetics',
      'Selective Breeding',
      'Aquaculture Development',
      'Fishery Education'
    ],
    publications: [
      {
        title: 'Advances in Fish Breeding Techniques',
        journal: 'Aquaculture Research',
        year: 2023,
        url: 'https://doi.org/10.1111/are.15890'
      },
      {
        title: 'Genetic Improvement of Aquaculture Species',
        journal: 'Fish and Shellfish Immunology',
        year: 2022,
        url: 'https://doi.org/10.1016/j.fsi.2022.05.023'
      }
    ],
    awards: [
      {
        title: 'Lifetime Achievement Award',
        year: 2023,
        organization: 'Indian Fisheries Association'
      },
      {
        title: 'Distinguished Educator Award',
        year: 2020,
        organization: 'Agricultural Education Society'
      }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/prof-shashikant-gaikwad',
      researchgate: 'https://researchgate.net/profile/Shashikant-Gaikwad',
      googleScholar: 'https://scholar.google.com/citations?user=abc789'
    },
    joinDate: new Date('2010-06-01'),
    image: 'Shashikant_1757523746114_930419044_1757835211585-442892621.jpg'
  }
];

const nonTeachingFacultyData = [
  {
    name: 'Mr. Ramesh Chandra Gupta',
    designation: 'Administrative Officer',
    staffType: 'Non-Teaching Staff',
    department: 'Administration',
    qualification: 'MBA, B.Com',
    specialization: 'Educational Administration and Management',
    experience: 20,
    email: 'ramesh.gupta@cof.edu.in',
    phone: '+91-9876543220',
    bio: 'Mr. Ramesh Gupta oversees all administrative functions of the college with expertise in educational management and student services.',
    researchInterests: [
      'Educational Administration',
      'Student Services',
      'Academic Planning'
    ],
    joinDate: new Date('2016-04-01'),
    image: 'Ramesh_Gupta.jpg'
  },
  {
    name: 'Ms. Anjali Sharma',
    designation: 'Laboratory Technician',
    staffType: 'Non-Teaching Staff',
    department: 'Fishery Science',
    qualification: 'M.Sc. in Fishery Science, B.Sc.',
    specialization: 'Laboratory Management and Technical Support',
    experience: 15,
    email: 'anjali.sharma@cof.edu.in',
    phone: '+91-9876543221',
    bio: 'Ms. Anjali Sharma manages laboratory operations and provides technical support for research and teaching activities.',
    researchInterests: [
      'Laboratory Management',
      'Technical Support',
      'Equipment Maintenance'
    ],
    joinDate: new Date('2017-09-01'),
    image: 'Anjali_Sharma.jpg'
  },
  {
    name: 'Mr. Suresh Kumar',
    designation: 'Librarian',
    staffType: 'Non-Teaching Staff',
    department: 'Library',
    qualification: 'M.Lib.Sc., B.Lib.Sc., M.A.',
    specialization: 'Library Science and Information Management',
    experience: 18,
    email: 'suresh.kumar@cof.edu.in',
    phone: '+91-9876543222',
    bio: 'Mr. Suresh Kumar manages the college library and provides information services to students and faculty.',
    researchInterests: [
      'Library Science',
      'Information Management',
      'Digital Resources'
    ],
    joinDate: new Date('2015-06-01'),
    image: 'Suresh_Kumar.jpg'
  },
  {
    name: 'Ms. Pooja Kumari',
    designation: 'Computer Operator',
    staffType: 'Non-Teaching Staff',
    department: 'IT Services',
    qualification: 'BCA, Diploma in Computer Applications',
    specialization: 'Computer Operations and Data Management',
    experience: 8,
    email: 'pooja.kumari@cof.edu.in',
    phone: '+91-9876543223',
    bio: 'Ms. Pooja Kumari handles computer operations, data entry, and provides IT support for administrative functions.',
    researchInterests: [
      'Data Management',
      'Computer Operations',
      'IT Support'
    ],
    joinDate: new Date('2019-03-01'),
    image: 'Pooja_Kumari.jpg'
  },
  {
    name: 'Mr. Manoj Singh',
    designation: 'Maintenance Supervisor',
    staffType: 'Non-Teaching Staff',
    department: 'Maintenance',
    qualification: 'ITI, Diploma in Mechanical Engineering',
    specialization: 'Infrastructure Maintenance and Operations',
    experience: 22,
    email: 'manoj.singh@cof.edu.in',
    phone: '+91-9876543224',
    bio: 'Mr. Manoj Singh supervises maintenance operations and ensures proper functioning of college infrastructure.',
    researchInterests: [
      'Infrastructure Maintenance',
      'Operations Management',
      'Safety Protocols'
    ],
    joinDate: new Date('2014-02-01'),
    image: 'Manoj_Singh.jpg'
  },
  {
    name: 'Ms. Kavita Devi',
    designation: 'Account Assistant',
    staffType: 'Non-Teaching Staff',
    department: 'Accounts',
    qualification: 'M.Com, B.Com',
    specialization: 'Financial Management and Accounting',
    experience: 12,
    email: 'kavita.devi@cof.edu.in',
    phone: '+91-9876543225',
    bio: 'Ms. Kavita Devi handles financial transactions, maintains accounts, and assists in budget management.',
    researchInterests: [
      'Financial Management',
      'Budget Planning',
      'Accounting Systems'
    ],
    joinDate: new Date('2018-05-01'),
    image: 'Kavita_Devi.jpg'
  },
  {
    name: 'Mr. Ravi Kumar',
    designation: 'Security Officer',
    staffType: 'Non-Teaching Staff',
    department: 'Security',
    qualification: 'Diploma, Security Training Certificate',
    specialization: 'Campus Security and Safety Management',
    experience: 10,
    email: 'ravi.kumar@cof.edu.in',
    phone: '+91-9876543226',
    bio: 'Mr. Ravi Kumar ensures campus security and safety for students, faculty, and staff.',
    researchInterests: [
      'Security Management',
      'Safety Protocols',
      'Emergency Response'
    ],
    joinDate: new Date('2020-01-15'),
    image: 'Ravi_Kumar.jpg'
  },
  {
    name: 'Ms. Rekha Sharma',
    designation: 'Office Assistant',
    staffType: 'Non-Teaching Staff',
    department: 'Administration',
    qualification: '12th Pass, Computer Certificate',
    specialization: 'Administrative Support and Documentation',
    experience: 6,
    email: 'rekha.sharma@cof.edu.in',
    phone: '+91-9876543227',
    bio: 'Ms. Rekha Sharma provides administrative support and handles documentation work in the college office.',
    researchInterests: [
      'Administrative Support',
      'Documentation',
      'Office Management'
    ],
    joinDate: new Date('2021-04-01'),
    image: 'Rekha_Sharma.jpg'
  }
];

async function seedFaculty() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cof');
    console.log('Connected to MongoDB');

    // Clear existing faculty data
    await Faculty.deleteMany({});
    console.log('Cleared existing faculty data');

    // Insert teaching faculty
    const teachingFaculty = await Faculty.insertMany(teachingFacultyData);
    console.log(`✅ Successfully seeded ${teachingFaculty.length} teaching faculty members!`);

    // Insert non-teaching faculty
    const nonTeachingFaculty = await Faculty.insertMany(nonTeachingFacultyData);
    console.log(`✅ Successfully seeded ${nonTeachingFaculty.length} non-teaching staff members!`);

    console.log('\n📊 Faculty Seeding Summary:');
    console.log(`👨‍🏫 Teaching Staff: ${teachingFaculty.length} members`);
    console.log(`👨‍💼 Non-Teaching Staff: ${nonTeachingFaculty.length} members`);
    console.log(`📈 Total Faculty: ${teachingFaculty.length + nonTeachingFaculty.length} members`);

    console.log('\n🏫 Departments:');
    const departments = [...new Set([...teachingFacultyData, ...nonTeachingFacultyData].map(f => f.department))];
    departments.forEach(dept => {
      const deptCount = [...teachingFacultyData, ...nonTeachingFacultyData].filter(f => f.department === dept).length;
      console.log(`   - ${dept}: ${deptCount} members`);
    });

    console.log('\n🎓 Experience Levels:');
    const allFaculty = [...teachingFacultyData, ...nonTeachingFacultyData];
    const experienced = allFaculty.filter(f => f.experience >= 20).length;
    const midLevel = allFaculty.filter(f => f.experience >= 10 && f.experience < 20).length;
    const junior = allFaculty.filter(f => f.experience < 10).length;
    console.log(`   - Senior (20+ years): ${experienced} members`);
    console.log(`   - Mid-level (10-19 years): ${midLevel} members`);
    console.log(`   - Junior (<10 years): ${junior} members`);

  } catch (error) {
    console.error('❌ Error seeding faculty:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the seeding function
seedFaculty();