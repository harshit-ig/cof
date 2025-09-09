import React from 'react'
import { useParams } from 'react-router-dom'
import Section, { SectionHeader } from '../components/common/Section'

const EventDetail = () => {
  const { id } = useParams()
  
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader title="Event Details" align="left" />
        <p className="text-gray-600">Event ID: {id}</p>
      </Section>
    </div>
  )
}

export default EventDetail






