var firebase = require("firebase-admin");

var serviceAccount = require("./book-store-7dc95-firebase-adminsdk-modx9-89845da127");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://book-store-7dc95.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("tables");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

var usersRef = ref.child("users");
usersRef.set({
    user1: {
        date_of_birth: "June 23, 1912",
        full_name: "Alan Turing"
    },
    user2: {
        date_of_birth: "December 9, 1906",
        full_name: "Grace Hopper"
    }
});
