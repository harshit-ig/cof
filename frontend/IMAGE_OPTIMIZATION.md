# Image Optimization Standards

## Overview
This document outlines the image optimization standards for the College of Fisheries website to ensure consistent sizing, performance, and user experience across all devices.

## Image Size Guidelines

### 1. Hero Images (Slideshow)
- **Dimensions**: 1920x1080px (16:9 ratio)
- **File Size**: Max 500KB
- **Format**: WebP with JPEG fallback
- **Usage**: Main slideshow, hero sections
- **CSS Class**: `img-hero`

### 2. Card Images
- **Dimensions**: 800x600px (4:3 ratio)
- **File Size**: Max 200KB
- **Format**: WebP with JPEG fallback
- **Usage**: About page cards, infrastructure sections
- **CSS Class**: `img-card`

### 3. Thumbnail Images
- **Dimensions**: 400x300px (4:3 ratio)
- **File Size**: Max 100KB
- **Format**: WebP with JPEG fallback
- **Usage**: Gallery thumbnails, news images
- **CSS Class**: `img-thumbnail`

### 4. Portrait Images
- **Dimensions**: 400x500px (2:3 ratio)
- **File Size**: Max 150KB
- **Format**: WebP with JPEG fallback
- **Usage**: Faculty photos, profile images
- **CSS Class**: `img-portrait`

## Responsive Breakpoints

### Mobile (≤768px)
- Hero: 500px height
- Card: 240px height
- Thumbnail: 160px height
- Portrait: 400px height

### Tablet (768px - 1024px)
- Hero: 600px height
- Card: 280px height
- Thumbnail: 200px height
- Portrait: 480px height

### Desktop (≥1024px)
- Hero: 700px height
- Card: 320px height
- Thumbnail: 240px height
- Portrait: 560px height

## Implementation

### HTML Attributes
```jsx
<img 
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  className="img-card"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
/>
```

### CSS Classes
- `.img-hero` - For hero/slideshow images
- `.img-card` - For card-based layouts
- `.img-thumbnail` - For small preview images
- `.img-portrait` - For portrait-oriented images

## Performance Best Practices

1. **Lazy Loading**: Use `loading="lazy"` for images below the fold
2. **Responsive Images**: Use `sizes` attribute for optimal loading
3. **WebP Format**: Provide WebP with JPEG fallback for better compression
4. **File Size**: Keep images under recommended sizes for fast loading
5. **Alt Text**: Always provide descriptive alt text for accessibility

## Current Image Inventory

### Public Images
- `COF NEW.png` - 1.7MB (NEEDS OPTIMIZATION)
- `WhatsApp Image 2025-08-19 at 09.04.50_9e82a1f1.jpg` - 212KB
- `WhatsApp Image 2025-08-19 at 09.04.51_bd417a2e.jpg` - 452KB
- `WhatsApp Image 2025-08-19 at 09.04.52_8b313bd6.jpg` - 311KB
- `WhatsApp Image 2025-08-19 at 09.04.52_e4f075d7.jpg` - 315KB
- `WhatsApp Image 2025-08-19 at 09.04.53_8ff77827.jpg` - 184KB
- `WhatsApp Image 2025-08-19 at 09.04.54_38d4a9cd.jpg` - 107KB

### Optimization Priority
1. **High Priority**: `COF NEW.png` (reduce from 1.7MB to <500KB)
2. **Medium Priority**: Images over 300KB
3. **Low Priority**: Images under 200KB

## Tools for Optimization

### Online Tools
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)
- ImageOptim (Mac)

### Command Line
```bash
# Using ImageMagick
convert input.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 output.jpg

# Using cwebp for WebP conversion
cwebp -q 80 input.jpg -o output.webp
```

## Future Improvements

1. **WebP Conversion**: Convert all images to WebP format
2. **CDN Integration**: Use a CDN for image delivery
3. **Progressive Loading**: Implement progressive JPEG loading
4. **Image Compression**: Set up automated image compression pipeline
5. **Responsive Images**: Generate multiple sizes for different devices 