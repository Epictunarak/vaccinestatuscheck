const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const admin = require('firebase-admin');

// Use body-parser middleware
app.use(bodyParser.json());

// Initialize Firebase Admin SDK with a service account
const serviceAccount = require('./serviceaccountkey.json'); // Replace with your service account file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mooh-73e37-default-rtdb.asia-southeast1.firebasedatabase.app" // Replace with your Firestore database URL
});

const db = admin.firestore();

// Endpoint to check vaccine status
app.post('https://f97d-202-29-153-10.ngrok-free.app ', async (req, res) => {
  const { personalID } = req.body;

  try {
    const userDoc = await db.collection('Users').doc(personalID).get();

    if (userDoc.exists && userDoc.data().vaccineStatus === 'vaccinated') {
      res.json({ message: 'คุณได้รับวัคซีน' });
    } else {
      res.json({ message: 'ไม่พบข้อมูลวัคซีน' });
    }
  } catch (error) {
    res.status(500).send('Error retrieving data: ' + error.message);
  }
});

// Endpoint to generate custom token
app.post('https://f97d-202-29-153-10.ngrok-free.app', async (req, res) => {
  const { uid } = req.body;

  try {
    const customToken = await admin.auth().createCustomToken(uid);
    res.json({ customToken });
  } catch (error) {
    res.status(500).send("Error generating custom token: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
