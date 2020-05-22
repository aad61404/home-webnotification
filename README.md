# home-webnotification

1. 官方文檔
https://firebase.google.com/docs/cloud-messaging/js/first-message
2. curl post測試
https://blog.csdn.net/u012340794/article/details/71440604
3. 專案網址
https://console.firebase.google.com/project/home-webnotification/overview



https://medium.com/@d0938687689/%E9%80%8F%E9%81%8Epostman-%E5%82%B3%E9%80%81%E9%80%9A%E7%9F%A5-fcm-bd4ed84f4a70


POST
https://fcm.googleapis.com/fcm/send

Auth
No Auth

Authorization
key=AAAAHcqmPqw:APA91bEDMi6ES7vWRdOP-FDJbCokiBeNMg37DOCsP4r-zdLUKss3c5Bw4RLm8O5dHuc7HRlxLyF30fuFUwSrUjf014cWByqJU66amGkBzmCMKfn_cGM5F1Bvw2D_t1RQE3wQN4U_nFym

Content-Type
application/json

```
{
  "to" : "e-PtmiP0Rf7PM8HtcJk5_l:APA91bGAKy8SVQsX25xLlc_OXwjxyV09FQgg5LfZ6aTOO9BJEo7DIHMIu1tlaw3o-5z874xE7fIjFEW3Kb-bA9_zd_RQK_7cWO_rjaM1iQ7cKWDvNrbWMNTMaO_U08NRfn0ohMqEvHCk",
  "notification" : {
	  "body" : "great match!",
	  "title" : "Portugal vs. Denmark",
	  "content_available" : true,
	  "priority" : "high"
	},
  "data" : {
  "body" : "great match!",
  "title" : "Portugal vs. Denmark"
  "content_available" : true,
  "priority" : "high"
  }
}
```