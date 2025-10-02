import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Camera, FileText, ChevronRight, Clock, ExternalLink } from 'lucide-react'
import Card from '../components/common/Card'

const NewsEvents = () => {
  // Seminars & Conferences Data
  const seminarsConferences = [
    {
      title: "National Conference on Sustainable Aquaculture",
      date: "December 15-17, 2024",
      venue: "College of Fishery, Jabalpur",
      description: "Three-day national conference focusing on sustainable aquaculture practices, climate-resilient farming, and emerging technologies in fisheries sector.",
      speakers: ["Dr. A.K. Singh (ICAR-CIFA)", "Dr. Priya Sharma (CIFT)", "Prof. R.K. Mishra (NDVSU)"],
      registrations: "250+ participants",
      status: "Upcoming"
    },
    {
      title: "International Symposium on Fish Nutrition",
      date: "September 20-22, 2024",
      venue: "Virtual + Hybrid Mode",
      description: "Global symposium on advanced fish nutrition, feed formulation technologies, and nutritional requirements for various aquaculture species.",
      speakers: ["Dr. John Miller (FAO)", "Dr. Sarah Chen (WorldFish)", "Dr. K.L. Verma (ICAR)"],
      registrations: "400+ participants",
      status: "Completed"
    },
    {
      title: "Regional Workshop on Fish Disease Management",
      date: "August 10-12, 2024",
      venue: "COF Auditorium",
      description: "Regional workshop focusing on fish health management, disease diagnosis, prevention strategies, and biosecurity measures.",
      speakers: ["Dr. M.P. Srivastava (NBFGR)", "Dr. Anjana Devi (CAU)", "Dr. R.S. Chauhan (MPUAT)"],
      registrations: "180+ participants",
      status: "Completed"
    },
    {
      title: "Seminar on Blue Economy and Fisheries",
      date: "March 15, 2025",
      venue: "College of Fishery, Jabalpur",
      description: "One-day seminar exploring opportunities in blue economy, marine fisheries development, and sustainable coastal aquaculture.",
      speakers: ["Dr. V.K. Tiwari (CMFRI)", "Dr. Neetu Srivastava (ICAR)", "Shri A.B. Patel (DoF, MP)"],
      registrations: "Registration Open",
      status: "Upcoming"
    }
  ]

  // Workshops and Training Data
  const workshopsTraining = [
    {
      program: "Biofloc Technology Training Program",
      duration: "5 Days",
      schedule: "Every Month",
      description: "Comprehensive hands-on training on biofloc technology implementation, management, and troubleshooting for sustainable aquaculture.",
      modules: ["Biofloc Principles", "System Setup", "Water Quality Management", "Feed Management", "Economics & Marketing"],
      targetAudience: "Fish Farmers, Students, Extension Workers",
      certification: "NDVSU Certificate",
      fees: "₹2,500 per participant"
    },
    {
      program: "RAS (Recirculatory Aquaculture System) Workshop",
      duration: "3 Days",
      schedule: "Quarterly",
      description: "Intensive workshop on design, installation, and operation of recirculatory aquaculture systems for intensive fish farming.",
      modules: ["RAS Components", "System Design", "Filtration Systems", "Monitoring & Control", "Business Planning"],
      targetAudience: "Entrepreneurs, Researchers, Progressive Farmers",
      certification: "NDVSU Certificate",
      fees: "₹3,000 per participant"
    },
    {
      program: "Fish Processing & Value Addition Training",
      duration: "7 Days",
      schedule: "Bi-annually",
      description: "Complete training program covering fish processing techniques, quality control, packaging, and marketing of fish products.",
      modules: ["Processing Techniques", "Quality Control", "HACCP Implementation", "Packaging & Storage", "Market Linkages"],
      targetAudience: "SHG Members, Entrepreneurs, Students",
      certification: "NDVSU Certificate",
      fees: "₹1,500 per participant"
    },
    {
      program: "Digital Fish Farming & IoT Applications",
      duration: "2 Days",
      schedule: "Bi-monthly",
      description: "Modern workshop on digital technologies, IoT applications, and smart farming techniques in aquaculture sector.",
      modules: ["IoT Sensors", "Mobile Apps", "Data Analytics", "Automation Systems", "Digital Marketing"],
      targetAudience: "Tech-savvy Farmers, Students, Researchers",
      certification: "NDVSU Certificate",
      fees: "₹2,000 per participant"
    }
  ]

  // Field Visits & Exposure Trips Data
  const fieldVisitsTrips = [
    {
      destination: "ICAR-Central Institute of Fisheries Education (CIFE), Mumbai",
      duration: "4 Days",
      participants: "Final Year Students",
      description: "Educational visit to premier fisheries research institute to explore advanced research facilities, marine aquaculture systems, and laboratory techniques.",
      highlights: ["Marine Fish Hatchery", "Research Laboratories", "Library & Documentation", "Faculty Interaction", "Industrial Visits"],
      frequency: "Annual",
      lastVisit: "February 2024"
    },
    {
      destination: "Central Institute of Freshwater Aquaculture (CIFA), Bhubaneswar",
      duration: "3 Days",
      participants: "M.F.Sc Students",
      description: "Exposure trip to leading freshwater aquaculture research center focusing on carp breeding, nutrition research, and fish health management.",
      highlights: ["Carp Breeding Units", "Feed Mill", "Fish Health Lab", "Demonstration Ponds", "Research Projects"],
      frequency: "Annual",
      lastVisit: "January 2024"
    },
    {
      destination: "Successful Fish Farms in Andhra Pradesh",
      duration: "5 Days",
      participants: "Extension Students & Faculty",
      description: "Field exposure to progressive fish farming operations, commercial aquaculture systems, and integrated farming models.",
      highlights: ["Commercial Fish Farms", "Processing Units", "Marketing Systems", "Farmer Interactions", "Technology Adoption"],
      frequency: "Bi-annual",
      lastVisit: "March 2024"
    },
    {
      destination: "National Bureau of Fish Genetic Resources (NBFGR), Lucknow",
      duration: "2 Days",
      participants: "Research Scholars",
      description: "Scientific visit to explore fish genetic diversity, conservation programs, molecular biology techniques, and germplasm preservation.",
      highlights: ["Gene Bank", "Molecular Lab", "Live Gene Bank", "Research Facilities", "Conservation Programs"],
      frequency: "Annual",
      lastVisit: "November 2023"
    }
  ]

  // Photo Gallery Data
  const photoGallery = [
    {
      category: "Campus & Infrastructure",
      description: "Modern facilities, laboratories, and campus infrastructure",
      imageCount: "45+ Photos",
      coverImage: "/WhatsApp Image 2025-08-19 at 09.04.50_9e82a1f1.jpg",
      albums: ["Academic Buildings", "Laboratory Facilities", "Hostels & Amenities", "Research Units", "Demo Plots"]
    },
    {
      category: "Academic Activities",
      description: "Classroom sessions, practical training, and student activities",
      imageCount: "60+ Photos",
      coverImage: "/WhatsApp Image 2025-08-19 at 09.04.51_bd417a2e.jpg",
      albums: ["Practical Sessions", "Field Training", "Laboratory Work", "Project Presentations", "Examinations"]
    },
    {
      category: "Events & Celebrations",
      description: "Annual functions, cultural events, and special occasions",
      imageCount: "80+ Photos",
      coverImage: "/WhatsApp Image 2025-08-19 at 09.04.52_8b313bd6.jpg",
      albums: ["Annual Day", "Cultural Programs", "Sports Events", "Seminars & Workshops", "Award Ceremonies"]
    },
    {
      category: "Research & Extension",
      description: "Research activities, field demonstrations, and farmer training",
      imageCount: "35+ Photos",
      coverImage: "/WhatsApp Image 2025-08-19 at 09.04.53_8ff77827.jpg",
      albums: ["Research Projects", "Field Demonstrations", "Farmer Training", "Technology Transfer", "Extension Activities"]
    }
  ]

  // Press Releases Data
  const pressReleases = [
    {
      title: "College of Fishery Launches New Biofloc Training Center",
      date: "August 15, 2024",
      category: "Infrastructure Development",
      summary: "State-of-the-art biofloc training facility inaugurated to promote sustainable aquaculture practices among farmers in Madhya Pradesh.",
      highlights: ["₹50 Lakh Investment", "Monthly Training Capacity: 100 Farmers", "Modern Biofloc Systems", "Hands-on Training Facility"],
      media: "Times of India, Dainik Bhaskar, MP Patrika",
      downloadLink: "#"
    },
    {
      title: "Record Placement Success: 95% Students Secure Jobs",
      date: "July 20, 2024",
      category: "Academic Achievement",
      summary: "College achieves remarkable placement record with 95% students getting placed in reputed organizations across fisheries and allied sectors.",
      highlights: ["95% Placement Rate", "Average Package: ₹4.2 LPA", "Top Recruiters: ICAR, DoF, Private Companies", "100% B.F.Sc Placement"],
      media: "Hindustan Times, Nav Bharat Times, Zee News MP",
      downloadLink: "#"
    },
    {
      title: "Research Breakthrough in Fish Feed Development",
      date: "June 10, 2024",
      category: "Research & Innovation",
      summary: "Faculty and students develop cost-effective fish feed formulation using local ingredients, reducing farming costs by 30%.",
      highlights: ["30% Cost Reduction", "Local Ingredient Based", "Patent Application Filed", "Farmer Trial Success"],
      media: "The Hindu, Indian Express, Agriculture Today",
      downloadLink: "#"
    },
    {
      title: "MoU Signed with International Fish Research Institute",
      date: "May 5, 2024",
      category: "Collaboration",
      summary: "Strategic partnership established with WorldFish Center for collaborative research and student exchange programs.",
      highlights: ["International Collaboration", "Student Exchange Program", "Joint Research Projects", "Technology Transfer"],
      media: "Business Standard, Economic Times, Fisheries Today",
      downloadLink: "#"
    },
    {
      title: "College Receives Excellence Award for Extension Activities",
      date: "April 12, 2024",
      category: "Recognition",
      summary: "Honored with State Excellence Award for outstanding contribution to fisheries extension and farmer welfare programs.",
      highlights: ["State Excellence Award", "10,000+ Farmers Trained", "Technology Adoption Success", "Rural Development Impact"],
      media: "MP Chronicle, Patrika, Sahara Samay",
      downloadLink: "#"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">News & Events</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with latest happenings, academic events, research activities, 
              and achievements at College of Fishery, Jabalpur.
            </p>
          </div>
        </div>
      </section>



      {/* Seminars & Conferences */}
      <section id="seminars-conferences" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seminars & Conferences</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              National and international seminars, conferences, and symposiums organized and attended 
              by our faculty and students to promote knowledge sharing and research collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seminarsConferences.map((event, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.venue}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {event.registrations}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{event.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Speakers</h4>
                  <ul className="space-y-1">
                    {event.speakers.map((speaker, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {speaker}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops and Training */}
      <section id="workshops-training" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Workshops and Training</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Regular training programs and workshops designed to enhance technical skills, 
              promote technology adoption, and support capacity building in fisheries sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshopsTraining.map((workshop, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-secondary-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{workshop.program}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Duration:</span>
                    <p className="text-gray-600">{workshop.duration}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Schedule:</span>
                    <p className="text-gray-600">{workshop.schedule}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Fees:</span>
                    <p className="text-gray-600">{workshop.fees}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Certificate:</span>
                    <p className="text-gray-600">{workshop.certification}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{workshop.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Training Modules</h4>
                  <div className="flex flex-wrap gap-2">
                    {workshop.modules.map((module, idx) => (
                      <span key={idx} className="px-2 py-1 bg-secondary-100 text-secondary-800 text-xs rounded">
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Target Audience</h4>
                  <p className="text-sm text-gray-700">{workshop.targetAudience}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Field Visits & Exposure Trips */}
      <section id="field-visits" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Field Visits & Exposure Trips</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Educational and exposure visits to premier research institutes, successful farms, 
              and industrial facilities to provide practical learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fieldVisitsTrips.map((trip, index) => (
              <Card key={index} className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{trip.destination}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Duration:</span>
                    <p className="text-gray-600">{trip.duration}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Participants:</span>
                    <p className="text-gray-600">{trip.participants}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Frequency:</span>
                    <p className="text-gray-600">{trip.frequency}</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Last Visit:</span>
                    <p className="text-gray-600">{trip.lastVisit}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{trip.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Visit Highlights</h4>
                  <ul className="space-y-2">
                    {trip.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <ChevronRight className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="photo-gallery" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visual collection of campus life, academic activities, events, research work, 
              and infrastructure showcasing the vibrant college environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {photoGallery.map((gallery, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={gallery.coverImage} 
                    alt={gallery.category}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{gallery.category}</h3>
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{gallery.description}</p>
                  <p className="text-sm text-gray-600 mb-4">{gallery.imageCount}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Albums</h4>
                    <div className="flex flex-wrap gap-2">
                      {gallery.albums.map((album, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {album}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
                    View Gallery
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Complete Photo Gallery Grid */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Photo Collection</h3>
              <p className="text-gray-600">Browse through our comprehensive collection of campus and event photos</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Campus & Infrastructure Photos */}
              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/cllg.jpg" 
                  alt="College Building"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">College Building</p>
                  <p className="text-xs text-gray-600">Main Campus</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-19 at 09.04.50_9e82a1f1.jpg" 
                  alt="Campus Infrastructure"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Campus Infrastructure</p>
                  <p className="text-xs text-gray-600">Modern Facilities</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-19 at 09.04.51_bd417a2e.jpg" 
                  alt="Laboratory Facilities"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Laboratory Facilities</p>
                  <p className="text-xs text-gray-600">Research Labs</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-19 at 09.04.52_8b313bd6.jpg" 
                  alt="Academic Activities"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Academic Activities</p>
                  <p className="text-xs text-gray-600">Classroom Sessions</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-19 at 09.04.52_e4f075d7.jpg" 
                  alt="Student Activities"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Student Activities</p>
                  <p className="text-xs text-gray-600">Campus Life</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-19 at 09.04.53_8ff77827.jpg" 
                  alt="Research Activities"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Research Activities</p>
                  <p className="text-xs text-gray-600">Field Work</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-19 at 09.04.54_38d4a9cd.jpg" 
                  alt="Extension Programs"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Extension Programs</p>
                  <p className="text-xs text-gray-600">Farmer Training</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-21 at 22.43.39_1241e1b8.jpg" 
                  alt="Campus Events"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Campus Events</p>
                  <p className="text-xs text-gray-600">Special Occasions</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-21 at 22.43.39_b0838fbd.jpg" 
                  alt="Cultural Programs"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Cultural Programs</p>
                  <p className="text-xs text-gray-600">Annual Functions</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-21 at 22.43.39_d6ab2436.jpg" 
                  alt="Practical Training"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Practical Training</p>
                  <p className="text-xs text-gray-600">Hands-on Learning</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-21 at 22.43.41_288fca02.jpg" 
                  alt="Workshop Sessions"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Workshop Sessions</p>
                  <p className="text-xs text-gray-600">Skill Development</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-21 at 22.43.42_4e674a8f.jpg" 
                  alt="Seminar Hall"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Seminar Hall</p>
                  <p className="text-xs text-gray-600">Conference Venue</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/WhatsApp Image 2025-08-21 at 22.43.42_b0410280.jpg" 
                  alt="Library & Resources"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Library & Resources</p>
                  <p className="text-xs text-gray-600">Learning Center</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/slider.jpg" 
                  alt="Campus Overview"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Campus Overview</p>
                  <p className="text-xs text-gray-600">Aerial View</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/slider-2.jpg" 
                  alt="Sports Facilities"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Sports Facilities</p>
                  <p className="text-xs text-gray-600">Recreation Center</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/slider-3.jpg" 
                  alt="Hostel Facilities"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Hostel Facilities</p>
                  <p className="text-xs text-gray-600">Student Accommodation</p>
                </div>
              </div>

              <div className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src="/slider-4.jpg" 
                  alt="Garden & Landscape"
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800">Garden & Landscape</p>
                  <p className="text-xs text-gray-600">Green Campus</p>
                </div>
              </div>
            </div>

            {/* View More Button */}
            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors inline-flex items-center space-x-2">
                <span>Load More Photos</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section id="press-releases" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Press Releases</h2>
            <div className="w-20 h-1 bg-blue-400 rounded mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Official announcements, achievements, and newsworthy developments from 
              College of Fishery covered in various media outlets.
            </p>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{release.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {release.date}
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {release.category}
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{release.summary}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Highlights</h4>
                        <ul className="space-y-1">
                          {release.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-center">
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Media Coverage</h4>
                        <p className="text-sm text-gray-700">{release.media}</p>
                        
                        <div className="mt-3">
                          <a 
                            href={release.downloadLink}
                            className="inline-flex items-center text-sm text-blue-500 hover:text-primary-700 font-medium"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Download Press Release
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
              View All Press Releases
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-blue-500 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected with Latest Updates</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and follow us on social media to get the latest news, 
            event updates, and announcements from College of Fishery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-accent"
            >
              Subscribe to Newsletter
            </Link>
            
            <Link
              to="/about"
              className="btn-outline border-white text-white hover:bg-white hover:text-blue-500"
            >
              Follow Us on Social Media
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewsEvents







