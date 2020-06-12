curl -X POST -H "Authorization: key=AAAAHcqmPqw:APA91bEDMi6ES7vWRdOP-FDJbCokiBeNMg37DOCsP4r-zdLUKss3c5Bw4RLm8O5dHuc7HRlxLyF30fuFUwSrUjf014cWByqJU66amGkBzmCMKfn_cGM5F1Bvw2D_t1RQE3wQN4U_nFym" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "HELLLLO",
    "body": "yooooo",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "dtgq7ytgzdpct1lDxSnksa:APA91bE_Yo8fEFJb7Xlzvf6odSxmjw_s5oiyuAhAvbWmN5rHHbAyc_6O1J95L0rVHNzEiw7MudFVMzteqt0qc61pi5KMJVZrh5c3s0HWdeH7fYuXqZjo3uTmOaQo2iMlqlJYuvuFPaEA"
}' "https://fcm.googleapis.com/fcm/send"