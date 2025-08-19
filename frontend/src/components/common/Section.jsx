import React from 'react'

export const Section = ({ id, children, background = 'bg-white', className = '' }) => {
  return (
    <section id={id} className={`${background} section-padding`}>
      <div className="container-max">
        <div className={className}>
          {children}
        </div>
      </div>
    </section>
  )
}

export const SectionHeader = ({ title, subtitle, align = 'center', className = '' }) => {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center'
  return (
    <div className={`flex flex-col ${alignment} mb-12 ${className}`}>
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
      )}
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl">
          {subtitle}
        </p>
      )}
      <div className={`w-20 h-1 bg-primary-500 rounded mt-4 ${align === 'left' ? '' : 'mx-auto'}`} />
    </div>
  )
}

export default Section
