// public/service-worker.js
self.addEventListener('install', (event) => {
    // console.log('Service worker installing...');
    // You can perform additional setup here
  });

  self.addEventListener('activate', (event) => {
    // console.log('Service worker activating...');
    // Additional activation steps
  });

  self.addEventListener('fetch', (event) => {
    // console.log('Fetching:', event.request.url);
    // Handle fetch events
  });
