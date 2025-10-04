const mongoose = require('mongoose');
const Alumni = require('../models/Alumni');
require('dotenv').config();

// Alumni Testimonials Data
const testimonialsData = [
  {
    section: 'testimonial',
    title: 'Outstanding Education Experience',
    name: 'Dr. Priya Sharma',
    batch: '2018',
    position: 'Senior Aquaculture Scientist',
    company: 'ICAR-CIFE, Mumbai',
    image: '/uploads/alumni/priya-sharma.jpg',
    testimonial: 'COF Jabalpur provided me with a strong foundation in fishery science. The faculty members are highly dedicated and the practical training I received was invaluable for my career.',
    rating: 5,
    description: 'Outstanding education and research opportunities',
    sortOrder: 1,
    isPublished: true
  },
  {
    section: 'testimonial',
    title: 'Best Learning Environment',
    name: 'Rahul Verma',
    batch: '2019',
    position: 'Fishery Officer',
    company: 'Department of Fisheries, Madhya Pradesh',
    image: '/uploads/alumni/rahul-verma.jpg',
    testimonial: 'The hands-on experience with fish farming techniques and fishery management practices at COF was exceptional. It prepared me well for my role in the fisheries department.',
    rating: 5,
    description: 'Excellent practical training and exposure',
    sortOrder: 2,
    isPublished: true
  },
  {
    section: 'testimonial',
    title: 'Career-Defining Experience',
    name: 'Anjali Mehta',
    batch: '2017',
    position: 'Aquaculture Entrepreneur',
    company: 'AquaFresh Farms Pvt. Ltd.',
    image: '/uploads/alumni/anjali-mehta.jpg',
    testimonial: 'COF not only taught me the science of fisheries but also inspired me to become an entrepreneur. Today, I run my own successful aquaculture business thanks to the knowledge and confidence I gained here.',
    rating: 5,
    description: 'Inspired entrepreneurship in aquaculture',
    sortOrder: 3,
    isPublished: true
  },
  {
    section: 'testimonial',
    title: 'Research Excellence',
    name: 'Dr. Vikram Singh',
    batch: '2016',
    position: 'Research Scientist',
    company: 'CSIR-NEERI, Nagpur',
    image: '/uploads/alumni/vikram-singh.jpg',
    testimonial: 'The research culture at COF Jabalpur is exceptional. My professors mentored me throughout my academic journey, which helped me secure a research position at a premier institute.',
    rating: 5,
    description: 'Strong research foundation and mentorship',
    sortOrder: 4,
    isPublished: true
  },
  {
    section: 'testimonial',
    title: 'Global Opportunities',
    name: 'Sneha Patel',
    batch: '2015',
    position: 'Fisheries Consultant',
    company: 'WorldFish Center, Malaysia',
    image: '/uploads/alumni/sneha-patel.jpg',
    testimonial: 'The international exposure and quality education at COF opened doors for me globally. I am now working with WorldFish Center on sustainable aquaculture projects.',
    rating: 5,
    description: 'Global career opportunities',
    sortOrder: 5,
    isPublished: true
  },
  {
    section: 'testimonial',
    title: 'Industry Ready',
    name: 'Amit Kumar',
    batch: '2020',
    position: 'Production Manager',
    company: 'Avanti Feeds Limited',
    image: '/uploads/alumni/amit-kumar.jpg',
    testimonial: 'The curriculum at COF is well-designed to meet industry requirements. I felt confident and well-prepared when I joined the corporate sector.',
    rating: 4,
    description: 'Industry-oriented curriculum',
    sortOrder: 6,
    isPublished: true
  }
];

// Alumni Events Data
const eventsData = [
  {
    section: 'event',
    title: 'Annual Alumni Meet 2025',
    date: 'December 15, 2025',
    time: '10:00 AM - 5:00 PM',
    venue: 'COF Jabalpur Campus Auditorium',
    registrationOpen: true,
    eventType: 'upcoming',
    description: 'Join us for our annual alumni reunion! Reconnect with old friends, network with fellow professionals, and share your experiences. The event includes keynote speeches, panel discussions, and cultural programs.',
    sortOrder: 1,
    isPublished: true
  },
  {
    section: 'event',
    title: 'Alumni Career Guidance Workshop',
    date: 'November 20, 2025',
    time: '2:00 PM - 4:00 PM',
    venue: 'Virtual (Zoom)',
    registrationOpen: true,
    eventType: 'upcoming',
    description: 'Senior alumni professionals will share insights about career paths in fisheries, aquaculture, and related fields. An excellent opportunity for recent graduates and current students.',
    sortOrder: 2,
    isPublished: true
  },
  {
    section: 'event',
    title: 'Aquaculture Innovation Summit',
    date: 'January 10, 2026',
    time: '9:00 AM - 6:00 PM',
    venue: 'Hotel Radisson, Jabalpur',
    registrationOpen: true,
    eventType: 'upcoming',
    description: 'A day-long summit featuring alumni entrepreneurs, researchers, and industry leaders discussing innovations in aquaculture technology and sustainable practices.',
    sortOrder: 3,
    isPublished: true
  },
  {
    section: 'event',
    title: 'Silver Jubilee Batch Reunion - Batch of 2000',
    date: 'October 5, 2025',
    time: '11:00 AM - 3:00 PM',
    venue: 'COF Campus',
    registrationOpen: false,
    eventType: 'past',
    description: 'The batch of 2000 celebrated their 25th reunion with great enthusiasm. Over 50 alumni attended the event, sharing memories and achievements.',
    sortOrder: 4,
    isPublished: true
  },
  {
    section: 'event',
    title: 'Alumni Networking Evening',
    date: 'September 15, 2025',
    time: '6:00 PM - 9:00 PM',
    venue: 'Boat Club, Jabalpur',
    registrationOpen: false,
    eventType: 'past',
    description: 'An informal networking evening where alumni from various batches connected over dinner and discussed collaboration opportunities.',
    sortOrder: 5,
    isPublished: true
  }
];

// Contact Information Data
const contactsData = [
  {
    section: 'contact',
    title: 'Main Email',
    contactType: 'email',
    email: 'alumni@cofjabalpur.edu.in',
    description: 'For general inquiries and alumni registration',
    sortOrder: 1,
    isPublished: true
  },
  {
    section: 'contact',
    title: 'Office Phone',
    contactType: 'phone',
    phone: '+91 761 2681239',
    description: 'Alumni Office - Monday to Friday, 10 AM to 5 PM',
    sortOrder: 2,
    isPublished: true
  },
  {
    section: 'contact',
    title: 'Campus Address',
    contactType: 'address',
    address: 'College of Fishery Science, Jabalpur, Madhya Pradesh, India - 482001',
    description: 'Visit us at our campus',
    sortOrder: 3,
    isPublished: true
  },
  {
    section: 'contact',
    title: 'WhatsApp Group',
    contactType: 'phone',
    phone: '+91 98765 43210',
    description: 'Join our official alumni WhatsApp community',
    sortOrder: 4,
    isPublished: true
  }
];

// Alumni Statistics Data
const statsData = [
  {
    section: 'stats',
    title: 'Alumni Worldwide',
    icon: 'GraduationCap',
    value: '500+',
    label: 'Alumni Worldwide',
    color: 'blue',
    description: 'Our alumni are spread across the globe',
    order: 1,
    sortOrder: 1,
    isPublished: true
  },
  {
    section: 'stats',
    title: 'Industry Leaders',
    icon: 'Award',
    value: '50+',
    label: 'Industry Leaders',
    color: 'green',
    description: 'Alumni holding leadership positions',
    order: 2,
    sortOrder: 2,
    isPublished: true
  },
  {
    section: 'stats',
    title: 'Countries',
    icon: 'Users',
    value: '25+',
    label: 'Countries',
    color: 'purple',
    description: 'Countries where our alumni work',
    order: 3,
    sortOrder: 3,
    isPublished: true
  },
  {
    section: 'stats',
    title: 'Employment Rate',
    icon: 'Star',
    value: '95%',
    label: 'Employment Rate',
    color: 'yellow',
    description: 'Alumni employed within 6 months of graduation',
    order: 4,
    sortOrder: 4,
    isPublished: true
  }
];

const seedAlumni = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cof_db');
    console.log('Connected to MongoDB');

    // Clear existing alumni data
    await Alumni.deleteMany({});
    console.log('Cleared existing alumni data');

    // Insert all alumni data
    const allAlumniData = [
      ...testimonialsData,
      ...eventsData,
      ...contactsData,
      ...statsData
    ];

    const result = await Alumni.insertMany(allAlumniData);
    console.log(`Seeded ${result.length} alumni items`);
    console.log(`- Testimonials: ${testimonialsData.length}`);
    console.log(`- Events: ${eventsData.length}`);
    console.log(`- Contacts: ${contactsData.length}`);
    console.log(`- Statistics: ${statsData.length}`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    console.log('Alumni seeding completed successfully!');

  } catch (error) {
    console.error('Error seeding alumni data:', error);
    process.exit(1);
  }
};

// Run the seeder
seedAlumni();
