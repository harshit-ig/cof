import React from 'react'
import Section, { SectionHeader } from '../components/common/Section'

const Research = () => {
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Research"
          subtitle="Explore research projects, publications, collaborations, and facilities."
          align="left"
        />
        <p className="text-gray-600">This page will display research projects, publications, and facilities.</p>
      </Section>
    </div>
  )
}

export default Research