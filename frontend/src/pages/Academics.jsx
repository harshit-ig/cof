import React, { useState } from 'react'
import { BookOpen, Calendar, FileText, Users, Award, Clock } from 'lucide-react'
import Section from '../components/common/Section'

const Academics = () => {
  const [activeTab, setActiveTab] = useState('regulations')

  const academicCalendar = [
    {
      event: 'Admission Process Begins',
      date: '2025-06-01',
      description: 'Online application process starts for new academic year'
    },
    {
      event: 'Classes Begin',
      date: '2025-07-15',
      description: 'First semester classes commence'
    },
    {
      event: 'Mid-Semester Examination',
      date: '2025-09-15',
      description: 'Mid-semester examinations for all semesters'
    },
    {
      event: 'Semester Break',
      date: '2025-10-20',
      description: 'Two-week semester break'
    },
    {
      event: 'Final Examinations',
      date: '2025-12-10',
      description: 'Final examinations for odd semesters'
    },
    {
      event: 'Winter Break',
      date: '2025-12-25',
      description: 'Winter vacation period'
    }
  ]

  const regulations = [
    {
      title: 'Attendance Requirements',
      description: 'Students must maintain minimum 75% attendance in each subject to be eligible for examinations.',
      details: [
        'Regular attendance is mandatory for all theory and practical classes',
        'Medical certificates required for extended absence',
        'Condonation of shortage available in exceptional cases'
      ]
    },
    {
      title: 'Examination Rules',
      description: 'Guidelines for conduct of examinations and assessment procedures.',
      details: [
        'Mid-semester examination carries 30% weightage',
        'Final examination carries 70% weightage',
        'Minimum 40% marks required in each subject to pass',
        'Re-examination facility available for failed students'
      ]
    },
    {
      title: 'Grading System',
      description: 'Credit-based grading system as per university norms.',
      details: [
        'Letter grades from A+ to F based on percentage',
        'CGPA calculation on 10-point scale',
        'Grade sheets issued after each semester',
        'Transcript available on completion of degree'
      ]
    },
    {
      title: 'Code of Conduct',
      description: 'Expected behavior and discipline guidelines for students.',
      details: [
        'Respectful behavior towards faculty and peers',
        'No ragging or harassment tolerated',
        'Proper dress code to be maintained',
        'Mobile phones to be kept silent during classes'
      ]
    }
  ]

  const admissionProcess = [
    {
      step: '1',
      title: 'Eligibility Check',
      description: 'Ensure you meet the minimum eligibility criteria for the program'
    },
    {
      step: '2',
      title: 'Online Application',
      description: 'Fill and submit the online application form with required documents'
    },
    {
      step: '3',
      title: 'Merit List',
      description: 'Check merit list published on the official website'
    },
    {
      step: '4',
      title: 'Counseling',
      description: 'Attend counseling session as per scheduled dates'
    },
    {
      step: '5',
      title: 'Document Verification',
      description: 'Get your documents verified at the college'
    },
    {
      step: '6',
      title: 'Fee Payment',
      description: 'Pay the admission fees to confirm your seat'
    }
  ]

  const admissionCapacity = [
    {
      program: 'Bachelor of Fisheries Science (B.F.Sc.)',
      duration: '4 Years',
      seats: 30,
      reservation: {
        general: 15,
        obc: 8,
        sc: 4,
        st: 2,
        ews: 1
      }
    }
  ]

  const feesStructure = [
    {
      category: 'Tuition Fee',
      amount: '₹15,000',
      frequency: 'Per Year',
      description: 'Academic instruction charges'
    },
    {
      category: 'Lab Fee',
      amount: '₹5,000',
      frequency: 'Per Year',
      description: 'Laboratory and practical charges'
    },
    {
      category: 'Library Fee',
      amount: '₹2,000',
      frequency: 'Per Year',
      description: 'Library facility charges'
    },
    {
      category: 'Development Fee',
      amount: '₹3,000',
      frequency: 'Per Year',
      description: 'Infrastructure development charges'
    },
    {
      category: 'Hostel Fee',
      amount: '₹25,000',
      frequency: 'Per Year',
      description: 'Accommodation charges (Optional)'
    },
    {
      category: 'Mess Fee',
      amount: '₹30,000',
      frequency: 'Per Year',
      description: 'Food charges (Optional)'
    }
  ]

  const tabs = [
    { id: 'regulations', name: 'Academic Regulations', icon: BookOpen },
    { id: 'calendar', name: 'Academic Calendar', icon: Calendar },
    { id: 'admission', name: 'Admission Process', icon: Users },
    { id: 'capacity', name: 'Admission Capacity', icon: Award },
    { id: 'fees', name: 'Fee Structure', icon: FileText }
  ]

  const renderRegulations = () => (
    <div className="space-y-6">
      {regulations.map((regulation, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{regulation.title}</h3>
          <p className="text-gray-600 mb-4">{regulation.description}</p>
          <ul className="space-y-2">
            {regulation.details.map((detail, detailIdx) => (
              <div className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-gray-700">{detail}</span>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )

  const renderCalendar = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-blue-600 text-white">
        <h3 className="text-lg font-semibold">Academic Calendar 2025-26</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {academicCalendar.map((event, idx) => (
          <div key={idx} className="p-6 flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="bg-green-100 rounded-lg p-3">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-900">{event.event}</h4>
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAdmissionProcess = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Admission Process Steps</h3>
        <div className="space-y-4">
          {admissionProcess.map((step, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  {step.step}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900">{step.title}</h4>
                <p className="text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility Criteria */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Eligibility Criteria</h3>
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">For B.F.Sc. Program:</h4>
          <ul className="space-y-1 text-green-800">
            <li>• Passed 10+2 or equivalent with Physics, Chemistry, Biology/Mathematics</li>
            <li>• Minimum 50% marks in aggregate (45% for SC/ST candidates)</li>
            <li>• Valid ICAR AIEEA rank or state entrance exam score</li>
          </ul>
        </div>
      </div>
    </div>
  )

  const renderCapacity = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-blue-600 text-white">
        <h3 className="text-lg font-semibold">Admission Capacity</h3>
      </div>
      <div className="p-6">
        {admissionCapacity.map((program, idx) => (
          <div key={idx} className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{program.program}</h4>
                <p className="text-gray-600">Duration: {program.duration}</p>
              </div>
              <div className="text-2xl font-bold text-green-600">
                Total Seats: {program.seats}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-gray-900">{program.reservation.general}</div>
                <div className="text-sm text-gray-600">General</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-gray-900">{program.reservation.obc}</div>
                <div className="text-sm text-gray-600">OBC</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-gray-900">{program.reservation.sc}</div>
                <div className="text-sm text-gray-600">SC</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-gray-900">{program.reservation.st}</div>
                <div className="text-sm text-gray-600">ST</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-gray-900">{program.reservation.ews}</div>
                <div className="text-sm text-gray-600">EWS</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderFees = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-blue-600 text-white">
        <h3 className="text-lg font-semibold">Fee Structure</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feesStructure.map((fee, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fee.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{fee.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.frequency}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{fee.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-gray-50">
        <p className="text-sm text-gray-600">
          * Fee structure is subject to change as per university guidelines
        </p>
        <p className="text-sm text-gray-600 mt-1">
          * Scholarships are available for eligible students as per government norms
        </p>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'regulations':
        return renderRegulations()
      case 'calendar':
        return renderCalendar()
      case 'admission':
        return renderAdmissionProcess()
      case 'capacity':
        return renderCapacity()
      case 'fees':
        return renderFees()
      default:
        return renderRegulations()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Section className="bg-gradient-to-r from-blue-800 to-green-700 text-white py-20">
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-block bg-yellow-400 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
              Government of Madhya Pradesh
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Academics</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive academic information including regulations, calendar, and admission details
          </p>
        </div>
      </Section>

      {/* Navigation Tabs */}
      <Section className="py-8 bg-white shadow-sm">
        <div className="flex flex-wrap justify-center gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            )
          })}
        </div>
      </Section>

      {/* Content */}
      <Section id="regulations" className="py-16">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </Section>

      {/* Additional Sections for Navigation */}
      <div id="calendar"></div>
      <div id="curriculum"></div>
    </div>
  )
}

export default Academics
