# home-webnotification


## 6/15 更新
- 把測試的程式碼放到/TestBackup
- 根目錄只要留正在運行的程式
* 目前功能 : 
  *  註冊
  *  新增request
  *  註冊token
  *  送出通知(該功能將移到cloud functions ，尚未完工，若要測試前台，可使用)

```
curl -X POST -H "Authorization: key=<Your Server key>" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "<Your new token>"
}' "https://fcm.googleapis.com/fcm/send"
```
  下面有範例


* 剩餘功能  
   * cloud functions /index.js(後端) 
   * 目前進度   :  functions.https.onCall 呼叫程式 + admin.messaging().send(message) ， 可讓前端 js/app.js messaging.onMessage 收到訊息
   * 未完成進度 ： 將https.oncall 改成 firestore.document('googleUid/{uid}').onCreate)  部署到 cloud functions
   * 搭配async await 撈取最新token 並送出
      * 驗證改成 oAuth2

<br />
<br />
<br />
<br />
<br />


## 6/10 更新 參考資源
1. firebase cloud function 教學
https://www.youtube.com/watch?v=29BNaJiqWB4
2. codelab Friendly (Message + Google Cloud Funciotns) (不完全適用)
參考 Messaging 就好
https://codelabs.developers.google.com/codelabs/firebase-cloud-functions/#0

3. youtuber
https://www.youtube.com/watch?v=7lKAvarlVHs

firebase cloud functions 官方文件
1. github 
https://github.com/firebase/functions-samples
2. docs
https://firebase.google.com/docs/functions/get-started?authuser=0

---------------------

1. 官方文檔
https://firebase.google.com/docs/cloud-messaging/js/first-message
2. curl post測試
https://blog.csdn.net/u012340794/article/details/71440604
3. 專案網址
https://console.firebase.google.com/project/home-webnotification/overview
4. 透過Postman 發送App通知
https://medium.com/@d0938687689/%E9%80%8F%E9%81%8Epostman-%E5%82%B3%E9%80%81%E9%80%9A%E7%9F%A5-fcm-bd4ed84f4a70

---------------------

HackMd 簡報
Firebase Functions
(已更新)
https://hackmd.io/@Jayson-Zheng/Sy5rlLepI#/

(源碼 => 可複製後 貼到hackMD上）
https://gist.github.com/aad61404/e3771b114e3e9f1410f59048ab37f467

## 其他筆記 
POST
https://fcm.googleapis.com/fcm/send

```
curl -X POST -H "Authorization: key=AAAAHcqmPqw:APA91bEDMi6ES7vWRdOP-FDJbCokiBeNMg37DOCsP4r-zdLUKss3c5Bw4RLm8O5dHuc7HRlxLyF30fuFUwSrUjf014cWByqJU66amGkBzmCMKfn_cGM5F1Bvw2D_t1RQE3wQN4U_nFym" -H "Content-Type: application/json" -d '{
  "notification": {
    "title": "Portugal vs. Denmark",
    "body": "5 to 1",
    "icon": "firebase-logo.png",
    "click_action": "http://localhost:8081"
  },
  "to": "fM2hOhrO0wXqL4rATpd6ET:APA91bHuxzUMmXnsoyyi6jTz42_EPu_sVSkhFKyEDpuJQvgkmhbQhGzuPH9LKka5T0WcMlOOJaXaGyn3imqG06XfpvAbOQek57yqV2Pllif2OQ7aLEqW61VFB0iESidjGg__w5xHiYw9"
}' "https://fcm.googleapis.com/fcm/send"
```