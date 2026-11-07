/* یادآور شمسی — Service Worker
   تنها کارش این است که اعلان‌های سیستم (نوار اعلان اندروید / Action Center ویندوز) را نمایش دهد.
   بدون این فایل هم برنامه کار می‌کند؛ فقط اعلان سیستمی اندروید نمی‌آید. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil((async () => {
    const cs = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of cs) { if (c.url === target || c.url.indexOf(self.location.origin) === 0) { try { await c.focus(); } catch(err) {} return; } }
    try { await self.clients.openWindow(target); } catch (err) {}
  })());
});
