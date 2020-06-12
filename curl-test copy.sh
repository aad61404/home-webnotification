  fetch('https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send', {
    method: 'POST',
    headers: {
      Authorization: 'key=' + serverKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notification: 'hello',
      to: 'dtgq7ytgzdpct1lDxSnksa:APA91bE_Yo8fEFJb7Xlzvf6odSxmjw_s5oiyuAhAvbWmN5rHHbAyc_6O1J95L0rVHNzEiw7MudFVMzteqt0qc61pi5KMJVZrh5c3s0HWdeH7fYuXqZjo3uTmOaQo2iMlqlJYuvuFPaEA',
    }),
  }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.error(error);
    });


POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send HTTP/1.1

Content-Type: application/json
Authorization: Bearer ya29.ElqKBGN2Ri_Uz...PbJ_uNasm

{
  "message": {
    "token" : <token of destination app>,
    "notification": {
      "title": "FCM Message",
      "body": "This is a message from FCM"
    },
    "webpush": {
      "headers": {
        "Urgency": "high"
      },
      "notification": {
        "body": "This is a message from FCM to web",
        "requireInteraction": "true",
        "badge": "/badge-icon.png"
      }
    }
  }
}