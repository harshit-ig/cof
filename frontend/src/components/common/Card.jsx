import React from 'react'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  shadow = 'shadow-md',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-lg overflow-hidden transition-all duration-300'
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : ''
  const combinedClasses = `${baseClasses} ${shadow} ${hoverClasses} ${className}`

  return (
    <div className={combinedClasses} {...props}>
      <div className={padding}>
        {children}
      </div>
    </div>
  )
}

// Image Card Component
export const ImageCard = ({ 
  image, 
  title, 
  description, 
  link, 
  className = '',
  imageClassName = '',
  ...props 
}) => {
  const CardComponent = link ? 'a' : 'div'
  
  return (
    <Card className={className} padding="p-0" {...props}>
      <CardComponent href={link} className="block">
        {image && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={image.src || image}
              alt={image.alt || title}
              className={`w-full h-48 object-cover transition-transform duration-300 hover:scale-105 ${imageClassName}`}
            />
          </div>
        )}
        
        <div className="p-6">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-gray-600 text-sm line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </CardComponent>
    </Card>
  )
}

// Stats Card Component
export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'positive',
  className = '',
  ...props 
}) => {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 'text-red-600'
  
  return (
    <Card className={className} {...props}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {Icon && (
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-500" />
            </div>
          )}
        </div>
        
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <p className={`ml-2 text-sm font-medium ${changeColor}`}>
                {change}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

// Feature Card Component
export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  className = '',
  iconColor = 'text-blue-500',
  iconBgColor = 'bg-blue-100',
  ...props 
}) => {
  return (
    <Card className={`text-center ${className}`} {...props}>
      {Icon && (
        <div className="flex justify-center mb-4">
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>
      )}
      
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      )}
    </Card>
  )
}

// News/Event Card Component
export const NewsCard = ({ 
  title, 
  excerpt, 
  date, 
  category, 
  image, 
  link,
  type = 'news',
  className = '',
  ...props 
}) => {
  const typeColors = {
    news: 'bg-blue-100 text-blue-800',
    event: 'bg-green-100 text-green-800',
    announcement: 'bg-yellow-100 text-yellow-800',
    seminar: 'bg-purple-100 text-purple-800',
    workshop: 'bg-indigo-100 text-indigo-800'
  }

  return (
    <Card className={className} padding="p-0" {...props}>
      <a href={link} className="block">
        {image && (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={image.src || image}
              alt={image.alt || title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            {type && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[type] || typeColors.news}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            )}
            
            {date && (
              <time className="text-sm text-gray-500">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            )}
          </div>
          
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-500 transition-colors">
              {title}
            </h3>
          )}
          
          {excerpt && (
            <p className="text-gray-600 text-sm line-clamp-3">
              {excerpt}
            </p>
          )}
          
          {category && (
            <div className="mt-3">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                {category}
              </span>
            </div>
          )}
        </div>
      </a>
    </Card>
  )
}

export default Card

