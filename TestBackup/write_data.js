/* ========================
      Initialize Firebase
    ======================== */

const db = firebase.firestore();
const serverKey =
  'AAAAHcqmPqw:APA91bEDMi6ES7vWRdOP-FDJbCokiBeNMg37DOCsP4r-zdLUKss3c5Bw4RLm8O5dHuc7HRlxLyF30fuFUwSrUjf014cWByqJU66amGkBzmCMKfn_cGM5F1Bvw2D_t1RQE3wQN4U_nFym';

const notification = {
  title: 'Portugal vs. Denmark',
  body: '5 to 1',
  icon: 'firebase-logo.png',
  click_action: 'http://localhost:8081',
};

/* ========================
      Variables
    ======================== */

// 按鈕
const writeDataButton = document.getElementById('write');
const getNameButton = document.getElementById('getNameToken');
const sendNotiButton = document.getElementById('sendNotification');

// 輸入格子
const writeTitleInput = document.getElementById('push_title');
const writeBodyInput = document.getElementById('push_body');
const writeIconInput = document.getElementById('push_icon');
const getNameInput = document.getElementById('getName');

// let titleValue;
// let bodyValue;
// let iconValue;

/* ========================
      Event Listeners
    ======================== */

writeDataButton.addEventListener('click', function () {
  writeProfile(
    writeTitleInput.value,
    writeBodyInput.value,
    writeIconInput.value
  );
});

getNameButton.addEventListener('click', function () {
  getNameToken(getNameInput.value);
});

sendNotiButton.addEventListener('click', function () {
  console.log('sendNotification');
  sendNoti();
});

/* ========================
      Functions
    ======================== */

function writeProfile(title, body, icon) {
  console.log('Writre profile');
  console.log('writeTitleInput:', title);
  console.log('writeBodyInput:', body);
  console.log('writeIconInput:', icon);
  // var createUser = db.collection('Users').doc('Profile');
  // firebase
  //   .messaging()
  //   .getToken()
  //   .then((currentToken) => {
  //     if (currentToken) {
  //       console.log('currentToken', currentToken);
  //       createUser
  //         .set({
  //           token: currentToken,
  //           notification: {
  //             title: title,
  //             body: body,
  //             icon: icon,
  //           },
  //         })
  //         .then(function () {
  //           console.log('Document successfully written!');
  //         })
  //         .catch(function (error) {
  //           console.error('Error writing document: ', error);
  //         });
  //       return;
  //     }
  //   });
}

function getNameToken(typeName) {
  var db = firebase.firestore();
  db.collection('Users')
    .where('name', '==', typeName)
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.empty == true) {
        console.error('No such document');
        return ;
      }
      querySnapshot.forEach(function (doc) {
        var docData = doc.data();
        if (docData.token) {
          console.log(doc.id, ' => ', doc.data());
        }
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });
}

function sendNoti() {
  var db = firebase.firestore();
  var ref = db.collection('Users');
  // 搜尋名字 拿 token
  // 拿到token 後存入colletion - doc 裡
  // 使用token 送出通知
  ref
    .where('name', '==', 'Jayson')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var docData = doc.data();
        if (docData.token) {
          // saveData(docData.token);
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

function saveData(token) {
  var db = firebase.firestore();
  var ref = db.collection('Users').doc('Jayson');

  ref
    .set(
      {
        name: 'Jayson',
        Date: new Date(),
        token: token,
      },
      { merge: true }
    )
    .then(() => {
      console.log('set data successful');
    });
}

// function getNameToken() {
//     var db = firebase.firestore();
//     var ref = db.collection('');
//     // 搜尋名字 拿 token
//     // 拿到token 後存入colletion - doc 裡
//     // 使用token 送出通知
//     ref
//       .where('name', '==', 'Jayson')
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           var docData = doc.data();
//           if (docData.token) {
//             saveData(docData.token);
//             sendNotification(docData.token);
//             //   console.log('token', docData.token);
//           }
//         });
//       });

//     //
//     firebase
//     .messaging()
//     .getToken()
//     .then((currentToken) => {
//       if (currentToken) {
//         console.log('getToken', currentToken);
//         return;
//       }
//     });
// }

// function sendNoti() {
//     var db = firebase.firestore();
//     var ref = db.collection('Users');
//     // 搜尋名字 拿 token
//     // 拿到token 後存入colletion - doc 裡
//     // 使用token 送出通知
//     ref
//       .where('name', '==', 'Jayson')
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           var docData = doc.data();
//           if (docData.token) {
//             saveData(docData.token);
//             sendNotification(docData.token);
//             //   console.log('token', docData.token);
//           }
//         });
//       });
//   }
