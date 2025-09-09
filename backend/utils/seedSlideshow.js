const mongoose = require('mongoose');
const Slideshow = require('../models/Slideshow');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for slideshow seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedSlideshow = async () => {
  try {
    // Clear existing slides
    await Slideshow.deleteMany({});
    console.log('Cleared existing slides');

    // Create default slides using the existing slider images
    const defaultSlides = [
      {
        title: 'College of Fishery, Jabalpur',
        subtitle: 'Excellence in Fishery Education & Research',
        description: 'Leading institution under Nanaji Deshmukh Veterinary Science University for fishery science education, committed to nurturing future professionals in aquaculture and fisheries management.',
        image: '/slider.jpg',
        cta: 'Learn More',
        link: '/about',
        order: 0,
        isActive: true
      },
      {
        title: 'State-of-the-Art Facilities',
        subtitle: 'Modern Infrastructure for Quality Education',
        description: 'Well-equipped laboratories, research facilities, and comprehensive infrastructure to provide hands-on learning experience.',
        image: '/slider-2.jpg',
        cta: 'Explore Facilities',
        link: '/infrastructure',
        order: 1,
        isActive: true
      },
      {
        title: 'Research & Innovation',
        subtitle: 'Advancing fishery science',
        description: 'Cutting-edge research programs contributing to sustainable fisheries development and aquaculture innovation.',
        image: '/slider-3.jpg',
        cta: 'View Research',
        link: '/research',
        order: 2,
        isActive: true
      },
      {
        title: 'Campus Life & Activities',
        subtitle: 'Vibrant Student Community',
        description: 'Experience a dynamic campus environment with various student activities, cultural events, and academic programs.',
        image: '/slider-4.jpg',
        cta: 'Explore Campus',
        link: '/about',
        order: 3,
        isActive: true
      }
    ];

    // Insert default slides
    await Slideshow.insertMany(defaultSlides);
    console.log(`Created ${defaultSlides.length} default slides`);

    console.log('Slideshow seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding slideshow:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedSlideshow();
};

// Run if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  runSeed();
}

module.exports = { seedSlideshow };





