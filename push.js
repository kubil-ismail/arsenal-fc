const webPush = require('web-push')

const vapidKeys = {
  "publicKey": "BO5bWLot5pPigU0U6N1dej80dpQbsLgzqgwkMWvYyQapMd9t0MgUf7lSpT667DmIul6rihSKSsuhJFxqXRMr9r8",
  "privateKey": "SvpWHKEVm1TRVOgTFP0rMRom9VE2N9ZCUkicBDSLe0k"
};

webPush.setVapidDetails(
  'mailto:bilkisismail07@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/eo4z0g_C44s:APA91bEyIKYyUX3SlJvrILhP7VjZuSTtHqbSEVH7mV8XlbfKfdLvhiZej__QjdaGzu3wQEorxA0qfyGEDvx6TluEX3yKdI3JbnRVcpc96ZiKMQxHsdDOs05uI5WlvPQVThZ0aNwx1Siv",
  "keys": {
    "p256dh": "BEVIaKvZVvoCpEJSEIDLGSqYUKV0LwF9z2w3p8Sni602En57FeL8ON4/y7MErZtcYpo6qHvJO8ZutAG5A3nmR9g=",
    "auth": "J7avwBMWvll1B8wMERvq9w=="
  }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
  gcmAPIKey: '161537571105',
  TTL: 60
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options
);