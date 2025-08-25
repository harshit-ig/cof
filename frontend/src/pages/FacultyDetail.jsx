import React from 'react'
import { useParams } from 'react-router-dom'
import Section, { SectionHeader } from '../components/common/Section'

const FacultyDetail = () => {
  const { id } = useParams()
  
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader title="Faculty Profile" align="left" />
        <p className="text-gray-600">Faculty ID: {id}</p>
        <p className="text-gray-600 mt-4">This page will show detailed profile of the selected faculty member.</p>
      </Section>
    </div>
  )
}

export default FacultyDetail

