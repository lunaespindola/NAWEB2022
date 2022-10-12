const firebaseConfig = {
    apiKey: "AIzaSyDgOT6Gs_uw19XRNun70Ub7YkHioOT1kds",
    authDomain: "auth-f750b.firebaseapp.com",
    projectId: "auth-f750b",
    storageBucket: "auth-f750b.appspot.com",
    messagingSenderId: "383143910926",
    appId: "1:383143910926:web:443d2664960e8dc281a65f"
  };

const firebaseapp = initializeApp(firebaseConfig);

const auth = firebaseapp.auth();

function login (){
    email = document.getElementById('Email').value;
    password = document.getElementById('Password').value;

    if (validate_email(email) == false || validate_password(password) == false){
        alert('Email or password is Wrong')
        return
    }

    auth.signInWIthEmailAndPassword(email, password)
    .then(function(){
        var user_data = {last_login : Date.now()}

        database_ref.child('users/' + user_data.uid).update(user_data)

        alert('User Logged')
    })
    .catch(function(error){
        console.log (error.code)
        console.log(error.message)

        alert(error.message)
    })
}

function validate_email(email){ 
    let pattern = /^[^@] + @\w + (\.\w+) + \w$/; 
    if(pattern.test(email) == true){ 
        return true
    } else{
        return false
    }
}

function validate_password(password){
    if (password < 6){
        return false
    } else {
        return true
    }
}
