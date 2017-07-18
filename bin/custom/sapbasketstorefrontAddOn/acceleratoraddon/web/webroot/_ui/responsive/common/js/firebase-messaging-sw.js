
self.addEventListener('install', function(event) {
	console.log("installed");
});

self.addEventListener('activate', function(event) {
  console.log("activated");
});

importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-messaging.js');


var config = {
	    apiKey: "AIzaSyAQB2YQ2g4gWIwFHZIBEV1gy7s3xGNISUo",
	    authDomain: "push-906.firebaseapp.com",
	    databaseURL: "https://push-906.firebaseio.com",
	    projectId: "push-906",
	    storageBucket: "push-906.appspot.com",
	    messagingSenderId: "987079568654"
	  };
		  
firebase.initializeApp(config);
        			
const messaging = firebase.messaging();


messaging.setBackgroundMessageHandler(function(payload) {
	  console.log('[firebase-messaging-sw.js] Received background message ', payload);
	  // Customize notification here
	  const notificationTitle = 'SAP Basket';
	  const notificationOptions = {
	    body: 'from sw.js',
	    icon: "https://localhost:9002/sapbasketstorefront/_ui/addons/sapbasketstorefrontAddOn/responsive/common/images/download.png",
	  };

	  return self.registration.showNotification(notificationTitle,notificationOptions);
	});

self.addEventListener('notificationclick', function(event) {
	  event.notification.close();
	  event.waitUntil(self.clients.openWindow("https://localhost:9002"));
	});

/*You can also do the same with the notificationclose event:

	self.addEventListener('notificationclose', function(event) {
	  ... Do your stuff here.
	});*/

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