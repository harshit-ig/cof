const mongoose = require('mongoose');
const Content = require('../models/Content');
require('dotenv').config();

const mandateData = {
  core: [
    'Human Resource Development in Fisheries',
    'Basic, applied and adaptive research on emerging problems in fisheries',
    'Transfer of technology to fish farmers, entrepreneurs and industry',
    'To develop college as center for demonstrations and training to unemployed youth, tribal and fish farmers',
    'To impart the latest technology of composite fish culture to increase fish production from an average of 700 kg/ha to 4000 kg/ha'
  ],
  objectives: [
    'Human Resource Development',
    'Fish production and productivity enhancement',
    'Development of fishery through lab to land programme'
  ],
  thrust: [
    'Imparting education in the field of fisheries to generate technical graduates',
    'To exploits the maximum areas of fisheries through Research and Development activity',
    'To impart latest technology (Lab to land programme) to fish farmers through extension activities'
  ]
};

const seedMandateContent = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cof');
    console.log('Connected to MongoDB');

    // Create mandate content entries
    const mandateEntries = [
      {
        key: 'about-mandate-core',
        title: 'Core Mandate',
        content: JSON.stringify(mandateData.core),
        type: 'json',
        section: 'about',
        subsection: 'mandate-core',
        isPublished: true,
        order: 4
      },
      {
        key: 'about-mandate-objectives',
        title: 'Mandate Objectives',
        content: JSON.stringify(mandateData.objectives),
        type: 'json',
        section: 'about',
        subsection: 'mandate-objectives',
        isPublished: true,
        order: 5
      },
      {
        key: 'about-mandate-thrust',
        title: 'Mandate Thrust Areas',
        content: JSON.stringify(mandateData.thrust),
        type: 'json',
        section: 'about',
        subsection: 'mandate-thrust',
        isPublished: true,
        order: 6
      }
    ];

    // Insert or update mandate content
    for (const entry of mandateEntries) {
      const existingContent = await Content.findOne({ key: entry.key });
      
      if (existingContent) {
        await Content.findOneAndUpdate({ key: entry.key }, entry);
        console.log(`Updated: ${entry.title}`);
      } else {
        await Content.create(entry);
        console.log(`Created: ${entry.title}`);
      }
    }

    console.log('Mandate content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding mandate content:', error);
    process.exit(1);
  }
};

seedMandateContent();