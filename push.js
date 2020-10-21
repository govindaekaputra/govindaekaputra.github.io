const webPush = require("web-push");

const vapidKeys = {
    "publicKey" : "BGdhTRykPnPMK5IU8qU5BeyL2h_MCVmYdPEbKhOzYs6J-qD_X0Dx-rcOTYzxQKwH5EwpeyByGrXOoX0hNUuVrac",
    "privateKey" : "GWAMSM9uUQj1ltm_RaRtaG0sqNYjhiv6SRoUvdtU6Ig"
}

webPush.setVapidDetails(
    "mailto:govinda.ekaputra09@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    "endpoint" : "https://fcm.googleapis.com/fcm/send/eKBYvPYuSN4:APA91bGyGoxhxeFX25XHvAe8oTy2swh_-o3Sa-1C0DAYspz0EnHwldLpNijuX0z4OIMqrk8EaE1Sp7jWA9zXjJXFVcnWErBO2MlzeC8pvbMjwRQCNx0VlEwfcD4-lRpLJ74jqbn-YK35",
    "keys" : {
        "p256dh" : "BPljvVdtrig5/0JGnTfuGCkpfFYMhZFBggYyqqB1FokY9ZVeHKsAXdrv0cnk/sV7/cawiwSQ4hGw2/PjyA7rEes=",
        "auth" : "NFZDwS3Twol8EIB2Bc5E8Q=="
    }
}

const payLoad = "AUwooowow, selamat mas bro, ini adalah nofikasi. klik buka untuk menuju google";
const options = {
    gcmAPIKey : "25576510536",
    TTL : 60
}
webPush.sendNotification(
    pushSubscription,
    payLoad,
    options
);