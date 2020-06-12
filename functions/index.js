const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.randomNumber = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 1000)
    response.send(number.toString());
})

// 
exports.toTheDojo = functions.https.onRequest((request, response) => {
    response.redirect('https://www.thenetninja.co.uk');
})

exports.sayHello = functions.https.onCall((data, context) => {
    const name = data.name;
    return `hello ${name}`;
})

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate(user => {
    // for background triggers you must return a value/promise
    return admin.firestore().collection('users').doc(user.uid).set({
      email: user.email,
      upvotedOn: [],
    });
  });
  
  // auth trigger (user deleted)
  exports.userDeleted = functions.auth.user().onDelete(user => {
    const doc = admin.firestore().collection('users').doc(user.uid);
    return doc.delete();
  });
  
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


// exports.sendFollowerNotification = functions.firestore().R

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