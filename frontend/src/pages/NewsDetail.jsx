import React from 'react'
import { useParams } from 'react-router-dom'
import Section, { SectionHeader } from '../components/common/Section'

const NewsDetail = () => {
  const { id } = useParams()
  
  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader title="News Details" align="left" />
        <p className="text-gray-600">News ID: {id}</p>
      </Section>
    </div>
  )
}

export default NewsDetail

