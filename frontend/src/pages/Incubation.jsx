import React from 'react'
import Section, { SectionHeader } from '../components/common/Section'

const Incubation = () => {
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Incubation Centre"
          subtitle="Activities, mentorship, and startup support offered by the centre."
          align="left"
        />
        <p className="text-gray-600">This page will display incubation centre activities and programs.</p>
      </Section>
    </div>
  )
}

export default Incubation