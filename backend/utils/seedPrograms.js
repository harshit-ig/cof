const mongoose = require('mongoose');
const Program = require('../models/Program');
require('dotenv').config();

const samplePrograms = [
  {
    title: 'Bachelor of Fishery Science',
    slug: 'bachelor-fishery-science',
    shortName: 'B.F.Sc.',
    description: 'A comprehensive 4-year undergraduate program designed to provide students with strong foundation in fishery science, aquaculture, and allied subjects.',
    overview: 'The Bachelor of Fishery Science program combines theoretical knowledge with practical training to prepare students for careers in fisheries and aquaculture sectors.',
    duration: '4 Years (8 Semesters)',
    eligibility: {
      qualification: '10+2 or equivalent',
      subjects: 'Physics, Chemistry, Biology/Mathematics',
      percentage: '50% aggregate marks (45% for reserved categories)',
      entrance: 'Valid JEE/NEET/State Entrance Test score',
      additional: 'Age limit: 17-25 years'
    },
    fees: {
      tuition: '₹45,000',
      hostel: '₹20,000',
      mess: '₹25,000',
      other: '₹8,000',
      total: '₹98,000 per year',
      annual: 98000
    },
    intake: 60,
    department: 'Fishery Science',
    level: 'undergraduate',
    curriculum: [
      {
        semester: 'Semester 1',
        subjects: ['Mathematics and Statistics', 'Physics', 'Chemistry', 'Biology', 'Introduction to Fisheries']
      },
      {
        semester: 'Semester 2', 
        subjects: ['Biochemistry', 'Cell Biology', 'Genetics', 'Ecology', 'Fish Biology']
      }
    ],
    detailedCurriculum: {
      semester1: [
        'Mathematics and Statistics',
        'Physics',
        'Chemistry', 
        'Biology',
        'Introduction to Fisheries',
        'Computer Applications',
        'English Communication'
      ],
      semester2: [
        'Biochemistry',
        'Cell Biology and Genetics',
        'Ecology and Environmental Science',
        'Fish Biology and Anatomy',
        'Aquatic Environment',
        'Agricultural Extension',
        'Rural Sociology'
      ],
      semester3: [
        'Fish Physiology',
        'Microbiology',
        'Fish Taxonomy and Systematics',
        'Limnology',
        'Soil Science and Agricultural Chemistry',
        'Fishery Statistics',
        'Economics and Marketing'
      ],
      semester4: [
        'Fish Nutrition and Feed Technology',
        'Fish Pathology',
        'Aquaculture Engineering',
        'Fish Breeding and Genetics',
        'Fishery Resource Assessment',
        'Research Methodology',
        'Entrepreneurship Development'
      ],
      semester5: [
        'Finfish Aquaculture',
        'Shellfish Aquaculture',
        'Fish Processing Technology',
        'Fishery Resource Management',
        'Ornamental Fisheries',
        'Fishery Economics',
        'Industrial Training'
      ],
      semester6: [
        'Marine Fisheries',
        'Inland Fisheries',
        'Fish Health Management',
        'Fishery Extension',
        'Fishery Legislation and Cooperative Management',
        'Seminar',
        'Practical Training'
      ],
      semester7: [
        'Advanced Aquaculture',
        'Fishery Business Management',
        'Fish Product Development',
        'Fishery Project Planning and Management',
        'Research Project - I',
        'Internship',
        'Comprehensive Viva'
      ],
      semester8: [
        'Fishery Development and Planning',
        'Quality Assurance in Fisheries',
        'Advanced Fish Processing',
        'Research Project - II',
        'Dissertation',
        'Final Comprehensive Examination',
        'Industry Attachment'
      ]
    },
    highlights: [
      'ICAR approved curriculum',
      'State-of-the-art laboratory facilities',
      'Practical training in fish farms and hatcheries',
      'Industry internships and field visits',
      'Research project opportunities',
      'Placement assistance and career guidance',
      'International exposure programs',
      'Experienced faculty with industry expertise'
    ],
    careerOpportunities: [
      'Fishery Development Officer',
      'Aquaculture Manager',
      'Fish Farm Consultant',
      'Research Assistant/Scientist',
      'Extension Officer',
      'Quality Control Officer',
      'Fish Feed Technologist',
      'Hatchery Manager',
      'Fish Processing Technologist',
      'Fishery Entrepreneur',
      'Government Jobs (State/Central)',
      'Banking Sector (Agricultural loans)',
      'NGO and Development Organizations'
    ],
    facilities: [
      'Well-equipped Fishery Science Laboratory',
      'Fish Culture Ponds and Tanks',
      'Hatchery and Breeding Units',
      'Fish Processing Laboratory',
      'Library with latest books and journals',
      'Computer Lab with Internet facility',
      'Aquarium and Live Fish Display',
      'Boat and Fishing Equipment',
      'Hostel accommodation for boys and girls',
      'Mess and Canteen facilities',
      'Sports and Recreation facilities',
      'Medical facilities and dispensary'
    ],
    admissionProcess: {
      process: 'Entrance Test followed by Counseling',
      application: 'Online application through university portal',
      documents: [
        '10th and 12th Mark sheets and Certificates',
        'Transfer Certificate from last attended institution',
        'Character Certificate',
        'Caste Certificate (if applicable)',
        'Income Certificate (if applicable)',
        'Medical Certificate',
        'Passport size photographs',
        'Entrance Test Score Card'
      ],
      importantDates: [
        { event: 'Application Start', date: 'March 1, 2025' },
        { event: 'Application End', date: 'May 15, 2025' },
        { event: 'Entrance Test', date: 'June 10, 2025' },
        { event: 'Result Declaration', date: 'June 25, 2025' },
        { event: 'Counseling Start', date: 'July 1, 2025' },
        { event: 'Document Verification', date: 'July 5-10, 2025' },
        { event: 'Fee Payment', date: 'July 15, 2025' },
        { event: 'Classes Begin', date: 'August 1, 2025' }
      ]
    },
    isActive: true
  },
  {
    title: 'Master of Fishery Science - Aquaculture',
    slug: 'master-fishery-science-aquaculture',
    shortName: 'M.F.Sc. (Aquaculture)',
    description: 'An advanced 2-year postgraduate program specializing in aquaculture techniques, research methodologies, and sustainable fish farming practices.',
    overview: 'This program focuses on advanced aquaculture technologies, research in fish breeding, nutrition, and disease management for sustainable aquaculture development.',
    duration: '2 Years (4 Semesters)',
    eligibility: {
      qualification: 'B.F.Sc. or B.Sc. (Zoology/Biology) with Fisheries as one subject',
      subjects: 'Fishery Science background preferred',
      percentage: '60% aggregate marks (55% for reserved categories)',
      entrance: 'Valid ICAR-AIEEA (PG) score or University Entrance Test',
      additional: 'Work experience in fisheries sector preferred but not mandatory'
    },
    fees: {
      tuition: '₹35,000',
      hostel: '₹22,000',
      mess: '₹28,000',
      other: '₹10,000',
      total: '₹95,000 per year',
      annual: 95000
    },
    intake: 20,
    department: 'Fishery Science',
    level: 'postgraduate',
    curriculum: [
      {
        semester: 'Semester 1',
        subjects: ['Advanced Fish Biology', 'Aquaculture Systems', 'Fish Nutrition', 'Water Quality Management']
      },
      {
        semester: 'Semester 2',
        subjects: ['Fish Breeding Technology', 'Aquatic Animal Health', 'Research Methodology', 'Thesis Work']
      }
    ],
    detailedCurriculum: {
      semester1: [
        'Advanced Fish Biology and Physiology',
        'Principles of Aquaculture Systems',
        'Advanced Fish Nutrition and Feed Technology',
        'Water Quality Management in Aquaculture',
        'Aquaculture Engineering and Farm Design',
        'Statistical Methods in Fisheries Research',
        'Seminar - I'
      ],
      semester2: [
        'Fish Breeding and Genetic Improvement',
        'Aquatic Animal Health Management',
        'Research Methodology and Experimental Design',
        'Advanced Aquaculture Techniques',
        'Fish Growth and Production Models',
        'Master\'s Research Project - I',
        'Seminar - II'
      ],
      semester3: [
        'Sustainable Aquaculture Practices',
        'Aquaculture Economics and Marketing',
        'Molecular Techniques in Aquaculture',
        'Climate Change and Aquaculture',
        'Master\'s Research Project - II',
        'Industry Internship',
        'Publication Writing'
      ],
      semester4: [
        'Advanced Topics in Aquaculture',
        'Thesis Research and Data Analysis',
        'Master\'s Thesis Writing',
        'Thesis Defense Preparation',
        'Comprehensive Examination',
        'Final Thesis Submission',
        'Viva Voce Examination'
      ]
    },
    highlights: [
      'Research-oriented curriculum',
      'Advanced laboratory facilities',
      'Individual research project with faculty mentorship',
      'Industry collaborations and internships',
      'Publication opportunities in peer-reviewed journals',
      'Conference presentation opportunities',
      'Access to molecular biology and biotechnology labs',
      'International exposure through exchange programs'
    ],
    careerOpportunities: [
      'Research Scientist',
      'Assistant Professor/Lecturer',
      'Senior Aquaculture Manager',
      'Aquaculture Consultant',
      'Project Manager in Development Organizations',
      'Technical Officer in Government Departments',
      'Quality Assurance Manager',
      'Aquaculture Biotechnologist',
      'Feed Industry Specialist',
      'Fishery Policy Analyst',
      'PhD and Higher Studies',
      'International Organizations (FAO, WorldFish, etc.)'
    ],
    facilities: [
      'Advanced Research Laboratories',
      'Molecular Biology and Biotechnology Lab',
      'Specialized Aquaculture Research Facility',
      'Water Quality Testing Laboratory',
      'Fish Nutrition Research Lab',
      'Breeding and Genetics Laboratory',
      'Digital Library and Research Resources',
      'Statistical Software and Computing Facility',
      'Conference Hall and Seminar Rooms',
      'Research Aquarium Systems',
      'Field Research Stations',
      'International Journal Access'
    ],
    admissionProcess: {
      process: 'ICAR-AIEEA (PG) Score + Interview',
      application: 'Online application through ICAR portal and University website',
      documents: [
        'Bachelor\'s Degree Certificate and Mark sheets',
        'ICAR-AIEEA (PG) Score Card',
        'Transfer Certificate',
        'Character Certificate',
        'Category Certificate (if applicable)',
        'Research Experience Certificate (if any)',
        'Statement of Purpose',
        'Letters of Recommendation (2)'
      ],
      importantDates: [
        { event: 'ICAR-AIEEA (PG) Application', date: 'February 1, 2025' },
        { event: 'ICAR-AIEEA (PG) Exam', date: 'April 20, 2025' },
        { event: 'University Application Start', date: 'May 1, 2025' },
        { event: 'University Application End', date: 'May 30, 2025' },
        { event: 'Interview/Selection', date: 'June 15, 2025' },
        { event: 'Result Declaration', date: 'June 25, 2025' },
        { event: 'Admission Confirmation', date: 'July 10, 2025' },
        { event: 'Classes Begin', date: 'August 1, 2025' }
      ]
    },
    isActive: true
  },
  {
    title: 'Master of Fishery Science - Fishery Resource Management',
    slug: 'master-fishery-science-resource-management',
    shortName: 'M.F.Sc. (FRM)',
    description: 'A specialized 2-year postgraduate program focusing on sustainable management of fishery resources, conservation, and policy development.',
    overview: 'This program prepares students for leadership roles in fishery resource management, conservation planning, and sustainable fisheries development.',
    duration: '2 Years (4 Semesters)',
    eligibility: {
      qualification: 'B.F.Sc. or equivalent degree with Fisheries background',
      subjects: 'Fishery Science, Marine Biology, or related field',
      percentage: '60% aggregate marks',
      entrance: 'ICAR-AIEEA (PG) or University Entrance Test',
      additional: 'Field experience in fisheries/marine sector preferred'
    },
    fees: {
      tuition: '₹38,000',
      hostel: '₹22,000',
      mess: '₹28,000',
      other: '₹12,000',
      total: '₹1,00,000 per year',
      annual: 100000
    },
    intake: 15,
    department: 'Fishery Science',
    level: 'postgraduate',
    curriculum: [
      {
        semester: 'Semester 1',
        subjects: ['Fishery Resource Assessment', 'Marine Ecology', 'Fishery Management Principles', 'GIS Applications']
      },
      {
        semester: 'Semester 2',
        subjects: ['Stock Assessment Models', 'Fishery Policy', 'Conservation Biology', 'Thesis Research']
      }
    ],
    detailedCurriculum: {
      semester1: [
        'Fishery Resource Assessment and Stock Evaluation',
        'Marine and Freshwater Ecology',
        'Principles of Fishery Management',
        'GIS and Remote Sensing in Fisheries',
        'Fishery Oceanography',
        'Biostatistics and Population Dynamics',
        'Research Methodology'
      ],
      semester2: [
        'Stock Assessment Models and Techniques',
        'Fishery Policy and Governance',
        'Conservation Biology and Biodiversity',
        'Climate Change and Fisheries',
        'Fishing Technology and Gear Selectivity',
        'Master\'s Research Project - I',
        'Scientific Writing and Communication'
      ],
      semester3: [
        'Ecosystem-based Fishery Management',
        'Fishery Economics and Trade',
        'Community-based Resource Management',
        'Marine Protected Areas and Conservation',
        'Master\'s Research Project - II',
        'Field Survey and Data Collection',
        'Seminar and Presentation'
      ],
      semester4: [
        'Advanced Fishery Management Topics',
        'Thesis Research and Analysis',
        'Policy Analysis and Development',
        'Master\'s Thesis Completion',
        'Comprehensive Examination',
        'Thesis Defense',
        'Final Evaluation'
      ]
    },
    highlights: [
      'Focus on sustainable fisheries management',
      'Field-based research opportunities',
      'Collaboration with government departments',
      'International fishery organization linkages',
      'Policy development and analysis training',
      'Advanced statistical and modeling techniques',
      'Conservation and biodiversity focus',
      'Industry and government placement opportunities'
    ],
    careerOpportunities: [
      'Fishery Resource Manager',
      'Conservation Scientist',
      'Policy Analyst',
      'Research Officer in Government',
      'Project Coordinator in NGOs',
      'Environmental Consultant',
      'Marine Park Manager',
      'International Organization Officer',
      'Fishery Stock Assessment Specialist',
      'Academic Researcher',
      'PhD and Research Career',
      'Fishery Development Consultant'
    ],
    facilities: [
      'Resource Assessment Laboratory',
      'GIS and Remote Sensing Lab',
      'Marine Biology Research Facility',
      'Field Research Vessels',
      'Statistical Computing Lab',
      'Oceanographic Equipment',
      'Digital Mapping and Modeling Tools',
      'Conservation Research Center',
      'Policy Research Library',
      'International Database Access',
      'Collaboration with Research Institutes',
      'Field Stations and Survey Equipment'
    ],
    admissionProcess: {
      process: 'Merit-based selection through ICAR-AIEEA (PG) + Interview',
      application: 'Online application with research interest statement',
      documents: [
        'Bachelor\'s Degree with detailed marks',
        'ICAR-AIEEA (PG) Score',
        'Research Interest Statement',
        'Academic Transcripts',
        'Work Experience Certificate (if any)',
        'Letters of Recommendation',
        'Portfolio of relevant projects',
        'English Proficiency Certificate'
      ],
      importantDates: [
        { event: 'Application Opening', date: 'April 1, 2025' },
        { event: 'Application Deadline', date: 'May 20, 2025' },
        { event: 'Document Verification', date: 'June 1, 2025' },
        { event: 'Interview Schedule', date: 'June 10, 2025' },
        { event: 'Merit List Publication', date: 'June 20, 2025' },
        { event: 'Admission Confirmation', date: 'July 5, 2025' },
        { event: 'Fee Payment Deadline', date: 'July 15, 2025' },
        { event: 'Academic Session Start', date: 'August 1, 2025' }
      ]
    },
    isActive: true
  },
  {
    title: 'Doctor of Philosophy in Fishery Science',
    slug: 'phd-fishery-science',
    shortName: 'Ph.D. (Fishery Science)',
    description: 'A research-intensive doctoral program designed to develop independent researchers and academic leaders in various specializations of fishery science.',
    overview: 'The Ph.D. program offers advanced research opportunities in aquaculture, fishery resource management, fish nutrition, genetics, and related fields.',
    duration: '3-5 Years (6-10 Semesters)',
    eligibility: {
      qualification: 'M.F.Sc. or equivalent Master\'s degree in Fishery Science or related field',
      subjects: 'Fishery Science, Aquaculture, Marine Biology, or allied subjects',
      percentage: '60% aggregate marks in Master\'s degree (55% for reserved categories)',
      entrance: 'ICAR-SRF/NET or University Research Entrance Test',
      additional: 'Research experience and publications preferred'
    },
    fees: {
      tuition: '₹25,000',
      hostel: '₹20,000',
      mess: '₹25,000',
      other: '₹8,000',
      total: '₹78,000 per year',
      annual: 78000
    },
    intake: 10,
    department: 'Fishery Science',
    level: 'postgraduate',
    curriculum: [
      {
        semester: 'Course Work (1st Year)',
        subjects: ['Advanced Research Methodology', 'Bioinformatics', 'Advanced Statistics', 'Subject Specialization']
      },
      {
        semester: 'Research Phase (2nd-5th Year)',
        subjects: ['Independent Research', 'Thesis Work', 'Publication', 'Teaching Assistantship']
      }
    ],
    detailedCurriculum: {
      semester1: [
        'Advanced Research Methodology and Design',
        'Biostatistics and Data Analysis',
        'Scientific Writing and Communication',
        'Specialization Course - I',
        'Research Ethics and IPR',
        'Seminar - I',
        'Laboratory Rotation'
      ],
      semester2: [
        'Advanced Techniques in Fishery Research',
        'Bioinformatics and Computational Biology',
        'Specialization Course - II',
        'Research Proposal Development',
        'Literature Review and Synthesis',
        'Seminar - II',
        'Comprehensive Examination'
      ],
      semester3: [
        'Independent Research Work',
        'Data Collection and Analysis',
        'Research Progress Monitoring',
        'Conference Presentation',
        'Teaching Assistantship',
        'Research Committee Meeting - I',
        'Mid-term Evaluation'
      ],
      semester4: [
        'Advanced Research Continuation',
        'Manuscript Preparation',
        'Collaborative Research Projects',
        'International Exposure/Exchange',
        'Research Committee Meeting - II',
        'Annual Research Seminar',
        'Progress Report Submission'
      ]
    },
    highlights: [
      'Individual research supervision by expert faculty',
      'State-of-the-art research facilities',
      'Financial assistance through fellowships',
      'Opportunity for international collaborations',
      'Teaching and mentoring experience',
      'Conference and publication support',
      'Industry-academia research partnerships',
      'Multidisciplinary research approach'
    ],
    careerOpportunities: [
      'University Professor/Associate Professor',
      'Senior Research Scientist',
      'Principal Scientist in Research Institutes',
      'Research and Development Manager',
      'Technical Director',
      'Policy Research Specialist',
      'International Research Coordinator',
      'Biotechnology Research Leader',
      'Academic Administrator',
      'Independent Research Consultant',
      'Industry R&D Head',
      'Government Scientific Advisor'
    ],
    facilities: [
      'Dedicated Research Laboratories',
      'Advanced Instrumentation Facility',
      'Molecular Biology and Biotechnology Center',
      'Bioinformatics and Computing Lab',
      'Research Aquaculture Facility',
      'Analytical Chemistry Laboratory',
      'Microscopy and Imaging Center',
      'Research Library and Digital Resources',
      'Conference and Seminar Halls',
      'Research Publication Support',
      'International Collaboration Office',
      'Intellectual Property Cell'
    ],
    admissionProcess: {
      process: 'Written Test + Interview + Research Proposal Evaluation',
      application: 'Online application with detailed research proposal',
      documents: [
        'Master\'s Degree Certificate and Transcripts',
        'ICAR-NET/SRF or equivalent qualification',
        'Detailed Research Proposal (5-10 pages)',
        'Academic CV with publication list',
        'Letters of Recommendation (3)',
        'Statement of Research Interest',
        'Work Experience Certificates',
        'Language Proficiency Certificate'
      ],
      importantDates: [
        { event: 'Application Start', date: 'January 15, 2025' },
        { event: 'Application Deadline', date: 'March 15, 2025' },
        { event: 'Written Test', date: 'April 10, 2025' },
        { event: 'Interview and Presentation', date: 'April 25, 2025' },
        { event: 'Final Selection List', date: 'May 10, 2025' },
        { event: 'Registration and Fee Payment', date: 'May 25, 2025' },
        { event: 'Supervisor Allocation', date: 'June 15, 2025' },
        { event: 'Course Work Begins', date: 'July 1, 2025' }
      ]
    },
    isActive: true
  }
];

async function seedPrograms() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cof');
    console.log('Connected to MongoDB');

    // Clear existing programs
    await Program.deleteMany({});
    console.log('Cleared existing programs');

    // Insert sample programs
    const insertedPrograms = await Program.insertMany(samplePrograms);
    console.log(`✅ Successfully seeded ${insertedPrograms.length} programs:`);
    
    insertedPrograms.forEach(program => {
      console.log(`   - ${program.title} (${program.slug})`);
    });

    console.log('\n🌟 Program seeding completed successfully!');
    console.log('\n📋 Available program URLs:');
    insertedPrograms.forEach(program => {
      console.log(`   🔗 /programs/${program.slug}`);
    });

  } catch (error) {
    console.error('❌ Error seeding programs:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the seeding function
seedPrograms();