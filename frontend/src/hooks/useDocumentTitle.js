import { useEffect } from 'react'
import { useSettings } from '../context/SettingsContext'

export const useDocumentTitle = (pageTitle = '') => {
  const { siteName } = useSettings()
  
  useEffect(() => {
    const title = pageTitle ? `${pageTitle} - ${siteName}` : siteName
    document.title = title
  }, [pageTitle, siteName])
}

export default useDocumentTitle
