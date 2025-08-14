import React from 'react'
import Section, { SectionHeader } from '../components/common/Section'

const Infrastructure = () => {
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Infrastructure"
          subtitle="Explore labs, hatcheries, processing units, library, and more."
          align="left"
        />
        <p className="text-gray-600">This page will display college infrastructure and facilities.</p>
      </Section>
    </div>
  )
}

export default Infrastructure