/* 
 * Author: Carlos Alan Gallegos Espindola
 * Server side code for "Informando Atizapan" webpage
*/

// Imports (Require) for Backend code
const cookieParser = require("cookie-parser"); // Module to read cookies and get auth security
const express = require("express"); // Module to connect Backend with Frontend
const admin = require("firebase-admin"); // Module to connect the auth with firebase on Admin Side (Needs the AccountKey)
const path = require("path"); // Module to work with directory paths 
const morgan = require("morgan"); // Module to read logs of HTTP
const axios = require('axios'); // Module to send POST request


function wrMessage(title, body){
  //Function to write notification on JSON format to send to Firebase
  var message = {
    to:'/topics/news',
    notification: { 
      "title": title,
      "body": body,
    }
  }
  return message
};

// URL from Firebase to send Notifications throught POST request
const url = 'https://fcm.googleapis.com/fcm/send'

// Import the serverkey of Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");

// Cofiguration on JSON of the POST request with ServerKey
let config = {
  headers : {
   "Authorization": "key=AAAAjEp9KX0:APA91bF34woXc_GiQaVy3hrpVUZQo-vZURUOymW-DAI_7sdt5K5QxZ2EON3nYweh668tVPkuQr90MXAtKoZ4P-jEei-f5FGKtpaj1CEgX3PQCKYRdgpbPQGyYyG_7_0GrytF0b4YSCle",
    "Content-Type": "application/json"
  }
}

// Initialize server side app for Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://server-auth-41acc.firebaseio.com",
});

// Open the port wich will be used on the web page
const PORT = process.env.PORT || 8080;

// Initialize express object type
const app = express();

// Initialize HTTP logger 
app.use(morgan('dev'))

// Initialize HTML engine rendering our HTML code
app.engine("html", require("ejs").renderFile);

// Send the static path to use 
app.use(express.static(path.join(__dirname,"public")));

// Initialize JSON, JSON Parser and Cookie Parser
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

// Initialize default HTML path
app.get("/", function (req, res) {
  res.render(path.join(__dirname, 'views','index.html'));
});

// Initialize our login path
app.get("/login", function (req, res) {
  res.render(path.join(__dirname, 'views','index.html'));
});

// Initialize our submit path with token reader using Cookie-Parser
app.get("/submit", function (req, res) {
  const sessionCookie = req.cookies.session || "";
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((userData) => {
      console.log("Logged in:", userData.email)
      res.render(path.join(__dirname, 'views','submit.html'));
    })
    .catch((error) => {
      res.redirect("/login");
    })
});

// Send information to Firebase Auth and set a timer to the cookie for authentication
app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});


// Send information to Firebase throught API reading our submit.html text
app.post("/submitData", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  var mess  = wrMessage(title,body)
  console.log(mess)
  axios.post(url,mess,config).then(response =>{
    console.log(response.data);
  })
  res.redirect("/submit")
})

// Initialize our PORT on localhost with our designated Port
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});