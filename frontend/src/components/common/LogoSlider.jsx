import React, { useEffect, useMemo, useRef, useState } from 'react'
import { partnersAPI, uploadAPI } from '../../services/api'

// A true circular marquee: recycles DOM nodes as they exit the left edge, no CSS-duration resets
const LogoSlider = () => {
  const [logos, setLogos] = useState([])
  const [loading, setLoading] = useState(true)

  // Render list that may duplicate base logos to ensure the track is wide enough
  const [renderLogos, setRenderLogos] = useState([])

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const rafIdRef = useRef(null)
  const lastTsRef = useRef(0)
  const offsetRef = useRef(0) // current translateX in px (negative when moving left)
  const pausedRef = useRef(false)
  const readyRef = useRef(false)

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true)
        const response = await partnersAPI.getAll()
        if (response?.data?.success) {
          const partnersData = (response.data.data.partners || []).map((partner) => ({
            id: partner._id || partner.id || partner.name, // best-effort stable id
            name: partner.name,
            src: uploadAPI.getImageUrl(partner.logo, 'partners'),
            alt: partner.altText || partner.name || 'Partner logo',
            link: partner.link || undefined,
            category: partner.category,
            description: partner.description || ''
          }))
          setLogos(partnersData)
        } else {
          setLogos([])
        }
      } catch (error) {
        console.error('Error fetching partners:', error)
        setLogos([])
      } finally {
        setLoading(false)
      }
    }
    fetchPartners()
  }, [])

  // Build an initial render list after data loads (simple repeat), then adjust based on measurements
  useEffect(() => {
    if (!logos.length) {
      setRenderLogos([])
      return
    }
    // Start with 3 repetitions to likely exceed viewport width
    const initial = Array.from({ length: Math.max(3, Math.ceil(12 / Math.max(1, logos.length))) })
      .flatMap(() => logos)
    setRenderLogos(initial)
  }, [logos])

  // Once mounted with items, ensure the track is at least 2x container width; if not, duplicate until it is
  useEffect(() => {
    if (!renderLogos.length) return
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    // Avoid starting animation if user prefers reduced motion
    if (prefersReducedMotion) {
      readyRef.current = false
      cancelAnimationFrame(rafIdRef.current)
      return
    }

    // Defer to next frame for accurate layout
    const measureAndMaybeDuplicate = () => {
      const containerWidth = container.clientWidth
      const trackWidth = track.scrollWidth
      if (trackWidth >= containerWidth * 2) {
        // Wide enough; start animation if not already running
        if (!readyRef.current) {
          readyRef.current = true
          startAnimation()
        }
        return
      }
      // Not wide enough; duplicate the logos until it is
      setRenderLogos((prev) => {
        const next = [...prev, ...prev]
        return next.length > 1000 ? prev : next // hard safety cap
      })
    }

    const id = requestAnimationFrame(measureAndMaybeDuplicate)
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderLogos, prefersReducedMotion])

  // Animation loop: move left continuously; recycle first child to the end when it fully exits
  const SPEED_PX_PER_SEC = 60 // tune as needed

  const tick = (ts) => {
    if (!trackRef.current || !readyRef.current || pausedRef.current) {
      lastTsRef.current = ts
      rafIdRef.current = requestAnimationFrame(tick)
      return
    }
    const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0
    lastTsRef.current = ts

    // Advance offset
    offsetRef.current -= SPEED_PX_PER_SEC * dt
    const track = trackRef.current
    track.style.transform = `translateX(${offsetRef.current}px)`

    // While the first child is fully outside to the left, recycle it to the end and adjust offset
    let guard = 0
    while (guard < 50) {
      const first = track.firstElementChild
      if (!first) break
      const firstRect = first.getBoundingClientRect()
      const trackRect = track.getBoundingClientRect()
      // Compute width including margins
      const style = window.getComputedStyle(first)
      const ml = parseFloat(style.marginLeft) || 0
      const mr = parseFloat(style.marginRight) || 0
      const firstFullWidth = firstRect.width + ml + mr

      // When the translated offset has moved past the first item width, recycle
      if (-offsetRef.current >= firstFullWidth) {
        offsetRef.current += firstFullWidth
        track.style.transform = `translateX(${offsetRef.current}px)`
        track.appendChild(first)
        guard++
        continue
      }
      break
    }

    rafIdRef.current = requestAnimationFrame(tick)
  }

  const startAnimation = () => {
    cancelAnimationFrame(rafIdRef.current)
    lastTsRef.current = 0
    rafIdRef.current = requestAnimationFrame(tick)
  }

  // Pause/Resume helpers
  const pause = () => { pausedRef.current = true }
  const resume = () => { pausedRef.current = false }

  // Cleanup RAF on unmount
  useEffect(() => () => cancelAnimationFrame(rafIdRef.current), [])

  // Don't render anything while loading or if no partners
  if (loading || logos.length === 0) return null

  const SectionHeader = () => (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Partners & Collaborators</h2>
      <p className="text-gray-600">Proud to work with leading organizations in Fishery Science and aquaculture.</p>
    </div>
  )

  const Item = ({ logo }) => {
    const Wrapper = logo.link ? 'a' : 'div'
    const wrapperProps = logo.link
      ? { href: logo.link, target: '_blank', rel: 'noopener noreferrer' }
      : {}
    return (
      <div className="carousel-item flex-shrink-0 mx-6 lg:mx-8">
        <Wrapper
          {...wrapperProps}
          title={logo.description || logo.alt}
          className="h-16 lg:h-20 w-24 lg:w-32 flex items-center justify-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-sm hover:shadow-md"
          aria-label={logo.name || logo.alt}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
            onError={(e) => {
              // Fallback to text placeholder if image fails
              e.currentTarget.style.display = 'none'
              const placeholder = e.currentTarget.nextElementSibling
              if (placeholder) placeholder.classList.remove('hidden')
            }}
          />
          <div className="hidden items-center justify-center h-full w-full text-xs text-gray-400 font-medium">
            {logo.name}
          </div>
        </Wrapper>
      </div>
    )
  }

  return (
    <section className="py-12 bg-white border-t border-b border-gray-200" aria-label="Partners and collaborators carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        {/* Logo Slider Container */}
        <div
          className="relative overflow-hidden"
          ref={containerRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          onTouchCancel={resume}
        >
          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Track */}
          <div
            ref={trackRef}
            className={[
              'flex items-center will-change-transform',
              prefersReducedMotion ? 'transition-none' : ''
            ].join(' ')}
            style={{ transform: 'translateX(0)' }}
          >
            {renderLogos.map((logo, idx) => (
              <Item key={`${logo.id ?? logo.name}-${idx}`} logo={logo} />
            ))}
          </div>

          {prefersReducedMotion && (
            <div className="sr-only">Animation disabled due to reduced motion preference.</div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LogoSlider
