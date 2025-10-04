const mongoose = require('mongoose');
const NewsEvent = require('../models/NewsEvent');
require('dotenv').config();

// Sample news and events data
const newsEventsData = [
  {
    title: 'College of Forestry Welcomes New Batch of Students',
    content: `The College of Forestry proudly welcomed its newest cohort of students for the academic year 2025-26. The orientation program was held in the main auditorium, where students were introduced to the faculty, facilities, and the rich legacy of forestry education at our institution.

The Dean addressed the gathering, emphasizing the importance of sustainable forest management and the critical role foresters play in environmental conservation. Students participated in interactive sessions covering academic programs, research opportunities, and career pathways in forestry.

The orientation concluded with a campus tour, where students visited state-of-the-art laboratories, the botanical garden, and research facilities. We wish all our new students a successful and enriching academic journey.`,
    excerpt: 'College of Forestry conducts orientation program for new students, introducing them to academic programs and research opportunities in sustainable forest management.',
    type: 'news',
    category: 'academic',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: true,
    tags: ['admission', 'orientation', 'students', 'academic']
  },
  {
    title: 'Research Paper Published on Climate Change Impact on Forest Ecosystems',
    content: `Faculty members from the Department of Forest Ecology published a groundbreaking research paper in the International Journal of Forest Research. The study examines the impact of climate change on forest ecosystems in the Himalayan region.

The research, conducted over three years, utilized advanced remote sensing techniques and ground-based observations to assess changes in forest composition, biodiversity, and carbon sequestration capacity. Key findings indicate significant shifts in species distribution and increased vulnerability of certain endemic species.

The paper has received widespread recognition in the scientific community and contributes valuable insights for developing climate adaptation strategies for forest management. This research was funded by the Ministry of Environment and involved collaboration with international research institutions.`,
    excerpt: 'Faculty publishes important research on climate change effects on Himalayan forests, highlighting biodiversity shifts and carbon sequestration changes.',
    type: 'news',
    category: 'research',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: true,
    tags: ['research', 'climate change', 'publication', 'ecology']
  },
  {
    title: 'Workshop on Modern Silviculture Techniques',
    content: `The College of Forestry is organizing a three-day workshop on Modern Silviculture Techniques from October 15-17, 2025. The workshop will cover advanced practices in forest regeneration, sustainable harvesting, and ecosystem restoration.

Expert speakers from national and international institutions will share their knowledge on topics including:
- Natural and artificial regeneration methods
- Selection and breeding of superior tree species
- Integrated pest and disease management
- Agroforestry systems and their benefits
- Use of technology in silvicultural operations

The workshop is open to forestry professionals, researchers, and students. Participants will receive hands-on training in nursery management and field techniques. Registration is open until October 10, 2025.`,
    excerpt: 'Three-day workshop on modern silviculture techniques featuring expert speakers, hands-on training, and field demonstrations. Registration open.',
    type: 'workshop',
    category: 'academic',
    eventDate: new Date('2025-10-15'),
    venue: 'College of Forestry Auditorium',
    organizer: 'Department of Silviculture',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: true,
    tags: ['workshop', 'silviculture', 'training', 'forestry']
  },
  {
    title: 'National Seminar on Forest Conservation and Biodiversity',
    content: `The College of Forestry invites you to the National Seminar on Forest Conservation and Biodiversity scheduled for November 5, 2025. This seminar brings together leading scientists, policymakers, and practitioners to discuss critical issues in forest conservation.

Keynote speakers include renowned conservationists who will address topics such as:
- Biodiversity hotspots and their management
- Community-based forest conservation
- Wildlife corridors and habitat connectivity
- Policy frameworks for forest protection
- Role of forests in climate mitigation

The seminar will feature panel discussions, poster presentations, and networking opportunities. Research scholars and professionals are encouraged to submit abstracts for presentation. The event aims to foster collaboration and knowledge exchange among stakeholders in forest conservation.`,
    excerpt: 'National seminar bringing together experts to discuss forest conservation strategies, biodiversity management, and policy frameworks.',
    type: 'seminar',
    category: 'research',
    eventDate: new Date('2025-11-05'),
    venue: 'Main Conference Hall',
    organizer: 'College of Forestry',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: false,
    tags: ['seminar', 'conservation', 'biodiversity', 'policy']
  },
  {
    title: 'Field Visit to Wildlife Sanctuary and Protected Forest Area',
    content: `Students of the final year B.Sc. Forestry program will undertake an educational field visit to the nearby Wildlife Sanctuary and Protected Forest Area from October 20-22, 2025. This visit is part of the practical training component of the Forest Management and Wildlife Conservation courses.

The three-day visit will provide students with firsthand experience in:
- Wildlife census and monitoring techniques
- Forest inventory and assessment methods
- Identification of flora and fauna species
- Understanding forest management practices
- Interaction with forest officials and field staff

Students will be accompanied by faculty members and will stay at the forest guest house. This exposure will enhance their understanding of real-world conservation challenges and management strategies. All participants must carry their student ID cards and necessary field equipment.`,
    excerpt: 'Educational field visit for forestry students to wildlife sanctuary, featuring hands-on training in wildlife census and forest management practices.',
    type: 'visit',
    category: 'academic',
    eventDate: new Date('2025-10-20'),
    venue: 'Wildlife Sanctuary',
    organizer: 'Department of Wildlife Sciences',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: false,
    tags: ['field visit', 'wildlife', 'students', 'training']
  },
  {
    title: 'Extension Program: Farmer Training on Agroforestry Systems',
    content: `The College of Forestry successfully conducted a farmer training program on Agroforestry Systems in collaboration with local villages. Over 100 farmers participated in the two-day program held on September 28-29, 2025.

The training covered various agroforestry models suitable for the region, including:
- Agri-silviculture: Combining trees with agricultural crops
- Silvo-pasture: Integration of trees with livestock
- Multi-tier cropping systems
- Selection of appropriate tree species
- Economic benefits and sustainability

Farmers were provided with free saplings and technical literature. The program included field demonstrations at the college's demonstration farm, where successful agroforestry models have been established. Participants showed great enthusiasm and requested follow-up training sessions.

This initiative is part of the college's extension activities aimed at promoting sustainable land use practices and improving rural livelihoods through forestry interventions.`,
    excerpt: 'Successful farmer training program on agroforestry systems reaches 100 farmers, providing practical knowledge and free saplings for sustainable farming.',
    type: 'event',
    category: 'extension',
    eventDate: new Date('2025-09-28'),
    venue: 'College of Forestry Campus',
    organizer: 'Extension Wing',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: false,
    tags: ['extension', 'agroforestry', 'farmers', 'training']
  },
  {
    title: 'Placement Drive: Leading Forestry Organizations Visit Campus',
    content: `The College of Forestry Placement Cell organized a mega placement drive where leading forestry organizations and environmental consultancies visited the campus to recruit graduating students. The drive held on October 1-3, 2025, saw participation from over 15 renowned organizations.

Participating organizations included:
- Forest Survey of India
- Wildlife Institute of India
- State Forest Departments
- Environmental consultancy firms
- NGOs working in conservation
- Private forestry companies

Students appeared for written tests, group discussions, and personal interviews. The recruiters appreciated the quality of education and training provided by the college. Over 80% of eligible students received job offers with attractive packages and opportunities for career growth.

The placement cell continues to work towards securing more opportunities for students in various sectors including research, conservation, forest management, and environmental consulting.`,
    excerpt: 'Successful placement drive sees 80% students receiving offers from top forestry organizations and environmental consultancies.',
    type: 'news',
    category: 'placement',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: true,
    tags: ['placement', 'career', 'recruitment', 'students']
  },
  {
    title: 'Important Notice: Mid-Semester Examination Schedule',
    content: `The mid-semester examinations for all programs will be conducted from October 25 to November 2, 2025. Students are advised to note the following important information:

Examination Schedule:
- B.Sc. Forestry: October 25-29, 2025
- M.Sc. Forestry: October 28-31, 2025
- Ph.D. Coursework: November 1-2, 2025

Important Instructions:
1. Students must carry their ID cards and admit cards to the examination hall
2. Reporting time: 30 minutes before the examination
3. Use of unfair means will result in disciplinary action
4. Mobile phones and electronic devices are strictly prohibited
5. Students should check the detailed date sheet on the college notice board

The examination will be conducted in offline mode. Students facing any difficulties should contact the Examination Section before October 20, 2025. We wish all students the best for their examinations.`,
    excerpt: 'Mid-semester examination schedule announced for all programs. Students must check detailed timetable and follow examination guidelines.',
    type: 'announcement',
    category: 'academic',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: false,
    tags: ['examination', 'announcement', 'academic', 'schedule']
  },
  {
    title: 'Guest Lecture on Remote Sensing Applications in Forestry',
    content: `The Department of Forest Management is pleased to announce a guest lecture on "Remote Sensing and GIS Applications in Forest Resource Assessment" by Dr. Rajesh Kumar, Senior Scientist from the Indian Institute of Remote Sensing.

Date: October 18, 2025
Time: 2:00 PM - 4:00 PM
Venue: Seminar Hall

Dr. Kumar is an internationally recognized expert in geospatial technology applications for natural resource management. He has over 20 years of experience and has led several national-level projects on forest mapping and monitoring.

Topics to be covered:
- Satellite remote sensing for forest cover mapping
- LiDAR technology in forestry applications
- Change detection and monitoring
- Forest fire detection and management
- Carbon stock estimation using remote sensing

All faculty members and students are cordially invited to attend this enriching session. Certificates of participation will be provided to attendees.`,
    excerpt: 'Guest lecture by renowned scientist on remote sensing applications in forestry. All students and faculty invited to attend.',
    type: 'event',
    category: 'academic',
    eventDate: new Date('2025-10-18'),
    venue: 'Seminar Hall',
    organizer: 'Department of Forest Management',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: false,
    tags: ['guest lecture', 'remote sensing', 'GIS', 'technology']
  },
  {
    title: 'Student Research Projects Win National Level Competition',
    content: `Students from the College of Forestry have brought laurels by winning top positions in the National Student Research Competition organized by the Indian Society of Tree Scientists. The competition held in New Delhi on September 15, 2025, attracted participation from over 50 forestry colleges across the country.

Winners:
First Prize: "Innovative Approaches to Urban Forestry" by Ms. Priya Sharma (M.Sc. Forestry)
Second Prize: "Bamboo-based Livelihood Systems for Tribal Communities" by Mr. Amit Verma (B.Sc. Forestry)
Third Prize: "Biodiversity Assessment using eDNA Techniques" by Ms. Sneha Reddy (Ph.D. Scholar)

The research projects were evaluated by a panel of eminent scientists based on innovation, scientific rigor, practical applicability, and presentation quality. The winning students received cash prizes, certificates, and opportunities for publication in peer-reviewed journals.

The college congratulates all participants and their faculty mentors for this outstanding achievement. This success reflects the quality of research culture and academic excellence at our institution.`,
    excerpt: 'College students win top three positions in national research competition, showcasing innovative forestry research and academic excellence.',
    type: 'news',
    category: 'research',
    images: [],
    attachments: [],
    isPublished: true,
    isFeatured: true,
    tags: ['research', 'students', 'competition', 'achievement']
  }
];

// Seed function
const seedNewsEvents = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/college-forestry');
    console.log('📡 MongoDB connected');

    // Clear existing data
    await NewsEvent.deleteMany({});
    console.log('🗑️  Cleared existing news and events');

    // Insert sample data one by one to trigger slug generation
    const createdItems = [];
    for (const itemData of newsEventsData) {
      const item = new NewsEvent(itemData);
      await item.save();
      createdItems.push(item);
    }
    
    console.log(`✅ Successfully seeded ${createdItems.length} news and events`);

    // Display created slugs
    console.log('\n📝 Generated Slugs:');
    createdItems.forEach(item => {
      console.log(`   - ${item.title}`);
      console.log(`     Slug: ${item.slug}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding news and events:', error);
    process.exit(1);
  }
};

// Run seed function if called directly
if (require.main === module) {
  seedNewsEvents();
}

module.exports = seedNewsEvents;
