import React from 'react'
import { useParams } from 'react-router-dom'
import Section, { SectionHeader } from '../components/common/Section'

const InfrastructureDetail = () => {
  const { id } = useParams()
  
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader title="Infrastructure Details" align="left" />
        <p className="text-gray-600">Infrastructure ID: {id}</p>
      </Section>
    </div>
  )
}

export default InfrastructureDetail






