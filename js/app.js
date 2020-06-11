const messaging = firebase.messaging();

// const requestModal = document.querySelector('.new-request');
// const requestLink = document.querySelector('.add-request');
// const requestForm = document.querySelector('.new-request form');

messaging.usePublicVapidKey("BEQ5FxmXcLYw8iETzDqB26Rhdlihtj_u-0qxc8aPAGEpaPf64Oak4ntmUfgTHy_NUmYmsecxdYKCNKovuXe8EqQ");

// saveToken req
const requestSaveToken = document.querySelector('.saveToken');
// sendMessage req
const requestSendNotification = document.querySelector('.sendNotification');


// open request modal
// requestLink.addEventListener('click', () => {
//   requestModal.classList.add('open');
// });

// // close request modal
// requestModal.addEventListener('click', (e) => {
//   if (e.target.classList.contains('new-request')) {
//     requestModal.classList.remove('open');
//   }
// });

// add a new request
// requestForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const addRequest = firebase.functions().httpsCallable('addRequest');
//   addRequest({ 
//     text: requestForm.request.value 
//   })
//   .then(() => {
//     requestForm.reset();
//     requestForm.querySelector('.error').textContent = '';
//     requestModal.classList.remove('open');
//   })
//   .catch(error => {
//     requestForm.querySelector('.error').textContent = error.message;
//   });
// });


// saveToken add
requestSaveToken.addEventListener('click', (e) => {
  console.log('e:', e)
  console.log('clicked');
  requestPermission()
  
})


// function

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
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
      console.log('currentToken:', currentToken)
      // sendTokenToServer(currentToken);
      // updateUIForPushEnabled(currentToken);
    } else {
  
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      // updateUIForPushPermissionRequired();
      // setTokenSentToServer(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // showToken('Error retrieving Instance ID token. ', err);
    // setTokenSentToServer(false);
  });
  // [END get_token]
}


// sendMessage add


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