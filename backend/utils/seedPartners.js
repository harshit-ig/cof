const mongoose = require('mongoose');
const Partner = require('../models/Partner');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for partners seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const samplePartners = [
  {
    name: 'Department of Fisheries',
    logo: 'dof.jpg',
    altText: 'India Department of Fisheries Logo',
    link: 'https://dof.gov.in/',
    description: 'Central Government Department responsible for fisheries development in India',
    category: 'government',
    order: 1,
    isActive: true
  },
  {
    name: 'National Fisheries Development Board',
    logo: 'nfdb.jpg',
    altText: 'National Fisheries Development Board Logo',
    link: 'http://nfdb.gov.in/',
    description: 'Nodal agency for fisheries development and coordination',
    category: 'government',
    order: 2,
    isActive: true
  },
  {
    name: 'ICAR-CMFRI',
    logo: 'icar-cmfri.jpg',
    altText: 'ICAR-CMFRI Logo',
    link: 'https://www.cmfri.org.in/',
    description: 'Central Marine Fisheries Research Institute',
    category: 'research',
    order: 3,
    isActive: true
  },
  {
    name: 'CIFRI',
    logo: 'cifri.jpeg',
    altText: 'CIFRI Logo',
    link: 'http://cifri.icar.gov.in/',
    description: 'Central Inland Fisheries Research Institute',
    category: 'research',
    order: 4,
    isActive: true
  },
  {
    name: 'CIFA',
    logo: 'cifa.jpeg',
    altText: 'CIFA Logo',
    link: 'http://cifa.nic.in/',
    description: 'Central Institute of Freshwater Aquaculture',
    category: 'research',
    order: 5,
    isActive: true
  },
  {
    name: 'CIBA',
    logo: 'ciba.png',
    altText: 'CIBA Logo',
    link: 'https://ciba.icar.gov.in/',
    description: 'Central Institute of Brackishwater Aquaculture',
    category: 'research',
    order: 6,
    isActive: true
  },
  {
    name: 'CIFT',
    logo: 'cift.png',
    altText: 'CIFT Logo',
    link: 'https://cift.res.in/',
    description: 'Central Institute of Fisheries Technology',
    category: 'research',
    order: 7,
    isActive: true
  },
  {
    name: 'CIFE',
    logo: 'cife.jpeg',
    altText: 'CIFE Logo',
    link: 'https://www.cife.edu.in/',
    description: 'Central Institute of Fisheries Education',
    category: 'academic',
    order: 8,
    isActive: true
  },
  {
    name: 'NBFGR',
    logo: 'nbfgr.jpeg',
    altText: 'NBFGR Logo',
    link: 'https://nbfgr.res.in/',
    description: 'National Bureau of Fish Genetic Resources',
    category: 'research',
    order: 9,
    isActive: true
  },
  {
    name: 'DCFR',
    logo: 'dcfr.png',
    altText: 'DCFR Logo',
    link: 'https://dcfr.res.in/',
    description: 'Directorate of Coldwater Fisheries Research',
    category: 'research',
    order: 10,
    isActive: true
  }
];

const seedPartners = async (options = {}) => {
  const { closeConnection = false, clearExisting = true } = options;
  
  try {
    console.log('🌱 Seeding partners data...');
    
    // Clear existing partners if requested
    if (clearExisting) {
      await Partner.deleteMany({});
      console.log('✅ Cleared existing partners');
    }
    
    // Insert sample partners
    const createdPartners = await Partner.insertMany(samplePartners);
    console.log(`✅ Created ${createdPartners.length} partners`);
    
    console.log('🎉 Partners seeding completed successfully!');
    return createdPartners;
    
  } catch (error) {
    console.error('❌ Error seeding partners:', error);
    throw error;
  } finally {
    if (closeConnection) {
      mongoose.connection.close();
    }
  }
};

const runSeed = async () => {
  await connectDB();
  await seedPartners({ closeConnection: true, clearExisting: true }); // Close connection when running standalone
};

// Run if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  runSeed();
}

module.exports = { seedPartners, samplePartners };
