const mongoose = require('mongoose');
const Collaboration = require('../models/Collaboration');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for collaborations seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const sampleCollaborations = [
  // MoUs & Implementations
  {
    section: 'mou',
    organization: 'National Agricultural Cooperative Marketing Federation of India Ltd. (NAFED)',
    type: 'Government Agency',
    category: 'Marketing & Distribution',
    signedDate: 'March 2023',
    duration: '5 Years',
    title: 'Strategic Partnership for Marketing Support',
    description: 'Strategic partnership for marketing support, distribution networks, and procurement of fish products from college demonstration units and associated farmers.',
    objectives: [
      'Market linkage for fish products',
      'Price stabilization support',
      'Technical assistance in post-harvest management',
      'Training on cooperative marketing',
      'Quality certification support'
    ],
    activities: [
      'Monthly fish procurement drives',
      'Farmer training on quality standards',
      'Market price information dissemination',
      'Cooperative formation support',
      'Value chain development'
    ],
    outcomes: '₹15 lakh annual procurement, 200+ farmers benefited',
    contactPerson: 'Dr. A.K. Sharma, Nodal Officer',
    status: 'Active',
    sortOrder: 1,
    isPublished: true
  },
  {
    section: 'mou',
    organization: 'National Fisheries Development Board (NFDB)',
    type: 'Government Board',
    category: 'Development & Funding',
    signedDate: 'January 2022',
    duration: 'Ongoing',
    title: 'Comprehensive Collaboration for Fisheries Development',
    description: 'Comprehensive collaboration for fisheries development, infrastructure enhancement, capacity building, and technology demonstration projects.',
    objectives: [
      'Infrastructure development support',
      'Technology demonstration projects',
      'Capacity building programs',
      'Research collaboration',
      'Extension and outreach activities'
    ],
    activities: [
      'Biofloc demonstration units',
      'RAS technology transfer',
      'Farmer training programs',
      'Seed production enhancement',
      'Aquaculture extension services'
    ],
    outcomes: '₹2.5 crore funding received, 5 demonstration units established',
    contactPerson: 'Prof. R.K. Mishra, Principal Investigator',
    status: 'Active',
    sortOrder: 2,
    isPublished: true
  },
  {
    section: 'mou',
    organization: 'Indian Council of Agricultural Research (ICAR)',
    type: 'Research Council',
    category: 'Research & Education',
    signedDate: 'June 2021',
    duration: 'Permanent',
    title: 'Academic and Research Collaboration',
    description: 'Academic and research collaboration for student exchange, joint research projects, faculty development, and knowledge sharing in fisheries science.',
    objectives: [
      'Joint research initiatives',
      'Faculty exchange programs',
      'Student internship opportunities',
      'Resource sharing',
      'Publication collaborations'
    ],
    activities: [
      'Research project collaborations',
      'Faculty training programs',
      'Student placement support',
      'Library resource sharing',
      'Conference participations'
    ],
    outcomes: '15 joint research projects, 50+ student internships',
    contactPerson: 'Dr. S.P. Singh, Research Coordinator',
    status: 'Active',
    sortOrder: 3,
    isPublished: true
  },
  {
    section: 'mou',
    organization: 'Madhya Pradesh State Fisheries Development Corporation',
    type: 'State Corporation',
    category: 'State Development',
    signedDate: 'September 2023',
    duration: '3 Years',
    title: 'State-level Partnership for Fisheries Development',
    description: 'State-level partnership for fisheries development, technology transfer, capacity building, and marketing support across Madhya Pradesh.',
    objectives: [
      'Statewide technology dissemination',
      'Farmer capacity building',
      'Market development support',
      'Policy implementation assistance',
      'Resource mobilization'
    ],
    activities: [
      'District-wise training programs',
      'Technology demonstration',
      'Market facilitation',
      'Policy advisory services',
      'Data collection and analysis'
    ],
    outcomes: '500+ farmers trained, 10 districts covered',
    contactPerson: 'Dr. M.K. Patel, Extension Officer',
    status: 'Active',
    sortOrder: 4,
    isPublished: true
  },
  {
    section: 'mou',
    organization: 'Self Help Group Federation (MPSHGF)',
    type: 'NGO Federation',
    category: 'Rural Development',
    signedDate: 'November 2022',
    duration: '4 Years',
    title: 'Grassroots Collaboration for Women Empowerment',
    description: 'Grassroots collaboration for women empowerment through fisheries, SHG capacity building, and livelihood enhancement programs.',
    objectives: [
      'Women empowerment through fisheries',
      'SHG capacity building',
      'Livelihood diversification',
      'Financial inclusion support',
      'Skill development programs'
    ],
    activities: [
      'Women-focused training programs',
      'SHG formation and strengthening',
      'Microfinance facilitation',
      'Value addition training',
      'Market linkage support'
    ],
    outcomes: '150 SHGs formed, 2000+ women trained',
    contactPerson: 'Ms. Priya Sharma, Program Manager',
    status: 'Active',
    sortOrder: 5,
    isPublished: true
  },
  {
    section: 'mou',
    organization: 'WorldFish Center',
    type: 'International NGO',
    category: 'Global Partnership',
    signedDate: 'May 2024',
    duration: '5 Years',
    title: 'International Collaboration for Research Excellence',
    description: 'International collaboration for research excellence, student exchange, capacity building, and sustainable aquaculture development.',
    objectives: [
      'International research collaboration',
      'Student exchange programs',
      'Faculty development',
      'Technology transfer',
      'Global best practices adoption'
    ],
    activities: [
      'Joint research projects',
      'International internships',
      'Virtual conferences',
      'Publication collaborations',
      'Training material development'
    ],
    outcomes: '2 joint research projects initiated, 5 student exchanges',
    contactPerson: 'Dr. Sarah Johnson, Country Representative',
    status: 'Active',
    sortOrder: 6,
    isPublished: true
  },

  // Partnerships
  {
    section: 'partnership',
    partnerType: 'Government Departments & Boards',
    title: 'Government Departments & Boards',
    description: 'Strategic partnerships with central and state government departments for policy implementation and development initiatives.',
    partners: [
      { name: 'Department of Fisheries (DOF)', description: 'Central government department for fisheries policy and development' },
      { name: 'National Fisheries Development Board (NFDB)', description: 'National board for fisheries development and infrastructure' },
      { name: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)', description: 'Flagship scheme for fisheries sector development' }
    ],
    sortOrder: 1,
    isPublished: true
  },
  {
    section: 'partnership',
    partnerType: 'ICAR (Indian Council of Agricultural Research) & Institutes',
    title: 'ICAR Research Institutes',
    description: 'Collaboration with premier ICAR research institutes for cutting-edge research and technology transfer.',
    partners: [
      { name: 'ICAR-CMFRI, Kochi, Kerala', description: 'Central Marine Fisheries Research Institute - Marine Research' },
      { name: 'ICAR-CIFRI, Barrackpore, West Bengal', description: 'Central Inland Fisheries Research Institute - Inland Fisheries' },
      { name: 'ICAR-CIFA, Bhubaneswar, Odisha', description: 'Central Institute of Freshwater Aquaculture - Freshwater Aquaculture' },
      { name: 'ICAR-CIBA, Chennai, Tamil Nadu', description: 'Central Institute of Brackishwater Aquaculture - Brackishwater' },
      { name: 'ICAR-CIFT, Cochin, Kerala', description: 'Central Institute of Fisheries Technology - Fisheries Technology' },
      { name: 'ICAR-CIFE, Mumbai, Maharashtra', description: 'Central Institute of Fisheries Education (Deemed University) - Education' },
      { name: 'ICAR-NBFGR, Lucknow, Uttar Pradesh', description: 'National Bureau of Fish Genetic Resources - Genetics' },
      { name: 'ICAR-DCFR, Bhimtal, Uttarakhand', description: 'Directorate of Coldwater Fisheries Research - Coldwater' }
    ],
    sortOrder: 2,
    isPublished: true
  },
  {
    section: 'partnership',
    partnerType: 'Development & Extension Organizations',
    title: 'Development & Extension Organizations',
    description: 'Partnership with organizations focused on agricultural extension and farmer development.',
    partners: [
      { name: 'MANAGE', description: 'National Institute of Agricultural Extension Management' },
      { name: 'SFAC', description: 'Small Farmers\' Agribusiness Consortium' },
      { name: 'NERAMAC', description: 'North Eastern Regional Agricultural Marketing Corporation' }
    ],
    sortOrder: 3,
    isPublished: true
  },
  {
    section: 'partnership',
    partnerType: 'Marketing & Export Organizations',
    title: 'Marketing & Export Organizations',
    description: 'Collaboration with marketing and export promotion agencies for market linkage and value chain development.',
    partners: [
      { name: 'MPEDA', description: 'Marine Products Export Development Authority' },
      { name: 'NAFED', description: 'National Agricultural Cooperative Marketing Federation of India' },
      { name: 'NCDC', description: 'National Cooperative Development Corporation' }
    ],
    sortOrder: 4,
    isPublished: true
  },
  {
    section: 'partnership',
    partnerType: 'Financial & Rural Development',
    title: 'Financial & Rural Development',
    description: 'Strategic alliance with financial institutions for infrastructure development and farmer financing.',
    partners: [
      { name: 'NABARD', description: 'National Bank for Agriculture and Rural Development - Rural development financing, Agricultural infrastructure support, Capacity building programs' }
    ],
    sortOrder: 5,
    isPublished: true
  },

  // Impact Metrics
  {
    section: 'impact',
    impactType: 'agreements',
    icon: 'Users2',
    value: '12+',
    label: 'Active MoUs & Agreements',
    title: 'Active MoUs & Agreements',
    description: 'Number of active memorandums of understanding and formal agreements',
    color: 'blue',
    sortOrder: 1,
    isPublished: true
  },
  {
    section: 'impact',
    impactType: 'partners',
    icon: 'Building2',
    value: '25+',
    label: 'Industry Partners',
    title: 'Industry Partners',
    description: 'Number of active industry and institutional partners',
    color: 'orange',
    sortOrder: 2,
    isPublished: true
  },
  {
    section: 'impact',
    impactType: 'beneficiaries',
    icon: 'Users',
    value: '5000+',
    label: 'Farmers Benefited',
    title: 'Farmers Benefited',
    description: 'Total number of farmers benefited through collaborative programs',
    color: 'green',
    sortOrder: 3,
    isPublished: true
  },
  {
    section: 'impact',
    impactType: 'international',
    icon: 'Globe',
    value: '8+',
    label: 'International Implementations',
    title: 'International Implementations',
    description: 'Number of international collaborative implementations and projects',
    color: 'purple',
    sortOrder: 4,
    isPublished: true
  }
];

const seedCollaborations = async (options = {}) => {
  const { closeConnection = false, clearExisting = true } = options;
  
  try {
    console.log('🌱 Seeding collaborations data...');
    
    // Clear existing collaborations if requested
    if (clearExisting) {
      await Collaboration.deleteMany({});
      console.log('✅ Cleared existing collaborations');
    }
    
    // Insert sample collaborations
    const createdCollaborations = await Collaboration.insertMany(sampleCollaborations);
    console.log(`✅ Created ${createdCollaborations.length} collaborations`);
    console.log(`   - MoUs: ${createdCollaborations.filter(c => c.section === 'mou').length}`);
    console.log(`   - Partnerships: ${createdCollaborations.filter(c => c.section === 'partnership').length}`);
    console.log(`   - Impact Metrics: ${createdCollaborations.filter(c => c.section === 'impact').length}`);
    
    console.log('🎉 Collaborations seeding completed successfully!');
    return createdCollaborations;
    
  } catch (error) {
    console.error('❌ Error seeding collaborations:', error);
    throw error;
  } finally {
    if (closeConnection) {
      mongoose.connection.close();
    }
  }
};

const runSeed = async () => {
  await connectDB();
  await seedCollaborations({ closeConnection: true, clearExisting: true });
};

// Run if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  runSeed();
}

module.exports = { seedCollaborations, sampleCollaborations };
