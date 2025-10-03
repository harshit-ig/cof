const mongoose = require('mongoose');
const Research = require('../models/Research');
require('dotenv').config();

const researchData = [
  // ICAR Projects
  {
    title: 'Climate Resilient Aquaculture Development in Central India',
    description: 'Comprehensive research project focused on developing climate-smart aquaculture practices that can adapt to changing environmental conditions. The project investigates water management, species selection, and farming techniques that enhance resilience against climate variability.',
    type: 'project',
    status: 'ongoing',
    principalInvestigator: 'Dr. Rajesh Kumar Sharma',
    coInvestigators: ['Dr. Priya Kumari Singh', 'Dr. Vikash Kumar'],
    fundingAgency: 'Indian Council of Agricultural Research (ICAR)',
    budget: 2500000,
    duration: {
      startDate: new Date('2023-04-01'),
      endDate: new Date('2026-03-31')
    },
    department: 'Fishery Science',
    objectives: [
      'Assess climate change impacts on freshwater aquaculture',
      'Develop adaptation strategies for fish farming',
      'Create early warning systems for fish farmers',
      'Train farmers in climate-resilient practices'
    ],
    methodology: 'Multi-location field trials, water quality monitoring, farmer surveys, and technology demonstration plots across different agro-climatic zones.',
    expectedOutcomes: [
      'Climate-smart aquaculture manual',
      'Farmer training modules',
      'Policy recommendations',
      'Scientific publications'
    ],
    publications: [
      {
        title: 'Impact Assessment of Climate Variability on Freshwater Fish Production',
        journal: 'Aquaculture Environment Interactions',
        year: 2023,
        authors: ['Dr. Rajesh Kumar Sharma', 'Dr. Vikash Kumar'],
        doi: '10.3354/aei00423'
      }
    ],
    tags: ['climate change', 'aquaculture', 'sustainability', 'ICAR']
  },
  {
    title: 'Integrated Multi-Trophic Aquaculture System Development',
    description: 'Development of sustainable IMTA systems combining fish, aquatic plants, and mollusks to improve resource efficiency and reduce environmental impact while maximizing economic returns.',
    type: 'project',
    status: 'ongoing',
    principalInvestigator: 'Dr. Priya Kumari Singh',
    coInvestigators: ['Dr. Amit Kumar Verma'],
    fundingAgency: 'Indian Council of Agricultural Research (ICAR)',
    budget: 1800000,
    duration: {
      startDate: new Date('2022-07-01'),
      endDate: new Date('2025-06-30')
    },
    department: 'Aquaculture',
    objectives: [
      'Design efficient IMTA systems',
      'Optimize species combinations',
      'Assess economic viability',
      'Develop management protocols'
    ],
    methodology: 'Experimental IMTA setups, water quality analysis, growth performance studies, and economic analysis.',
    expectedOutcomes: [
      'IMTA design guidelines',
      'Species compatibility matrix',
      'Economic feasibility reports',
      'Extension materials'
    ],
    tags: ['IMTA', 'sustainability', 'aquaculture', 'ICAR']
  },

  // NFDB Projects
  {
    title: 'Fish Health Management and Disease Surveillance Network',
    description: 'Establishment of comprehensive fish health monitoring system covering disease diagnosis, prevention protocols, and rapid response mechanisms for aquaculture systems in Madhya Pradesh.',
    type: 'project',
    status: 'ongoing',
    principalInvestigator: 'Dr. Sunita Devi',
    coInvestigators: ['Dr. Rajesh Kumar Sharma'],
    fundingAgency: 'National Fisheries Development Board (NFDB)',
    budget: 1200000,
    duration: {
      startDate: new Date('2023-01-01'),
      endDate: new Date('2025-12-31')
    },
    department: 'Fishery Science',
    objectives: [
      'Establish disease surveillance network',
      'Develop rapid diagnostic tools',
      'Create disease prevention protocols',
      'Train field veterinarians'
    ],
    methodology: 'Laboratory establishment, field sampling, molecular diagnostics, and capacity building programs.',
    expectedOutcomes: [
      'Disease diagnostic manual',
      'Surveillance network',
      'Training programs',
      'Policy guidelines'
    ],
    publications: [
      {
        title: 'Emerging Diseases in Freshwater Aquaculture: A Regional Perspective',
        journal: 'Fish and Shellfish Immunology',
        year: 2023,
        authors: ['Dr. Sunita Devi', 'Dr. Rajesh Kumar Sharma'],
        doi: '10.1016/j.fsi.2023.108856'
      }
    ],
    tags: ['fish health', 'disease management', 'NFDB', 'surveillance']
  },

  // PMMSY Projects
  {
    title: 'Alternative Protein Sources for Sustainable Fish Feed Development',
    description: 'Research and development of cost-effective and sustainable protein alternatives using local agricultural by-products, insects, and single-cell proteins for aquaculture feed formulation.',
    type: 'project',
    status: 'ongoing',
    principalInvestigator: 'Dr. Amit Kumar Verma',
    coInvestigators: ['Dr. Priya Kumari Singh'],
    fundingAgency: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    budget: 1500000,
    duration: {
      startDate: new Date('2023-08-01'),
      endDate: new Date('2026-07-31')
    },
    department: 'Fish Processing Technology',
    objectives: [
      'Identify alternative protein sources',
      'Develop feed formulations',
      'Conduct feeding trials',
      'Assess cost-effectiveness'
    ],
    methodology: 'Protein source evaluation, feed formulation trials, fish growth studies, and economic analysis.',
    expectedOutcomes: [
      'Alternative feed formulations',
      'Production protocols',
      'Economic viability studies',
      'Technology transfer'
    ],
    tags: ['feed technology', 'protein sources', 'PMMSY', 'sustainability']
  },

  // DBT Projects
  {
    title: 'Genetic Improvement and Selective Breeding of Indigenous Fish Species',
    description: 'Comprehensive breeding program for genetic enhancement of indigenous fish species focusing on growth rate, disease resistance, and environmental adaptability using modern biotechnology tools.',
    type: 'project',
    status: 'ongoing',
    principalInvestigator: 'Prof. Shashikant Sadashiv Gaikwad',
    coInvestigators: ['Dr. Rajesh Kumar Sharma', 'Dr. Sunita Devi'],
    fundingAgency: 'Department of Biotechnology (DBT)',
    budget: 3000000,
    duration: {
      startDate: new Date('2022-04-01'),
      endDate: new Date('2025-03-31')
    },
    department: 'Fish Genetics and Biotechnology',
    objectives: [
      'Develop breeding protocols',
      'Enhance genetic diversity',
      'Improve production traits',
      'Create elite breeding lines'
    ],
    methodology: 'Molecular marker analysis, selective breeding programs, performance testing, and genetic evaluation.',
    expectedOutcomes: [
      'Improved fish strains',
      'Breeding protocols',
      'Genetic databases',
      'Farmer training programs'
    ],
    publications: [
      {
        title: 'Advances in Fish Breeding Techniques for Indigenous Species',
        journal: 'Aquaculture Research',
        year: 2023,
        authors: ['Prof. Shashikant Gaikwad', 'Dr. Rajesh Kumar Sharma'],
        doi: '10.1111/are.15890'
      }
    ],
    tags: ['genetics', 'breeding', 'DBT', 'biotechnology']
  },

  // Publications
  {
    title: 'Nutrient Management in Intensive Aquaculture Systems',
    description: 'Comprehensive study on optimizing nutrient utilization and waste management in intensive fish farming systems to improve sustainability and economic viability.',
    type: 'publication',
    status: 'completed',
    principalInvestigator: 'Dr. Priya Kumari Singh',
    coInvestigators: ['Dr. Vikash Kumar'],
    fundingAgency: 'Internal Research Grant',
    budget: 200000,
    duration: {
      startDate: new Date('2022-01-01'),
      endDate: new Date('2023-12-31')
    },
    department: 'Aquaculture',
    publications: [
      {
        title: 'Nutrient Cycling in Intensive Aquaculture: Challenges and Solutions',
        journal: 'Aquaculture Nutrition',
        year: 2023,
        authors: ['Dr. Priya Singh', 'Dr. Vikash Kumar'],
        doi: '10.1111/anu.13567'
      },
      {
        title: 'Biofloc Technology for Sustainable Aquaculture',
        journal: 'Aquaculture International',
        year: 2023,
        authors: ['Dr. Priya Singh'],
        doi: '10.1007/s10499-023-01034-2'
      }
    ],
    tags: ['nutrition', 'aquaculture', 'sustainability', 'biofloc']
  },

  // Collaboration Projects
  {
    title: 'International Collaborative Research on Aquatic Ecosystem Health',
    description: 'Multi-institutional research collaboration focusing on aquatic ecosystem monitoring, biodiversity conservation, and sustainable fisheries management across different geographical regions.',
    type: 'collaboration',
    status: 'ongoing',
    principalInvestigator: 'Dr. Vikash Kumar',
    coInvestigators: ['Dr. Sunita Devi'],
    fundingAgency: 'International Development Research Centre (IDRC)',
    budget: 2200000,
    duration: {
      startDate: new Date('2023-06-01'),
      endDate: new Date('2026-05-31')
    },
    department: 'Aquatic Environment Management',
    objectives: [
      'Monitor ecosystem health indicators',
      'Assess biodiversity patterns',
      'Develop conservation strategies',
      'Build international networks'
    ],
    methodology: 'Multi-site monitoring, biodiversity assessments, water quality analysis, and stakeholder engagement.',
    expectedOutcomes: [
      'Ecosystem health protocols',
      'Conservation guidelines',
      'International partnerships',
      'Capacity building programs'
    ],
    tags: ['ecosystem health', 'collaboration', 'biodiversity', 'conservation']
  },

  // Facility Development
  {
    title: 'Establishment of Advanced Aquaculture Research Facility',
    description: 'Development of state-of-the-art research infrastructure including recirculating aquaculture systems, molecular laboratory, and feed technology unit for comprehensive fisheries research.',
    type: 'facility',
    status: 'completed',
    principalInvestigator: 'Prof. Shashikant Sadashiv Gaikwad',
    coInvestigators: ['All Faculty Members'],
    fundingAgency: 'University Grants Commission (UGC)',
    budget: 5000000,
    duration: {
      startDate: new Date('2021-04-01'),
      endDate: new Date('2023-03-31')
    },
    department: 'Fishery Science',
    objectives: [
      'Establish modern research infrastructure',
      'Enhance research capabilities',
      'Support student training',
      'Facilitate collaborative research'
    ],
    methodology: 'Infrastructure development, equipment procurement, facility commissioning, and staff training.',
    expectedOutcomes: [
      'Modern research facility',
      'Enhanced research output',
      'Improved student training',
      'Increased collaborations'
    ],
    tags: ['infrastructure', 'facility', 'research', 'UGC']
  }
];

async function seedResearch() {
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

    console.log('\n📊 Research Seeding Summary:');
    
    // Group by type
    const typeStats = {};
    const statusStats = {};
    const agencyStats = {};
    let totalBudget = 0;

    research.forEach(r => {
      typeStats[r.type] = (typeStats[r.type] || 0) + 1;
      statusStats[r.status] = (statusStats[r.status] || 0) + 1;
      agencyStats[r.fundingAgency] = (agencyStats[r.fundingAgency] || 0) + 1;
      totalBudget += r.budget || 0;
    });

    console.log('\n📋 By Type:');
    Object.entries(typeStats).forEach(([type, count]) => {
      console.log(`   - ${type}: ${count} entries`);
    });

    console.log('\n📈 By Status:');
    Object.entries(statusStats).forEach(([status, count]) => {
      console.log(`   - ${status}: ${count} entries`);
    });

    console.log('\n🏛️ By Funding Agency:');
    Object.entries(agencyStats).forEach(([agency, count]) => {
      console.log(`   - ${agency}: ${count} projects`);
    });

    console.log(`\n💰 Total Research Budget: ₹${(totalBudget / 100000).toFixed(1)} Lakhs`);

    const publicationsCount = research.reduce((total, r) => total + (r.publications?.length || 0), 0);
    console.log(`📚 Total Publications: ${publicationsCount}`);

  } catch (error) {
    console.error('❌ Error seeding research:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the seeding function
seedResearch();