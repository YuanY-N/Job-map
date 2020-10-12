import defaultSettings from '@/settings'

const title = defaultSettings.title || 'job for everyone'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
