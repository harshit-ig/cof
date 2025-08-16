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

      {/* Navigation Anchors */}
      <div id="workshops"></div>
      <div id="visits"></div>
      <div id="gallery"></div>

      {/* Workshops and Training Section */}
      <Section id="workshops" background="bg-white">
        <SectionHeader
          title="Workshops and Training"
          subtitle="Professional development and skill-building workshops"
          align="center"
        />
        <p className="text-gray-600">Information about workshops and training programs will be displayed here.</p>
      </Section>

      {/* Field Visits & Exposure Trips Section */}
      <Section id="visits" background="bg-gray-50">
        <SectionHeader
          title="Field Visits & Exposure Trips"
          subtitle="Educational visits and field exposure programs"
          align="center"
        />
        <p className="text-gray-600">Details about field visits and exposure trips will be displayed here.</p>
      </Section>

      {/* Photo Gallery Section */}
      <Section id="gallery" background="bg-white">
        <SectionHeader
          title="Photo Gallery"
          subtitle="Visual memories from college events and activities"
          align="center"
        />
        <p className="text-gray-600">Photo gallery showcasing college events and activities will be displayed here.</p>
      </Section>
    </div>
  )
}

export default Events