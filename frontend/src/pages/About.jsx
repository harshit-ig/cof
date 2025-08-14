import React from 'react'
import { Users, Target, Eye, Award } from 'lucide-react'
import Card, { FeatureCard } from '../components/common/Card'

const About = () => {
  const milestones = [
    { year: '1999', event: 'College established with first batch of students' },
    { year: '2005', event: 'Research facility inaugurated' },
    { year: '2010', event: 'International collaborations initiated' },
    { year: '2015', event: 'Incubation centre established' },
    { year: '2020', event: 'Digital transformation completed' },
    { year: '2024', event: 'Silver jubilee celebrations' }
  ]

  const governingBody = [
    { name: 'Dr. [Name]', position: 'Chairman', organization: 'MPKV' },
    { name: 'Dr. [Name]', position: 'Dean', organization: 'Fishery College Jabalpur' },
    { name: 'Prof. [Name]', position: 'Director Research', organization: 'MPKV' },
    { name: 'Dr. [Name]', position: 'Industry Representative', organization: 'Aqua Tech Ltd.' },
    { name: 'Mr. [Name]', position: 'Alumni Representative', organization: 'Class of 2010' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Learn about our rich history, vision for the future, and commitment to excellence 
            in fisheries education and research.
          </p>
        </div>
      </section>

      {/* History Section (sourced from NDVSU page, provided in data.txt) */}
      <section id="history" className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">History of College</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The College of Veterinary Science and Animal Husbandry, Jabalpur was started on October 2012 as per the gazette of Madhya Pradesh Government. This college is previously working as a department of Fisheries at Faculty of Veterinary Science, JNKVV, Jabalpur (Estt. 1964). The department of fisheries is look over the than five decades of its existence of Aquatic body name as Adhartal Tank which was developed by the Senapati of Gondwana State Shri Diwan Adhar Singh.
                </p>
                <p>
                  The aquatic body has been able to make an overall development of fish production and management through its impressive teaching, research and extension activities in basic and applied fields. Consequent to the establishment of Madhya Pradesh Pashu Chikitsha Vigyan Viswavidyalaya (renamed as Nanaji Deshmukh Veterinary Science University) the college became a constitution institution of the new Viswa Vidyalaya with effect from 04.10.2012.
                </p>
              </div>
            </div>
            <div>
              <img
                src={`/api/proxy/image?url=${encodeURIComponent('https://www.ndvsu.org/images/fcj-slide-01.jpg')}`}
                alt="College History"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Mandate / Objectives / Thrust Area */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mandate</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Human Resource Development in Fisheries.</li>
                <li>Basic, applied and adaptive research on emerging problems in fisheries.</li>
                <li>Transfer of technology to fish farmers, entrepreneurs and industry; develop the college as a centre for demonstrations and training (composite fish culture, integrated fish farming, Azolla culture, fish breeding, freshwater prawn culture, etc.).</li>
                <li>Impart technology to raise fish production from ~700 kg/ha to ~4000 kg/ha.</li>
              </ul>
            </Card>
            <Card className="h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Objectives</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Human Resource Development.</li>
                <li>Fish production and productivity enhancement.</li>
                <li>Development of fishery through lab-to-land programmes.</li>
              </ul>
            </Card>
            <Card className="h-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Thrust Area</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Imparting education in fisheries to generate technical graduates.</li>
                <li>Exploit fisheries potential through R&amp;D activities.</li>
                <li>Take latest technology to fish farmers through extension to uplift production and socio-economic status.</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vision & Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our guiding principles that drive everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FeatureCard
              icon={Eye}
              title="Our Vision"
              description="To be a globally recognized center of excellence in fisheries education, research, and extension, contributing to sustainable aquaculture development and food security."
              iconColor="text-primary-600"
              iconBgColor="bg-primary-100"
              className="h-full"
            />
            
            <FeatureCard
              icon={Target}
              title="Our Mission"
              description="To provide quality education, conduct innovative research, and extend knowledge to stakeholders for the advancement of fisheries science and sustainable aquaculture practices."
              iconColor="text-secondary-600"
              iconBgColor="bg-secondary-100"
              className="h-full"
            />
          </div>
        </div>
      </section>

      {/* Dean's Message Section */}
      <section id="dean-message" className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={`/api/proxy/image?url=${encodeURIComponent('https://www.ndvsu.org/images/Shashikant.jpg')}`}    
                alt="Dean's Photo"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Dean's Message</h2>
                <div className="w-20 h-1 bg-primary-500 rounded"></div>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Welcome to Fishery College Jabalpur, an institution that stands as a 
                  beacon of excellence in fisheries education and research. As the Dean, 
                  I am proud to lead an institution that has consistently contributed to 
                  the advancement of aquaculture science and technology.
                </p>
                <p>
                  Our college is committed to nurturing the next generation of fisheries 
                  professionals who will address the challenges of food security, 
                  sustainable development, and environmental conservation. We believe in 
                  providing our students with not just theoretical knowledge, but also 
                  practical skills and research experience.
                </p>
                <p>
                  With our state-of-the-art facilities, experienced faculty, and strong 
                  industry connections, we ensure that our graduates are well-prepared 
                  to make meaningful contributions to society. I invite you to be part 
                  of our journey towards excellence.
                </p>
              </div>
              
              <div className="border-l-4 border-primary-500 pl-4">
                <p className="font-semibold text-gray-900">Dr. [Dean's Name]</p>
                <p className="text-gray-600">Dean, Fishery College Jabalpur</p>
                <p className="text-gray-600">Ph.D. in Aquaculture Science</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure Section */}
      <section id="structure" className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Organizational Structure</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our well-defined organizational structure ensures efficient governance and administration
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="inline-block bg-primary-100 rounded-lg p-4 mb-2">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Dean</h3>
                <p className="text-gray-600">Chief Academic Officer</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-block bg-secondary-100 rounded-lg p-3 mb-2">
                    <Users className="h-6 w-6 text-secondary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Academic Affairs</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>Curriculum Development</li>
                    <li>Student Assessment</li>
                    <li>Faculty Development</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="inline-block bg-accent-100 rounded-lg p-3 mb-2">
                    <Award className="h-6 w-6 text-accent-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Research & Extension</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>Research Projects</li>
                    <li>Publications</li>
                    <li>Outreach Programs</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="inline-block bg-green-100 rounded-lg p-3 mb-2">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Administration</h4>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>Finance & Accounts</li>
                    <li>Human Resources</li>
                    <li>Infrastructure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governing Body Section */}
      <section id="governing-body" className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Governing Body</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Distinguished members who guide our institution towards excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governingBody.map((member, index) => (
              <Card key={index} className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4">
                  <img
                    src="https://via.placeholder.com/80x80"
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-1">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.organization}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About