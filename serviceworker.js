'use strict';
const cacheName = 'app-v1a';
const pathRoot = '/experiment/';

// Add files to cache here
const filesToCache = [
	'',
	'index.php',
	'app.js',
	'style.css'
];
// use self to add it to the service worker and not to the window
self.addEventListener('install', ev => {
	ev.waitUntil(caches.open(cacheName).then(cache => {
		console.info('Caching Application');
		cache.addAll(filesToCache, map(filesToCache, (el) => {
			return pathRoot + el;
		}));
	}).catch(err => {
		console.log(err);
	}));
});
self.addEventListener('activate', ev => {
	// similar to window.onload(), just for the service worker
	ev.waitUntil(caches.keys().then(keyList => {
		keyList.forEach(key => {
			if (key !== cacheName) {
				caches.delete(key);
			}
		});
	}));
	return self.clients.claim();
});
self.addEventListener('fetch', event => {
	event.respondWith(caches.open(cacheName).then(function (cache) {
		return cache.match(event.request).then(function (response) {
			var fetchPromise = fetch(event.request).then(function (networkResponse) {
				cache.put(event.request, networkResponse.clone());
				return networkResponse;
			});
			return response || fetchPromise;
		});
	}).catch(err => console.log(err)));
});

function map(arr, fn) {
	let results = [];
	for (let i = 0; i < arr.length; i++) results.push(fn(arr[i], i));
	console.log(results);
	return results;
}