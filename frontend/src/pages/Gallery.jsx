import React from 'react'
import Section, { SectionHeader } from '../components/common/Section'

const Gallery = () => {
  const gallery = [
    'https://www.ndvsu.org/images/PhotoGallery/VisitRussia/IMG-20231122-WA0066.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/VisitRussia/IMG-20231122-WA0068.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/VisitRussia2024/IMG-20240422.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/VisitRussia2024/IMG-20240423-WA0245.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/VisitRussia2024/IMG-20240423-WA0243.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/VisitRussia2024/IMG-20240422.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/FisheryCollege/IMG-20241006-WA0001.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/FisheryCollege/IMG-20240929-WA0003.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/FisheryCollege/IMG-20240929-WA0004.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/FisheryCollege/IMG-20240621-WA0100.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/FisheryCollege/IMG-20240621-WA0102.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/FisheryCollege/IMG-20240621-WA0101.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/FisheryCollege/IMG-20240829-WA0057.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/FisheryCollege/IMG-20240829-WA0056.jpg',
    'https://www.ndvsu.org/images/PhotoGallery/FisheryCollege/IMG-20240829-WA0055.jpg',
    'https://www.ndvsu.org/images/photo-college-jabalpur/FisheryCollege/Training-Programme.jpg',
    'https://www.ndvsu.org/images/photo-college-jabalpur/FisheryCollege/Training-Programme-18-20-Sep.-24.jpg',
    'https://www.ndvsu.org/images/photo-college-jabalpur/FisheryCollege/Training-Programme-18-20-Sep.-2024.jpg',
  ]

  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="Photo Gallery"
          subtitle="Highlights and activities from Fishery College Jabalpur."
          align="left"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {gallery.map((url, idx) => (
            <div key={idx} className="rounded-lg overflow-hidden shadow-md">
              <img
                src={`/api/proxy/image?url=${encodeURIComponent(url)}`}
                alt="Gallery"
                className="w-full h-56 object-cover"
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default Gallery

