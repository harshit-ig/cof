import React from 'react'
import Section, { SectionHeader } from '../components/common/Section'

const Collaborations = () => {
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Collaborations"
          subtitle="MoUs, partnerships, and joint initiatives with institutions and industry."
          align="left"
        />
        <p className="text-gray-600">This page will display institutional collaborations and partnerships.</p>
      </Section>
    </div>
  )
}

export default Collaborations