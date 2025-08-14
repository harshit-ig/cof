import React from 'react'
import Section, { SectionHeader } from '../components/common/Section'

const Events = () => {
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Events"
          subtitle="Upcoming and past seminars, workshops, and campus activities."
          align="left"
        />
        <p className="text-gray-600">This page will display upcoming and past events.</p>
      </Section>
    </div>
  )
}

export default Events