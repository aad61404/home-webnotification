// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.4/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAp1eoQIjtSD4xIrAGHOWrVEe_1yrzPbd0",
    authDomain: "home-webnotification.firebaseapp.com",
    databaseURL: "https://home-webnotification.firebaseio.com",
    projectId: "home-webnotification",
    storageBucket: "home-webnotification.appspot.com",
    messagingSenderId: "127953944236",
    appId: "1:127953944236:web:7c1d7b362add1da85e2909",
    measurementId: "G-4FT37BDDVE"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
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