/* ========================
      Initialize Firebase
    ======================== */

// console.log('firebase.firestore:', firebase.firestore)
const db = firebase.firestore();
/* ========================
      Variables
    ======================== */
// Initialize Cloud Firestore through Firebas

const writeDataButton = document.getElementById('write');
const sendNotiButton = document.getElementById('sendNotification');

const writeTitleInput = document.getElementById('push_title');
const writeBodyInput = document.getElementById('push_body');
const writeIconInput = document.getElementById('push_icon');

// let titleValue;
// let bodyValue;
// let iconValue;

/* ========================
      Event Listeners
    ======================== */

function writeData(title, body, icon) {
  var createUser = db.collection('Users').doc('Profile');

  firebase
    .messaging()
    .getToken()
    .then((currentToken) => {
      if (currentToken) {
        console.log('currentToken', currentToken);
        createUser
          .set({
            token: currentToken,
            notification: {
              title: writeTitleInput.value,
              body: writeBodyInput.value,
              icon: writeIconInput.value,
            },
          })
          .then(function () {
            console.log('Document successfully written!');
          })
          .catch(function (error) {
            console.error('Error writing document: ', error);
          });
        return;
      }
    });
}

var key =
  'AAAAHcqmPqw:APA91bEDMi6ES7vWRdOP-FDJbCokiBeNMg37DOCsP4r-zdLUKss3c5Bw4RLm8O5dHuc7HRlxLyF30fuFUwSrUjf014cWByqJU66amGkBzmCMKfn_cGM5F1Bvw2D_t1RQE3wQN4U_nFym';
// var to =
//   'fM2hOhrO0wXqL4rATpd6ET:APA91bEYqZ7wt73MeruWAlzFRnwC_SjLTKyzbNA4F74ypzLMgK7BnqvYvv5b58nRlu5wzBRMkbCmRAbgKClhiUNTOCDS3sRF9Jo2HpUxnRscWdpyubCkjrO-D0lTYMEtyBiqM4H-e4Z1';
var notification = {
  title: 'Portugal vs. Denmark',
  body: '5 to 1',
  icon: 'firebase-logo.png',
  click_action: 'http://localhost:8081',
};

function sendNoti() {
  var db = firebase.firestore();
  var ref = db.collection('Users');

  ref
    .where('name', '==', 'Jayson')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var docData = doc.data();
        if (docData.token) {
          sendNotification(docData.token);
          //   console.log('token', docData.token);
        }
      });
    });
}

function sendNotification(token) {
    console.log('token:', token);
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
        Authorization: 'key=' + key,
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
