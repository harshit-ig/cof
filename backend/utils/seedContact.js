const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const seedContact = async () => {
  try {
    console.log('🌱 Seeding Contact data...');

    // Clear existing contact data
    await Contact.deleteMany({});
    console.log('🗑️  Cleared existing contact data');

    // Create comprehensive contact data
    const contactData = {
      contactInfo: {
        phone: {
          main: '+91-761-2681971',
          office: '+91-761-2681971',
          fax: '+91-761-2681970'
        },
        email: {
          main: 'info.cof@ndvsu.ac.in',
          registrar: 'registrar@ndvsu.ac.in',
          info: 'info.cof@ndvsu.ac.in'
        },
        address: {
          institution: 'College of Fishery',
          university: 'Nanaji Deshmukh Veterinary Science University',
          street: 'Adhartal',
          city: 'Jabalpur',
          state: 'Madhya Pradesh',
          pincode: '482004',
          country: 'India'
        },
        officeHours: {
          weekdays: 'Monday - Friday: 9:00 AM - 5:00 PM',
          saturday: 'Saturday: 9:00 AM - 1:00 PM',
          sunday: 'Sunday: Closed'
        }
      },

      mapConfig: {
        title: 'College of Fishery, Jabalpur',
        description: 'Find us at our beautiful campus in Jabalpur, Madhya Pradesh',
        latitude: 23.1815,
        longitude: 79.9864,
        zoom: 15
      },

      directions: {
        byRoad: 'NH 34 from Bhopal (300 km), NH 7 from Nagpur (250 km). Well connected by state highways from nearby cities.',
        byAir: 'Nearest airport: Jabalpur Airport (15 km from campus). Regular flights from Delhi, Mumbai, and other major cities.',
        byTrain: 'Jabalpur Railway Station (12 km from campus). Major trains from Delhi, Mumbai, Chennai, and Kolkata.'
      },

      departments: [
        {
          name: 'Department of Aquaculture',
          phone: '+91-761-2681972',
          email: 'aquaculture@ndvsu.ac.in',
          head: 'Dr. Rajesh Kumar',
          description: 'Specializes in fish farming, breeding techniques, and sustainable aquaculture practices.'
        },
        {
          name: 'Department of Fisheries Biology',
          phone: '+91-761-2681973',
          email: 'fishbiology@ndvsu.ac.in',
          head: 'Dr. Priya Sharma',
          description: 'Focuses on fish physiology, genetics, nutrition, and disease management.'
        },
        {
          name: 'Department of Fish Processing Technology',
          phone: '+91-761-2681974',
          email: 'fishtech@ndvsu.ac.in',
          head: 'Dr. Amit Verma',
          description: 'Covers fish processing, preservation, value addition, and quality control.'
        },
        {
          name: 'Department of Fisheries Resource Management',
          phone: '+91-761-2681975',
          email: 'resource@ndvsu.ac.in',
          head: 'Dr. Sunita Jain',
          description: 'Deals with fisheries economics, management, and sustainable resource utilization.'
        },
        {
          name: 'Department of Aquatic Environment Management',
          phone: '+91-761-2681976',
          email: 'environment@ndvsu.ac.in',
          head: 'Dr. Ravi Gupta',
          description: 'Focuses on water quality management, aquatic ecology, and environmental conservation.'
        },
        {
          name: 'Administrative Office',
          phone: '+91-761-2681971',
          email: 'admin@ndvsu.ac.in',
          head: 'Registrar',
          description: 'Handles admissions, examinations, academic records, and general administration.'
        }
      ],

      emergencyContacts: [
        {
          title: 'Medical Emergency',
          name: 'Dr. Health Officer',
          phone: '+91-761-2681980',
          description: 'For any medical emergencies on campus including first aid and health consultations.'
        },
        {
          title: 'Security Control Room',
          name: 'Security Chief',
          phone: '+91-761-2681981',
          description: '24/7 security assistance for campus safety, lost items, and emergency situations.'
        },
        {
          title: 'Hostel Warden',
          name: 'Hostel Administration',
          phone: '+91-761-2681982',
          description: 'For hostel-related emergencies, accommodation issues, and student welfare.'
        },
        {
          title: 'Transport Emergency',
          name: 'Transport In-charge',
          phone: '+91-761-2681983',
          description: 'Emergency transport services and vehicle breakdown assistance.'
        },
        {
          title: 'IT Help Desk',
          name: 'IT Support Team',
          phone: '+91-761-2681984',
          description: 'Technical support for online services, Wi-Fi issues, and digital platforms.'
        }
      ],

      socialMedia: {
        facebook: 'https://facebook.com/cofjabalpur',
        twitter: 'https://twitter.com/cofjabalpur',
        linkedin: 'https://linkedin.com/school/college-of-fishery-jabalpur',
        instagram: 'https://instagram.com/cofjabalpur',
        youtube: 'https://youtube.com/@cofjabalpur'
      }
    };

    // Create the contact document
    const contact = await Contact.create(contactData);
    console.log('✅ Contact data seeded successfully');
    console.log(`📞 Main Phone: ${contact.contactInfo.phone.main}`);
    console.log(`📧 Main Email: ${contact.contactInfo.email.main}`);
    console.log(`🏢 Institution: ${contact.contactInfo.address.institution}`);
    console.log(`📍 Location: ${contact.contactInfo.address.city}, ${contact.contactInfo.address.state}`);
    console.log(`🏫 Departments: ${contact.departments.length} departments added`);
    console.log(`🚨 Emergency Contacts: ${contact.emergencyContacts.length} emergency contacts added`);

    return contact;
  } catch (error) {
    console.error('❌ Error seeding contact data:', error);
    throw error;
  }
};

module.exports = seedContact;

// Run this script directly
if (require.main === module) {
  // Load environment variables
  require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
  
  const connectDB = require('../config/database');
  
  const runSeed = async () => {
    try {
      console.log('Environment check:');
      console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
      console.log('MONGODB_URI value:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
      
      await connectDB();
      await seedContact();
      console.log('🎉 Contact seeding completed successfully!');
      process.exit(0);
    } catch (error) {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    }
  };

  runSeed();
}