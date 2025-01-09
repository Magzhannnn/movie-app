self.addEventListener('fetch', (event) => {
    event.respondWith(
      (async () => {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }
  
        return fetch(event.request);
      })()
    );
  });
  