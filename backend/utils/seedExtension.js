require('dotenv').config();
const mongoose = require('mongoose');
const Extension = require('../models/Extension');

const extensionData = [
  // Farmer Training Programs
  {
    title: 'Integrated Fish Farming Training',
    description: 'Comprehensive training on integrated fish farming systems, pond management, and sustainable aquaculture practices.',
    section: 'farmer-training',
    duration: '5 Days',
    frequency: 'Monthly',
    participants: '25-30 farmers',
    modules: [
      'Pond construction and design',
      'Fish seed selection and stocking',
      'Feed management and nutrition',
      'Water quality management',
      'Disease prevention and treatment'
    ],
    tags: ['integrated farming', 'pond management', 'aquaculture'],
    order: 1,
    isPublished: true
  },
  {
    title: 'Fish Health Management Workshop',
    description: 'Specialized training on fish disease identification, prevention strategies, and treatment protocols.',
    section: 'farmer-training',
    duration: '3 Days',
    frequency: 'Quarterly',
    participants: '20-25 farmers',
    modules: [
      'Common fish diseases identification',
      'Preventive health measures',
      'Treatment and medication',
      'Biosecurity protocols',
      'Record keeping and monitoring'
    ],
    tags: ['fish health', 'disease management', 'biosecurity'],
    order: 2,
    isPublished: true
  },
  {
    title: 'Entrepreneurship Development Program',
    description: 'Training program for youth and women entrepreneurs in fisheries sector business development.',
    section: 'farmer-training',
    duration: '7 Days',
    frequency: 'Bi-annually',
    participants: '15-20 youth',
    modules: [
      'Business plan development',
      'Financial planning and management',
      'Marketing strategies',
      'Government schemes and subsidies',
      'Value addition techniques'
    ],
    tags: ['entrepreneurship', 'business development', 'youth'],
    order: 3,
    isPublished: true
  },
  {
    title: 'Ornamental Fish Culture Training',
    description: 'Specialized training on ornamental fish breeding, culture, and marketing for additional income generation.',
    section: 'farmer-training',
    duration: '4 Days',
    frequency: 'Quarterly',
    participants: '20-25 farmers',
    modules: [
      'Ornamental fish species selection',
      'Breeding techniques',
      'Tank management systems',
      'Feed and nutrition',
      'Marketing and export opportunities'
    ],
    tags: ['ornamental fish', 'breeding', 'value addition'],
    order: 4,
    isPublished: true
  },

  // FFPO and SHG Activities
  {
    title: 'Fish Farmer Producer Organization Development',
    description: 'Supporting formation and strengthening of FFPOs for collective marketing and resource sharing.',
    section: 'ffpo-shg',
    type: 'FFPO Support',
    activities: [
      'FFPO registration and legal compliance',
      'Capacity building of FFPO members',
      'Market linkage development',
      'Collective procurement of inputs',
      'Financial literacy programs'
    ],
    beneficiaries: '150+ farmers',
    impact: '25% increase in farmers income',
    tags: ['FFPO', 'collective marketing', 'farmer organization'],
    order: 1,
    isPublished: true
  },
  {
    title: 'Self Help Group Fisheries Activities',
    description: 'Empowering women SHGs through fisheries-based livelihood programs and skill development.',
    section: 'ffpo-shg',
    type: 'SHG Support',
    activities: [
      'Fish processing and value addition',
      'Micro-credit facility development',
      'Group formation and training',
      'Marketing support and branding',
      'Quality certification assistance'
    ],
    beneficiaries: '200+ women',
    impact: '40% increase in household income',
    tags: ['SHG', 'women empowerment', 'value addition'],
    order: 2,
    isPublished: true
  },
  {
    title: 'Fisheries Cooperative Strengthening',
    description: 'Strengthening existing fisheries cooperatives and forming new ones for better resource utilization.',
    section: 'ffpo-shg',
    type: 'Cooperative Support',
    activities: [
      'Cooperative management training',
      'Financial management systems',
      'Equipment and infrastructure support',
      'Technical assistance programs',
      'Market development initiatives'
    ],
    beneficiaries: '300+ members',
    impact: '30% reduction in input costs',
    tags: ['cooperatives', 'resource utilization', 'management'],
    order: 3,
    isPublished: true
  },

  // Demonstrations
  {
    title: 'Biofloc Technology Demonstration',
    description: 'Demonstration of biofloc technology for sustainable and intensive fish production with minimal water exchange.',
    section: 'demonstrations',
    location: 'College Demo Farm',
    area: '0.5 hectares',
    features: [
      'Zero water exchange system',
      'Microbial protein utilization',
      'High stocking density trials',
      'Cost-benefit analysis',
      'Environmental impact assessment'
    ],
    results: '30% higher productivity, 50% water savings',
    tags: ['biofloc', 'sustainable aquaculture', 'water conservation'],
    order: 1,
    isPublished: true
  },
  {
    title: 'Integrated Aquaculture Systems',
    description: 'Demonstration of integrated farming systems combining fish culture with agriculture and livestock.',
    section: 'demonstrations',
    location: 'Field Demonstration Units',
    area: '2 hectares',
    features: [
      'Fish-rice integration',
      'Fish-poultry integration',
      'Fish-vegetable farming',
      'Nutrient cycling systems',
      'Resource optimization'
    ],
    results: '40% increase in overall farm income',
    tags: ['integrated systems', 'diversification', 'income enhancement'],
    order: 2,
    isPublished: true
  },
  {
    title: 'Cage Culture Technology',
    description: 'Demonstration of cage culture technology in open water bodies for community-based aquaculture.',
    section: 'demonstrations',
    location: 'Narmada River',
    area: '1 hectare water area',
    features: [
      'HDPE cage installation',
      'Species selection trials',
      'Feed management protocols',
      'Environmental monitoring',
      'Community participation'
    ],
    results: '25% higher fish survival rates',
    tags: ['cage culture', 'open water', 'community aquaculture'],
    order: 3,
    isPublished: true
  },
  {
    title: 'Recirculating Aquaculture System (RAS)',
    description: 'Advanced RAS demonstration for intensive fish production with minimal environmental impact.',
    section: 'demonstrations',
    location: 'College Campus',
    area: '500 sq.m',
    features: [
      'Water recirculation system',
      'Biological filtration',
      'Automated monitoring',
      'Energy efficiency trials',
      'Production optimization'
    ],
    results: '90% water savings, 3x higher productivity',
    tags: ['RAS', 'intensive aquaculture', 'technology'],
    order: 4,
    isPublished: true
  },

  // Success Stories
  {
    title: 'Integrated Fish Farming Success',
    description: 'After attending our integrated fish farming training, Ramesh implemented fish-rice integration on his 2-hectare farm. With technical support from the college, he achieved remarkable success in fish production while maintaining rice cultivation.',
    section: 'success-stories',
    name: 'Ramesh Kumar Patel',
    program: 'Integrated Fish Farming',
    achievement: 'Increased income from ₹50,000 to ₹2,50,000 annually',
    story: 'After attending our integrated fish farming training, Ramesh implemented fish-rice integration on his 2-hectare farm. With technical support from the college, he achieved remarkable success in fish production while maintaining rice cultivation.',
    impactPoints: [
      'Income increased by 400%',
      'Created employment for 5 workers',
      'Became a model farmer in region',
      'Now training other farmers'
    ],
    year: '2023',
    tags: ['success story', 'integrated farming', 'income increase'],
    order: 1,
    isPublished: true
  },
  {
    title: 'Women SHG Processing Success',
    description: 'A group of 12 women from Sunita Devi SHG received training in fish processing and value addition. They established a processing unit and are now supplying processed fish products to urban markets.',
    section: 'success-stories',
    name: 'Sunita Devi SHG',
    program: 'Women SHG Fish Processing',
    achievement: 'Established successful fish processing unit with ₹15 lakh annual turnover',
    story: 'A group of 12 women from Sunita Devi SHG received training in fish processing and value addition. They established a processing unit and are now supplying processed fish products to urban markets.',
    impactPoints: [
      'Generated livelihood for 12 women',
      'Annual turnover of ₹15 lakhs',
      'Reduced post-harvest losses by 80%',
      'Inspired 5 other SHGs to start similar units'
    ],
    year: '2023',
    tags: ['success story', 'women empowerment', 'processing'],
    order: 2,
    isPublished: true
  },
  {
    title: 'FFPO Collective Marketing Success',
    description: 'With support from our extension team, 45 fish farmers formed an FFPO for collective input procurement and marketing. The organization now handles procurement and marketing for all member farmers.',
    section: 'success-stories',
    name: 'Rajesh Fish Farmers FFPO',
    program: 'FFPO Development',
    achievement: 'Collective marketing increased farmers profit by 35%',
    story: 'With support from our extension team, 45 fish farmers formed an FFPO for collective input procurement and marketing. The organization now handles procurement and marketing for all member farmers.',
    impactPoints: [
      '45 farmers benefited',
      'Input costs reduced by 20%',
      'Market price increased by 35%',
      'Established direct market linkages'
    ],
    year: '2024',
    tags: ['success story', 'FFPO', 'collective marketing'],
    order: 3,
    isPublished: true
  },
  {
    title: 'Youth Entrepreneurship Success',
    description: 'Pradeep, a graduate, attended our entrepreneurship development program and started ornamental fish breeding. He now supplies ornamental fish to pet shops across MP and neighboring states.',
    section: 'success-stories',
    name: 'Pradeep Youth Entrepreneur',
    program: 'Entrepreneurship Development',
    achievement: 'Started ornamental fish business with ₹8 lakh annual income',
    story: 'Pradeep, a graduate, attended our entrepreneurship development program and started ornamental fish breeding. He now supplies ornamental fish to pet shops across MP and neighboring states.',
    impactPoints: [
      'Self-employment generation',
      'Annual income of ₹8 lakhs',
      'Created jobs for 3 youth',
      'Established export linkages'
    ],
    year: '2024',
    tags: ['success story', 'youth entrepreneurship', 'ornamental fish'],
    order: 4,
    isPublished: true
  }
];

const seedExtensions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing extension data
    await Extension.deleteMany({});
    console.log('Cleared existing extension data');

    // Insert new extension data
    const result = await Extension.insertMany(extensionData);
    console.log(`Successfully seeded ${result.length} extension items`);

    // Group by section for display
    const grouped = result.reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = 0;
      acc[item.section]++;
      return acc;
    }, {});

    console.log('\nExtension items created by section:');
    Object.entries(grouped).forEach(([section, count]) => {
      console.log(`  ${section}: ${count} items`);
    });

    mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    console.log('Extension seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding extension data:', error);
    mongoose.disconnect();
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedExtensions();
}

module.exports = seedExtensions;