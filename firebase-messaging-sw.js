// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('/__/firebase/7.14.4/firebase-app.js');
importScripts('/__/firebase/7.14.4/firebase-messaging.js');
importScripts('/__/firebase/init.js');

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


// var firebaseConfig = {
//   apiKey: "AIzaSyAp1eoQIjtSD4xIrAGHOWrVEe_1yrzPbd0",
//   authDomain: "home-webnotification.firebaseapp.com",
//   databaseURL: "https://home-webnotification.firebaseio.com",
//   projectId: "home-webnotification",
//   storageBucket: "home-webnotification.appspot.com",
//   messagingSenderId: "127953944236",
//   appId: "1:127953944236:web:7c1d7b362add1da85e2909",
//   measurementId: "G-4FT37BDDVE"
// };

