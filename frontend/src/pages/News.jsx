import React from 'react'
import { useEffect, useState } from 'react'
import Section, { SectionHeader } from '../components/common/Section'
import { newsAPI, uploadAPI } from '../services/api'
import LoadingSpinner, { LoadingCard } from '../components/common/LoadingSpinner'

const News = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await newsAPI.getAll({ limit: 12 })
        if (res.data?.success) {
          setItems(res.data.data.newsEvents || [])
        } else {
          setItems([])
        }
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen">
      <Section background="bg-gray-50">
        <SectionHeader
          title="News"
          subtitle="Latest announcements, achievements, and updates from the college."
          align="left"
        />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((n) => {
              const img = n.images?.[0]?.url
              const src = img ? uploadAPI.getImageUrl(img, 'news') : null
              return (
                <div key={n._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {src && (
                    <img src={src} alt={n.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{n.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ''}
                    </p>
                    {n.excerpt && (
                      <p className="text-gray-700 text-sm line-clamp-3">{n.excerpt}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-gray-600">No news available right now.</p>
        )}
      </Section>
    </div>
  )
}

export default News