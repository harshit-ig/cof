import React, { useState } from 'react'
import { Clock, Calendar, Users, FileText, Download, Search } from 'lucide-react'
import Section from '../components/common/Section'

const StudentCorner = () => {
  const [activeTab, setActiveTab] = useState('timetable')

  const timeTable = [
    {
      semester: '1st Semester',
      schedule: [
        { day: 'Monday', time: '9:00-10:00', subject: 'Mathematics', faculty: 'Dr. A. Kumar' },
        { day: 'Monday', time: '10:00-11:00', subject: 'Physics', faculty: 'Dr. B. Singh' },
        { day: 'Monday', time: '11:30-12:30', subject: 'Chemistry', faculty: 'Dr. C. Sharma' },
        { day: 'Tuesday', time: '9:00-10:00', subject: 'Biology', faculty: 'Dr. D. Patel' },
        { day: 'Tuesday', time: '10:00-11:00', subject: 'English', faculty: 'Dr. E. Gupta' }
      ]
    },
    {
      semester: '3rd Semester',
      schedule: [
        { day: 'Monday', time: '9:00-10:00', subject: 'Aquaculture', faculty: 'Dr. P. Yadav' },
        { day: 'Monday', time: '10:00-11:00', subject: 'Fish Nutrition', faculty: 'Dr. Q. Mishra' },
        { day: 'Monday', time: '11:30-12:30', subject: 'Fish Genetics', faculty: 'Dr. R. Jha' },
        { day: 'Tuesday', time: '9:00-10:00', subject: 'Fish Pathology', faculty: 'Dr. S. Kumar' },
        { day: 'Tuesday', time: '10:00-11:00', subject: 'Biochemistry', faculty: 'Dr. T. Singh' }
      ]
    }
  ]

  const examSchedule = [
    {
      exam: 'Mid-Semester Examination',
      semester: '1st & 3rd Semester',
      startDate: '2025-09-15',
      endDate: '2025-09-25',
      status: 'Upcoming'
    },
    {
      exam: 'Final Examination',
      semester: '1st & 3rd Semester',
      startDate: '2025-12-10',
      endDate: '2025-12-20',
      status: 'Scheduled'
    }
  ]

  const students = [
    {
      rollNo: 'COF/2024/001',
      name: 'Aarav Sharma',
      semester: '1st Semester',
      batch: '2024-28',
      email: 'aarav.sharma@cofbasu.edu.in'
    },
    {
      rollNo: 'COF/2024/002',
      name: 'Priya Singh',
      semester: '1st Semester',
      batch: '2024-28',
      email: 'priya.singh@cofbasu.edu.in'
    },
    {
      rollNo: 'COF/2022/001',
      name: 'Rahul Kumar',
      semester: '5th Semester',
      batch: '2022-26',
      email: 'rahul.kumar@cofbasu.edu.in'
    },
    {
      rollNo: 'COF/2022/002',
      name: 'Anita Patel',
      semester: '5th Semester',
      batch: '2022-26',
      email: 'anita.patel@cofbasu.edu.in'
    }
  ]

  const quickLinks = [
    { name: 'RRI PG', description: 'Rules, Regulations & Instructions for PG', file: 'PG-RRI.pdf' },
    { name: 'RRI UG', description: 'Rules, Regulations & Instructions for UG', file: 'UG-RRI.pdf' },
    { name: 'Academic Leave Form', description: 'Application form for academic leave', file: 'Academic-Leave-Form.pdf' }
  ]

  const tabs = [
    { id: 'timetable', name: 'Time Table', icon: Clock },
    { id: 'examinations', name: 'Examinations', icon: Calendar },
    { id: 'students', name: 'List of Students', icon: Users },
    { id: 'quicklinks', name: 'Quick Links', icon: FileText }
  ]

  const renderTimeTable = () => (
    <div className="space-y-6">
      {timeTable.map((semester, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white px-6 py-4">
            <h3 className="text-lg font-semibold">{semester.semester}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {semester.schedule.map((item, itemIdx) => (
                  <tr key={itemIdx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.day}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.faculty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )

  const renderExaminations = () => (
    <div className="space-y-6">
      {examSchedule.map((exam, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{exam.exam}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              exam.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}>
              {exam.status}
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Semester:</span> {exam.semester}
            </div>
            <div>
              <span className="font-medium">Start Date:</span> {new Date(exam.startDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">End Date:</span> {new Date(exam.endDate).toLocaleDateString()}
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="inline-flex items-center px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Download Schedule
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderStudents = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-green-600 text-white">
        <h3 className="text-lg font-semibold">List of Students</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.rollNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.semester}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.batch}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  <a href={`mailto:${student.email}`}>{student.email}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderQuickLinks = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quickLinks.map((link, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">{link.name}</h3>
          </div>
          <p className="text-gray-600 mb-4">{link.description}</p>
          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      ))}
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return renderTimeTable()
      case 'examinations':
        return renderExaminations()
      case 'students':
        return renderStudents()
      case 'quicklinks':
        return renderQuickLinks()
      default:
        return renderTimeTable()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Section className="bg-gradient-to-r from-blue-800 to-green-700 text-white py-20">
        <div className="text-center">
          <div className="mb-4">
            <span className="inline-block bg-yellow-400 text-blue-900 text-sm font-semibold px-3 py-1 rounded-full">
              Government of Bihar
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Corner</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Access all student-related information, schedules, and resources in one place
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
      <Section className="py-16">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </Section>
    </div>
  )
}

export default StudentCorner
