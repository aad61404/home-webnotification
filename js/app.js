/* ========================
  Variables
======================== */

const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const requestForm = document.querySelector('.new-request form');

// req
const requestSaveToken = document.querySelector('.saveToken');
const requestSendNotification = document.querySelector('.sendNotification');

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  'BEQ5FxmXcLYw8iETzDqB26Rhdlihtj_u-0qxc8aPAGEpaPf64Oak4ntmUfgTHy_NUmYmsecxdYKCNKovuXe8EqQ'
);

const serverKey =
'AAAAHcqmPqw:APA91bEDMi6ES7vWRdOP-FDJbCokiBeNMg37DOCsP4r-zdLUKss3c5Bw4RLm8O5dHuc7HRlxLyF30fuFUwSrUjf014cWByqJU66amGkBzmCMKfn_cGM5F1Bvw2D_t1RQE3wQN4U_nFym';

/* ========================
  Event Listeners
======================== */

// 開啟 Request modal
requestLink.addEventListener('click', () => {
  requestModal.classList.add('open');
});

// 關閉 request modal
requestModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('new-request')) {
    requestModal.classList.remove('open');
  }
});

// 送出 Request 給 firebase functions
requestForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const addRequest = firebase.functions().httpsCallable('addRequest');
  addRequest({
    text: requestForm.request.value,
  })
    .then(() => {
      requestForm.reset();
      requestForm.querySelector('.error').textContent = '';
      requestModal.classList.remove('open');
    })
    .catch((error) => {
      requestForm.querySelector('.error').textContent = error.message;
    });
});

// saveToken 會先詢問 註冊推播
requestSaveToken.addEventListener('click', (e) => {
  console.log('clicked');
  requestPermission();
});

// 送出通知 addEventListener
requestSendNotification.addEventListener('click', (e) => {
  console.log('clicked');
  sendNotification();
});

/* ========================
    Functions
======================== */

function requestPermission() {
  console.log('Requesting permission...');

  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      saveToken();
      // resetUI();
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

function saveToken() {
  messaging
    .getToken()
    .then((currentToken) => {
      if (currentToken) {
        console.log('currentToken:', currentToken);
        // console.log('firebase:', firebase.firestore())
        const UserAuth = firebase.auth().currentUser;

        firebase
          .firestore()
          .collection('googleUid').doc(UserAuth.uid)
          .set(
            {
              name: UserAuth.providerData[0].uid,
              timestamp: new Date(),
              uid: UserAuth.uid,
              fcmToken: currentToken,
            },
            { merge: true }
          )
          .then(function () {
            console.log('fcmTokens created');
          });
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        requestNotificationsPermissions();
        console.log(
          'No Instance ID token available. Request permission to generate one.'
        );
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // showToken('Error retrieving Instance ID token. ', err);
      // setTokenSentToServer(false);
    });
  // [END get_token]
}

// sendNotification functions
function sendNotification() {
  const notification = {
    title: 'Portugal vs. Denmark',
    body: '5 to 1',
    icon: 'firebase-logo.png',
    click_action: 'http://localhost:8081',
  };

  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      Authorization: 'key=' + serverKey,
      'Content-Type': 'application/json',
    },
    body: notification,
  }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.error(error);
    });
}

messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // var options = payload.notification;
  // console.log('options:', options);
  // var title = options.title;
  // console.log('title:', title);
  new Notification(payload.title, payload.data);
  // appendMessage(payload.data);
});

/*
var token = 'cbVhROfrxxDdwFuwienvww:APA91bEIZcLpm7coh6JTG1WriYFdqz5GgTRPblQoaRGxPfCAufwh_BFtVYkAUuizmGg67zZjV_2nd8xT2_xDVyUekwO-zlByllYHa1zkiMDpmTqJkLkep3PD1RdrWfUAxHx8lzL7W0Fr'
var serverKey =
  'AAAAHcqmPqw:APA91bEDMi6ES7vWRdOP-FDJbCokiBeNMg37DOCsP4r-zdLUKss3c5Bw4RLm8O5dHuc7HRlxLyF30fuFUwSrUjf014cWByqJU66amGkBzmCMKfn_cGM5F1Bvw2D_t1RQE3wQN4U_nFym';

const notification = {
  title: 'Portugal vs. Denmark',
  body: '5 to 1',
  icon: 'firebase-logo.png',
  click_action: 'http://localhost:8081',
};

function sendNotification(token) {
  console.log('token:', token);
  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      Authorization: 'key=' + serverKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notification: notification,
      to: token,
    }),
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}
*/

// Listing all tokens as an array.
// tokens = Object.keys(tokensSnapshot.val());
// Send notifications to all tokens.
// return  admin.messaging().sendToDevice('cMF9B2t3-BfXc1N5Et4VZH:APA91bHJ8HGX1DFQ_YdZk2eZ-OdxqDjXhz5pj-0G4sqiORhMbCYfKmZW0rZPdafek1UuBdaUGtBG2tr4YWgB-m9hH0bkBRh1WHNJjyhWbf2NHxTAPxhdcL_1vnkwBwO6KiwOTmx9Wiwx', payload);
// const response = await admin.messaging().sendToDevice(tokens, payload);

// say hello function call
// const button = document.querySelector('.call');
// button.addEventListener('click', () => {
//     // get function reference
//     const sayHello = firebase.functions().httpsCallable('sayHello');
//     const sayName = document.querySelector('.sayName').value;
//     sayHello({name: sayName}).then(result => {
//         console.log(result.data);
//     })
// })
