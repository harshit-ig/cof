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

      {/* Navigation Anchors */}
      <div id="hatcheries"></div>
      <div id="library"></div>
      <div id="hostels"></div>
      <div id="processing"></div>

      {/* Hatcheries and Demo Units Section */}
      <Section id="hatcheries" background="bg-white">
        <SectionHeader
          title="Hatcheries and Demo Units"
          subtitle="Fish breeding and demonstration facilities"
          align="center"
        />
        <p className="text-gray-600">Information about hatcheries and demonstration units will be displayed here.</p>
      </Section>

      {/* Library and e-Resources Section */}
      <Section id="library" background="bg-gray-50">
        <SectionHeader
          title="Library and e-Resources"
          subtitle="Comprehensive library facilities and digital resources"
          align="center"
        />
        <p className="text-gray-600">Details about library facilities and electronic resources will be displayed here.</p>
      </Section>

      {/* Hostels and Campus Facilities Section */}
      <Section id="hostels" background="bg-white">
        <SectionHeader
          title="Hostels and Campus Facilities"
          subtitle="Student accommodation and campus amenities"
          align="center"
        />
        <p className="text-gray-600">Information about hostel facilities and campus amenities will be displayed here.</p>
      </Section>

      {/* Fish Processing & Feed Units Section */}
      <Section id="processing" background="bg-gray-50">
        <SectionHeader
          title="Fish Processing & Feed Units"
          subtitle="Processing facilities and feed production units"
          align="center"
        />
        <p className="text-gray-600">Details about fish processing and feed production facilities will be displayed here.</p>
      </Section>
    </div>
  )
}

export default Infrastructure