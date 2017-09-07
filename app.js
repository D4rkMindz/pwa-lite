+function () {
	'use strict';
	var isOnline;
	var stat = document.getElementById('status');
	var amIOnline = function () {
		stat.textContent = navigator.onLine ? 'online' : 'offline';
	};
	window.addEventListener('online', amIOnline);
	window.addEventListener('offline', amIOnline);
	amIOnline();
}();
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./serviceworker.js').then(function () {
		console.log('Service Worker registered');
	}).catch(function (err) {
		console.error('Service Worker registration failed!', err);
	});
}