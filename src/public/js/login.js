/* 
 * Author: Carlos Alan Gallegos Espindola
 * Client side code for "Informando Atizapan" webpage
*/

window.addEventListener("DOMContentLoaded", () => {
  //Function to initialize Firebase App on client side once the page is loaded
    const firebaseConfig = {
        apiKey: "AIzaSyDgOT6Gs_uw19XRNun70Ub7YkHioOT1kds",
        authDomain: "auth-f750b.firebaseapp.com",
        projectId: "auth-f750b",
        storageBucket: "auth-f750b.appspot.com",
        messagingSenderId: "383143910926",
        appId: "1:383143910926:web:443d2664960e8dc281a65f"
    };
    
    // Initialize Firebase App
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    // Get document info
    document
    .getElementById('post')
    .addEventListener('click', (event) => {
      event.preventDefault();
      const login = document.getElementById('Email').value;
      const password = document.getElementById('Password').value;
      
      // Initialize Firebase auth with our info from HTML inputs
      firebase
      .auth()
      .signInWithEmailAndPassword(login, password)
      .then(({ user }) => {
        // Get the UID token
        return user.getIdToken().then((idToken) => {
          // Send client info to server 
          return fetch("/sessionLogin", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({ idToken }),
          });
        });
      })
      .then(() => {
        // Information is wrong 
        return firebase.auth().signOut();
      })
      .then(() => {
        // Information is correct
        window.location.replace("submit");
      });
      return false;
    });
  }); 