import React from 'react'
import Section, { SectionHeader } from '../components/common/Section'

const Extension = () => {
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Extension & Outreach"
          subtitle="Farmer training, MVK activities, SHG programs, and success stories."
          align="left"
        />
        <p className="text-gray-600">This page will display extension activities and outreach programs.</p>
      </Section>
    </div>
  )
}

export default Extension