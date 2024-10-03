const admin = require("firebase-admin");

// Replace with your service account key file path
const serviceAccount = require("./serviceaccountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mooh-73e37-default-rtdb.asia-southeast1.firebasedatabase.app"
});

module.exports = admin;

