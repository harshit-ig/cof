// Utilities to build file URLs based on environment configuration
// We mirror axios base host but strip trailing /api so that static uploads point to the server root

const getBaseHost = () => {
  const raw = import.meta.env.VITE_SERVER_HOST || ''
  // If provided and ends with /api, remove it for static assets
  if (raw && raw.endsWith('/api')) return raw.slice(0, -4)
  return raw
}

export const getUploadsBase = () => {
  const host = getBaseHost()
  // When host is empty, use relative path which works with same-origin/proxy setups
  return host ? `${host}/uploads` : `/uploads`
}

export const getDocumentUrl = (filename) => {
  if (!filename) return ''
  return `${getUploadsBase()}/documents/${filename}`
}

export const getImageUrl = (subdir, filename) => {
  if (!filename) return ''
  return `${getUploadsBase()}/${subdir}/${filename}`
}

export default {
  getUploadsBase,
  getDocumentUrl,
  getImageUrl,
}
