# home-webnotification


## 6/15 更新
- 把測試的程式碼放到/TestBackup
- 根目錄只要留正在運行的程式
* 目前功能 : 
  *  註冊
  *  新增request
  *  註冊token
  *  送出通知(該功能將移到cloud functions ，尚未完工，若要測試前台，可使用)

<h3 style="color : red;">手動流程</h3>

* [****  連結  **** ](##手動測試)

### CURL-TEST 連結
- 註冊取得token後也可以使用CURL POST測試通知
- [範例](##CURL-TEST)


-----------------------


## 使用方式 ：
給內部同仁使用，加入firebase google auth 權限
加入
```
firebase login
firebase serve
```
或自行新建一個專案

<span style="color:red">PS 本專案路徑設定時輸入一個  . <br />
. 為根目錄  ，不是預設的新增public資料夾 （新增專案時需注意)</span>


<br />
----------------------------

* 目前進度   :  functions.https.onCall 呼叫程式 + admin.messaging().send(message) ， 可讓前端 js/app.js messaging.onMessage 收到訊息
- 未完成功能  :
   * cloud functions /index.js(後端) 
   * 將https.oncall 改成 firestore.document('googleUid/{uid}').onCreate)  部署到 cloud functions
   * 搭配async await 撈取最新token 並送出
      * 驗證改成 oAuth2



<br />
<br />
<br />

## 其他------可不看

<br />


## 6/10  參考資源 更新
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

--------------------------------

## CURL-TEST
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

## 手動測試

### 登入 
- 帳號 test02@gmail.com
- 密碼 123456

![Alt text](/images/02.png)

### 註冊
![Alt text](/images/03.png)

### 註冊完成時會寫入firestore
![Alt text](/images/03-2.png)

### 將token 取代後 重新整理頁面 (注意快取)
![Alt text](/images/04.png)

### 點擊送出
![Alt text](/images/05.png)

