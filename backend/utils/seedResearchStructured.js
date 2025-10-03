const mongoose = require('mongoose');
const Research = require('../models/Research');
require('dotenv').config();

const researchData = [
  // ONGOING PROJECTS - ICAR
  {
    title: 'Climate Resilient Aquaculture Development',
    description: 'Development of climate-smart aquaculture practices to enhance resilience against climate change impacts on freshwater fish farming systems.',
    section: 'ongoing-projects',
    projectType: 'ICAR',
    status: 'ongoing',
    principalInvestigator: 'Dr. Rajesh Kumar Sharma',
    coInvestigators: ['Dr. Priya Kumari Singh', 'Dr. Vikash Kumar'],
    fundingAgency: 'Indian Council of Agricultural Research',
    budget: 2500000,
    duration: {
      startDate: new Date('2023-04-01'),
      endDate: new Date('2026-03-31')
    },
    department: 'Fishery Science',
    objectives: [
      'Assess climate change impacts on aquaculture',
      'Develop adaptation strategies',
      'Create early warning systems',
      'Train farmers in resilient practices'
    ],
    methodology: 'Multi-location field trials, water quality monitoring, farmer surveys, and technology demonstration',
    tags: ['climate change', 'aquaculture', 'ICAR', 'sustainability'],
    order: 1
  },
  {
    title: 'Integrated Multi-Trophic Aquaculture Systems',
    description: 'Development of sustainable IMTA systems combining fish, plants, and mollusks for improved resource efficiency.',
    section: 'ongoing-projects',
    projectType: 'ICAR',
    status: 'ongoing',
    principalInvestigator: 'Dr. Priya Kumari Singh',
    coInvestigators: ['Dr. Amit Kumar Verma'],
    fundingAgency: 'Indian Council of Agricultural Research',
    budget: 1800000,
    duration: {
      startDate: new Date('2022-07-01'),
      endDate: new Date('2025-06-30')
    },
    department: 'Aquaculture',
    objectives: [
      'Design efficient IMTA systems',
      'Optimize species combinations',
      'Assess economic viability'
    ],
    methodology: 'Experimental IMTA setups, water quality analysis, growth performance studies',
    tags: ['IMTA', 'sustainability', 'ICAR'],
    order: 2
  },

  // ONGOING PROJECTS - NFDB
  {
    title: 'Fish Health Management and Disease Surveillance',
    description: 'Establishment of comprehensive fish health monitoring system for disease diagnosis and prevention in aquaculture.',
    section: 'ongoing-projects',
    projectType: 'NFDB',
    status: 'ongoing',
    principalInvestigator: 'Dr. Sunita Devi',
    coInvestigators: ['Dr. Rajesh Kumar Sharma'],
    fundingAgency: 'National Fisheries Development Board',
    budget: 1200000,
    duration: {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2025-12-31')
    },
    department: 'Fishery Science',
    objectives: [
      'Establish disease surveillance network',
      'Develop rapid diagnostic tools',
      'Create prevention protocols'
    ],
    methodology: 'Laboratory establishment, field sampling, molecular diagnostics',
    tags: ['fish health', 'disease', 'NFDB', 'surveillance'],
    order: 3
  },

  // ONGOING PROJECTS - PMMSY
  {
    title: 'Alternative Protein Sources for Fish Feed',
    description: 'Research and development of sustainable protein alternatives using local agricultural by-products for aquaculture feed.',
    section: 'ongoing-projects',
    projectType: 'PMMSY',
    status: 'ongoing',
    principalInvestigator: 'Dr. Amit Kumar Verma',
    coInvestigators: ['Dr. Priya Kumari Singh'],
    fundingAgency: 'Pradhan Mantri Matsya Sampada Yojana',
    budget: 1500000,
    duration: {
      startDate: new Date('2023-08-01'),
      endDate: new Date('2026-07-31')
    },
    department: 'Fish Processing Technology',
    objectives: [
      'Identify alternative protein sources',
      'Develop feed formulations',
      'Conduct feeding trials'
    ],
    methodology: 'Protein source evaluation, feed formulation trials, economic analysis',
    tags: ['feed technology', 'protein', 'PMMSY'],
    order: 4
  },

  // ONGOING PROJECTS - DBT
  {
    title: 'Genetic Improvement of Indigenous Fish Species',
    description: 'Comprehensive breeding program for genetic enhancement of indigenous fish species using modern biotechnology.',
    section: 'ongoing-projects',
    projectType: 'DBT',
    status: 'ongoing',
    principalInvestigator: 'Prof. Shashikant Sadashiv Gaikwad',
    coInvestigators: ['Dr. Rajesh Kumar Sharma', 'Dr. Sunita Devi'],
    fundingAgency: 'Department of Biotechnology',
    budget: 3000000,
    duration: {
      startDate: new Date('2022-04-01'),
      endDate: new Date('2025-03-31')
    },
    department: 'Fish Genetics and Biotechnology',
    objectives: [
      'Develop breeding protocols',
      'Enhance genetic diversity',
      'Improve production traits'
    ],
    methodology: 'Molecular marker analysis, selective breeding programs, performance testing',
    tags: ['genetics', 'breeding', 'DBT', 'biotechnology'],
    order: 5
  },

  // PUBLICATIONS AND JOURNALS
  {
    title: 'Climate Change Impacts on Freshwater Fish Production',
    description: 'Comprehensive assessment of climate variability effects on fish farming productivity and adaptation strategies.',
    section: 'publications',
    principalInvestigator: 'Dr. Rajesh Kumar Sharma',
    coInvestigators: ['Dr. Vikash Kumar'],
    department: 'Fishery Science',
    publicationDetails: {
      journal: 'Aquaculture Environment Interactions',
      volume: '15',
      issue: '2',
      pages: '123-145',
      year: 2023,
      doi: '10.3354/aei00423',
      impactFactor: 2.8,
      authors: ['Dr. Rajesh Kumar Sharma', 'Dr. Vikash Kumar', 'Dr. Priya Singh']
    },
    keyFindings: [
      'Temperature rise affects fish metabolism significantly',
      'Adaptation strategies can mitigate 60% of climate impacts',
      'Early warning systems improve farmer preparedness'
    ],
    tags: ['climate change', 'publication', 'impact factor'],
    order: 1
  },
  {
    title: 'Advances in Fish Breeding Techniques',
    description: 'Novel approaches to selective breeding and genetic improvement of aquaculture species.',
    section: 'publications',
    principalInvestigator: 'Prof. Shashikant Sadashiv Gaikwad',
    coInvestigators: ['Dr. Rajesh Kumar Sharma'],
    department: 'Fish Genetics and Biotechnology',
    publicationDetails: {
      journal: 'Aquaculture Research',
      volume: '54',
      issue: '8',
      pages: '2156-2175',
      year: 2023,
      doi: '10.1111/are.15890',
      impactFactor: 3.2,
      authors: ['Prof. Shashikant Gaikwad', 'Dr. Rajesh Kumar Sharma']
    },
    keyFindings: [
      'Modern breeding techniques increase productivity by 40%',
      'Genetic markers improve selection accuracy',
      'Indigenous species show better adaptation'
    ],
    tags: ['genetics', 'breeding', 'publication'],
    order: 2
  },

  // STUDENT RESEARCH
  {
    title: 'Biofloc Technology for Sustainable Aquaculture',
    description: 'Student research on implementing biofloc technology for zero-discharge aquaculture systems.',
    section: 'student-research',
    principalInvestigator: 'Dr. Priya Kumari Singh',
    department: 'Aquaculture',
    studentDetails: {
      studentName: 'Rahul Kumar Patel',
      degree: 'M.F.Sc',
      supervisor: 'Dr. Priya Kumari Singh',
      completionYear: 2024
    },
    objectives: [
      'Evaluate biofloc system efficiency',
      'Assess fish growth performance',
      'Analyze water quality parameters'
    ],
    keyFindings: [
      'Biofloc systems reduce water usage by 80%',
      'Fish growth rates improved by 25%',
      'Feed conversion ratio optimized'
    ],
    tags: ['biofloc', 'student research', 'M.F.Sc'],
    order: 1
  },
  {
    title: 'Ornamental Fish Breeding and Marketing',
    description: 'Undergraduate research project on ornamental fish culture and market analysis.',
    section: 'student-research',
    principalInvestigator: 'Dr. Amit Kumar Verma',
    department: 'Aquaculture',
    studentDetails: {
      studentName: 'Priya Sharma',
      degree: 'B.F.Sc',
      supervisor: 'Dr. Amit Kumar Verma',
      completionYear: 2023
    },
    objectives: [
      'Study breeding protocols for ornamental fish',
      'Analyze market demand and pricing',
      'Develop business model'
    ],
    keyFindings: [
      'High market demand for native ornamental species',
      'Profitable venture for small farmers',
      'Breeding techniques standardized'
    ],
    tags: ['ornamental fish', 'student research', 'B.F.Sc'],
    order: 2
  },

  // RESEARCH COLLABORATIONS
  {
    title: 'International Aquatic Ecosystem Health Partnership',
    description: 'Multi-national collaboration on aquatic ecosystem monitoring and biodiversity conservation.',
    section: 'collaborations',
    principalInvestigator: 'Dr. Vikash Kumar',
    coInvestigators: ['Dr. Sunita Devi'],
    department: 'Aquatic Environment Management',
    collaborationDetails: {
      partnerInstitution: 'University of Stirling, Scotland',
      partnerCountry: 'United Kingdom',
      collaborationType: 'Research',
      mou: true
    },
    duration: {
      startDate: new Date('2023-06-01'),
      endDate: new Date('2026-05-31')
    },
    budget: 2200000,
    fundingAgency: 'International Development Research Centre',
    objectives: [
      'Monitor ecosystem health indicators',
      'Assess biodiversity patterns',
      'Develop conservation strategies'
    ],
    tags: ['international', 'collaboration', 'ecosystem'],
    order: 1
  },
  {
    title: 'ICAR Institute Network Partnership',
    description: 'Collaboration with premier ICAR institutes for joint research and technology transfer.',
    section: 'collaborations',
    principalInvestigator: 'Prof. Shashikant Sadashiv Gaikwad',
    department: 'Fishery Science',
    collaborationDetails: {
      partnerInstitution: 'CIFA Bhubaneswar, CIFRI Barrackpore',
      partnerCountry: 'India',
      collaborationType: 'Technology Transfer',
      mou: true
    },
    objectives: [
      'Joint research projects',
      'Faculty exchange programs',
      'Technology transfer initiatives'
    ],
    tags: ['ICAR', 'national', 'collaboration'],
    order: 2
  },

  // RESEARCH FACILITIES
  {
    title: 'Advanced Aquaculture Research Laboratory',
    description: 'State-of-the-art laboratory equipped with modern analytical instruments for fishery research.',
    section: 'facilities',
    principalInvestigator: 'Prof. Shashikant Sadashiv Gaikwad',
    department: 'Fishery Science',
    facilityDetails: {
      type: 'Laboratory',
      capacity: '50 students',
      specifications: 'Water quality analyzers, microscopes, spectrophotometers, incubators',
      utilizationAreas: ['Water quality analysis', 'Fish health diagnosis', 'Feed analysis', 'Research training']
    },
    budget: 2500000,
    fundingAgency: 'University Grants Commission',
    tags: ['laboratory', 'equipment', 'research facility'],
    order: 1
  },
  {
    title: 'Recirculating Aquaculture System (RAS)',
    description: 'Modern RAS facility for controlled environment fish production and research.',
    section: 'facilities',
    principalInvestigator: 'Dr. Priya Kumari Singh',
    department: 'Aquaculture',
    facilityDetails: {
      type: 'Infrastructure',
      capacity: '5000 L water capacity',
      specifications: 'Biological filters, UV sterilizers, automated feeding systems',
      utilizationAreas: ['Fish breeding', 'Nutrition studies', 'Water quality research', 'Student training']
    },
    budget: 1800000,
    fundingAgency: 'National Fisheries Development Board',
    tags: ['RAS', 'infrastructure', 'aquaculture'],
    order: 2
  },
  {
    title: 'Fish Health Diagnostic Center',
    description: 'Specialized facility for fish disease diagnosis and health monitoring services.',
    section: 'facilities',
    principalInvestigator: 'Dr. Sunita Devi',
    department: 'Fishery Science',
    facilityDetails: {
      type: 'Laboratory',
      capacity: '100 samples per day',
      specifications: 'PCR machines, histopathology equipment, bacterial culture systems',
      utilizationAreas: ['Disease diagnosis', 'Pathogen identification', 'Health monitoring', 'Extension services']
    },
    budget: 1500000,
    fundingAgency: 'Department of Biotechnology',
    tags: ['fish health', 'diagnostic', 'facility'],
    order: 3
  }
];

async function seedResearchStructured() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cof');
    console.log('Connected to MongoDB');

    // Clear existing research data
    await Research.deleteMany({});
    console.log('Cleared existing research data');

    // Insert new research data
    const research = await Research.insertMany(researchData);
    console.log(`✅ Successfully seeded ${research.length} research entries!`);

    console.log('\n📊 Research Seeding Summary by Section:');
    
    // Group by section
    const sectionStats = {};
    let totalBudget = 0;

    research.forEach(r => {
      sectionStats[r.section] = (sectionStats[r.section] || 0) + 1;
      totalBudget += r.budget || 0;
    });

    console.log('\n📋 By Section:');
    Object.entries(sectionStats).forEach(([section, count]) => {
      console.log(`   - ${section}: ${count} entries`);
    });

    // Project types for ongoing projects
    const projectTypes = {};
    research.filter(r => r.section === 'ongoing-projects').forEach(r => {
      projectTypes[r.projectType] = (projectTypes[r.projectType] || 0) + 1;
    });

    console.log('\n🏛️ Ongoing Projects by Type:');
    Object.entries(projectTypes).forEach(([type, count]) => {
      console.log(`   - ${type}: ${count} projects`);
    });

    console.log(`\n💰 Total Research Budget: ₹${(totalBudget / 100000).toFixed(1)} Lakhs`);

    const publications = research.filter(r => r.section === 'publications').length;
    const students = research.filter(r => r.section === 'student-research').length;
    const collaborations = research.filter(r => r.section === 'collaborations').length;
    const facilities = research.filter(r => r.section === 'facilities').length;

    console.log(`📚 Publications: ${publications}`);
    console.log(`🎓 Student Research: ${students}`);
    console.log(`🤝 Collaborations: ${collaborations}`);
    console.log(`🏢 Facilities: ${facilities}`);

  } catch (error) {
    console.error('❌ Error seeding research:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the seeding function
seedResearchStructured();