// Utility functions for managing app badge (notification count on app icon)

/**
 * Update the app badge with notification count
 * Works on PWA when installed on mobile/desktop
 */
export const updateAppBadge = async (count: number): Promise<void> => {
  try {
    // Try using the Badging API directly
    if ('setAppBadge' in navigator) {
      if (count > 0) {
        await (navigator as any).setAppBadge(count)
      } else {
        await (navigator as any).clearAppBadge()
      }
    }
    
    // Also send message to service worker for broader compatibility
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'UPDATE_BADGE',
        count: count
      })
    }
  } catch (error) {
    console.log('Badge API not supported on this device:', error)
  }
}

/**
 * Clear the app badge
 */
export const clearAppBadge = async (): Promise<void> => {
  try {
    if ('clearAppBadge' in navigator) {
      await (navigator as any).clearAppBadge()
    }
    
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'UPDATE_BADGE',
        count: 0
      })
    }
  } catch (error) {
    console.log('Badge API not supported on this device:', error)
  }
}

/**
 * Check if Badge API is supported
 */
export const isBadgeSupported = (): boolean => {
  return 'setAppBadge' in navigator || 'setClientBadge' in navigator
}
