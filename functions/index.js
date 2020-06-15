const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// Sends a notifications to all users when a new message is posted.
/* ========================
  未完工 6/15
======================== */
exports.sendNotifications = functions.firestore.document('googleUid/{uid}').onCreate(
  async (snapshot, context) => {
    const WriteUid = context.params.uid;
    // const getUid = await admin.firestore().collection('googleUid').doc(WriteUid);
    const getUid = await admin.firestore().collection('googleUid').doc(WriteUid);
    // var getStoredUid = firebase.firestore().collection('googleUid').doc('0vBjSxSwrVOGXj3RXBIZkkXU9i13');

    getUid.get().then(function(doc) {
        var fcmToken = doc.data().fcmToken;
        if (doc.exists) {
            console.log('found it')
            console.log(doc.data());
            console.log('fcmToken:', fcmToken)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    if (tokens.length > 0) {
      // Send notifications to all tokens.
      const response = await admin.messaging().sendToDevice(tokens, payload);
      await cleanupTokens(response, tokens);
      console.log('Notifications have been sent and tokens cleaned up.');
    }

    // Get the list of device tokens.
    // const allTokens = await admin.firestore().collection('fcmTokens').get();
    // console.log()
    // const tokens = [];
    // allTokens.forEach((tokenDoc) => {
    //   tokens.push(tokenDoc.id);
    // });
  });


// exports.randomNumber = functions.https.onRequest((request, response) => {
//     const number = Math.round(Math.random() * 1000)
//     response.send(number.toString());
// })

// // 
// exports.toTheDojo = functions.https.onRequest((request, response) => {
//     response.redirect('https://www.thenetninja.co.uk');
// })

// exports.sayHello = functions.https.onCall((data, context) => {
//     const name = data.name;
//     return `hello ${name}`;
// })

// auth trigger (new user signup)
// exports.newUserSignUp = functions.auth.user().onCreate(user => {
//     // for background triggers you must return a value/promise
//     return admin.firestore().collection('users').doc(user.uid).set({
//       email: user.email,
//       upvotedOn: [],
//     });
//   });
  
  // auth trigger (user deleted)
  // exports.userDeleted = functions.auth.user().onDelete(user => {
  //   const doc = admin.firestore().collection('users').doc(user.uid);
  //   return doc.delete();
  // });
  
  // http callable function (adding a request)
  exports.addRequest = functions.https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated', 
        'only authenticated users can add requests'
      );
    }
    if (data.text.length > 30) {
      throw new functions.https.HttpsError(
        'invalid-argument', 
        'request must be no more than 30 characters long'
      );
    }
    return admin.firestore().collection('requests').add({
      text: data.text,
      upvotes: 0
    });
  });


// exports.sendFollowerNotification = functions.https.onRequest((request, response) => {
//   // response.send("Hello from Firebase!");
//   console.log('hello');
//  });
/* ========================
  未完工 6/15
======================== */
//  exports.sendFollowerNotification12= functions.https.onCall((data, context) => {
//   const name = data.name;
//   console.log('data:', data)
//   console.log('123213')

//   var registrationToken = 'eLppRO8XmgYXeIWwOrDYVJ:APA91bGy8bYxpp3CQ33pMnFw9_SBLZfZoAlLh2dLHrm4MtBCaT8v6VEZ3mfOrO6kN_1_hmONHm39vkfbRBajdqbtDYTdxD6XpGgilTQnetnIYwi5s_V09VwtfRZWDgNJvOiA-H8evDEt';

//   var message = {
//     data: {
//       title: 'Portugal vs. Denmark',
//       body: '5 to 1',
//       icon: 'firebase-logo.png',
//       click_action: 'http://localhost:8081',
//     },
//     token: registrationToken
//   };
  
//   // Send a message to the device corresponding to the provided
//   // registration token.
//   admin.messaging().send(message)
//     .then((response) => {
//       // Response is a message ID string.
//       console.log('Successfully sent message:', response);
//     })
//     .catch((error) => {
//       console.log('Error sending message:', error);
//     });

//   return data;
// })



// Take the text parameter passed to this HTTP endpoint and insert it into 
// Cloud Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into Cloud Firestore using the Firebase Admin SDK.
//     const writeResult = await admin.firestore().collection('messages').add({original: original});
//     // Send back a message that we've succesfully written the message
//     res.json({result: `Message with ID: ${writeResult.id} added.`});
// });