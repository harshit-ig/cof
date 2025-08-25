import React from 'react'
import { useParams } from 'react-router-dom'
import Section, { SectionHeader } from '../components/common/Section'

const ProgramDetail = () => {
  const { id } = useParams()
  
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader title="Program Details" align="left" />
        <p className="text-gray-600">Program ID: {id}</p>
        <p className="text-gray-600 mt-4">This page will show detailed information about the selected program.</p>
      </Section>
    </div>
  )
}

export default ProgramDetail

