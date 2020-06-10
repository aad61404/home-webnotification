curl -X POST -H "Authorization: key=AAAAHcqmPqw:APA91bEDMi6ES7vWRdOP-FDJbCokiBeNMg37DOCsP4r-zdLUKss3c5Bw4RLm8O5dHuc7HRlxLyF30fuFUwSrUjf014cWByqJU66amGkBzmCMKfn_cGM5F1Bvw2D_t1RQE3wQN4U_nFym" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "fM2hOhrO0wXqL4rATpd6ET:APA91bEYqZ7wt73MeruWAlzFRnwC_SjLTKyzbNA4F74ypzLMgK7BnqvYvv5b58nRlu5wzBRMkbCmRAbgKClhiUNTOCDS3sRF9Jo2HpUxnRscWdpyubCkjrO-D0lTYMEtyBiqM4H-e4Z1"
}' "https://fcm.googleapis.com/fcm/send"