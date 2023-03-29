/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// Any other custom service worker logic can go here.
self.addEventListener('fetch', (event: any) => {
  console.log('[Service Worker] Fetch', event.request.clone().url);
  if (event.request.clone().method === 'GET') {
    try {
      event.respondWith(
        // check all the caches in the browser and find
        // out whether our request is in any of them
        caches.match(event.request.clone()).then((response) => {
          if (response)
            // if we are here, that means there's a match
            // return the response stored in browser
            return response;

          // no match in cache, use the network instead
          return fetch(event.request.clone());
        })
      );
    } catch (error) {
      console.log('[Service Worker] Error fetching', error);
    }
  } else if (event.request.clone().method === 'POST') {
    try {
      // attempt to send request normally
      event.respondWith(fetch(event.request.clone()));
    } catch (error) {
      // only save post requests in browser, if an error occurs
      // savePostRequests(event.request.clone().url, form_data);
      console.log('[Service Worker] Error posting', error);
    }
  }
});
