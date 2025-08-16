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

      {/* Navigation Anchors */}
      <div id="ffpo-shg"></div>
      <div id="mvk"></div>
      <div id="demonstrations"></div>
      <div id="success-stories"></div>

      {/* FFPO and SHG Support Section */}
      <Section id="ffpo-shg" background="bg-white">
        <SectionHeader
          title="FFPO and SHG Support"
          subtitle="Supporting Fish Farmer Producer Organizations and Self Help Groups"
          align="center"
        />
        <p className="text-gray-600">Details about FFPO and SHG support programs will be displayed here.</p>
      </Section>

      {/* Matsya Vigyan Kendra Section */}
      <Section id="mvk" background="bg-gray-50">
        <SectionHeader
          title="Matsya Vigyan Kendra (MVK)"
          subtitle="Technology demonstration and transfer activities"
          align="center"
        />
        <p className="text-gray-600">Information about MVK activities and programs will be displayed here.</p>
      </Section>

      {/* Aquaculture Demonstrations Section */}
      <Section id="demonstrations" background="bg-white">
        <SectionHeader
          title="Aquaculture Demonstrations"
          subtitle="Practical demonstrations for farmers and students"
          align="center"
        />
        <p className="text-gray-600">Details about aquaculture demonstration programs will be displayed here.</p>
      </Section>

      {/* Success Stories Section */}
      <Section id="success-stories" background="bg-gray-50">
        <SectionHeader
          title="Success Stories"
          subtitle="Inspiring stories from our extension programs"
          align="center"
        />
        <p className="text-gray-600">Success stories and case studies will be displayed here.</p>
      </Section>
    </div>
  )
}

export default Extension