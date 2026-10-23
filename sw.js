// -------------------------------------------------------------
// PWA SERVICE WORKER (SERVICE WORKER CACHE ENGINE)
// -------------------------------------------------------------
const CACHE_NAME = 'thaukpo-v2';

self.addEventListener('install', (event) => {
  // Service Worker အသစ်ကို ချက်ချင်း အလုပ်လုပ်စေခြင်း
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Cache အဟောင်းများကို ရှင်းထုတ်ပြီး လက်ရှိ စာမျက်နှာကို ထိန်းချုပ်ခြင်း
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Network မှ တိုက်ရိုက် ဆွဲယူခြင်း (အမြဲတမ်း Live ဖြစ်စေရန်)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
