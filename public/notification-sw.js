self.addEventListener('push', function (event) {
  if (self.Notification?.permission !== 'granted') return
  try {
    const data = event.data?.json() || {}
    if (!data.title) return
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.message || '',
        tag: data.tag,
        icon: 'pwa-192x192.png'
      })
    )
  } catch (error) {
    console.debug('Error while send notification', error)
  }
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
