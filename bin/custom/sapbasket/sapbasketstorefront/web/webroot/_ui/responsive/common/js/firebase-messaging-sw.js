
self.addEventListener('install', function(event) {
	console.log("HJI");
});

self.addEventListener('activate', function(event) {
  console.log("sdsd");
});

importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-messaging.js');
var config = {
	    apiKey: "AIzaSyAAtFxWXe5GANUwUN8jbKiNHJ_ISkoac_E",
	    authDomain: "sample-bef95.firebaseapp.com",
	    databaseURL: "https://sample-bef95.firebaseio.com",
	    projectId: "sample-bef95",
	    storageBucket: "sample-bef95.appspot.com",
	    messagingSenderId: "528879283065"
	  };
		  
firebase.initializeApp(config);
        			
const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
	  console.log('[firebase-messaging-sw.js] Received background message ', payload);
	  // Customize notification here
	  const notificationTitle = 'Background Message Title';
	  const notificationOptions = {
	    body: 'Background Message body.',
	    icon: '/firebase-logo.png'
	  };

	  return self.registration.showNotification(notificationTitle,
	      notificationOptions);
	});

/*
self.addEventListener('push', function(event) {
  //console.log('[Service Worker] Push Received.');
  //console.log('[Service Worker] Push had this data: "${event.data.text()}"');

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

*/