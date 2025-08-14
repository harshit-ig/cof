import React from 'react'
import Section, { SectionHeader } from '../components/common/Section'

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Contact Us"
          subtitle="Reach out for admissions, collaborations, or general inquiries."
          align="left"
        />
        <p className="text-gray-600">This page will display contact information and contact form.</p>
      </Section>
    </div>
  )
}

export default Contact