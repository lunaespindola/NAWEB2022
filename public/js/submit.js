import FCM from ("controllers/consola.js");
var serverKey = 'AAAA9PQhqjE:APA91bE0dplUAfX0pvpn8tjkuQk1zGsN6DbtrrxB7EY-Ek63RarSPd1DWSgqBu5wN3Zb7rM8oUEAh44ipfQbs6Xuy5fuqBzt4CG7-QWKLJlwp7NFspMF40Kyp93nW1E8p9OF_zT8nRNS';
var fcm = new FCM(serverKey);

// Constantes de HTML
const inptInun = document.getElementById("Inun");
const inptIncen = document.getElementById("Incen");
const inptAcc = document.getElementById("AccMov");
const inptTraf = document.getElementById("Traf");
const inptSis = document.getElementById("Sis");
const inptOt = document.getElementById("Otros");

const title = "Titulo";

function wrMessage(title, body){
    var message = {
        to:'fz5gO4ZcTCyXTMrIqWXqMz:APA91bEDwe-qjqDT2PzRLDY9xHnyzi4-Syk9Kcynt9_cQP4X9mEubVcX8nn8OzppJkS7-uyTFs13eMVLbXuJo18dOVR42gr79u8H5wB9okKcXzxHTEiGEFeOl_8mqNLsB1LeXRV7idpT',
        /*to:'/topics/alertasAtizapan',*/
        notification: { 
            title: title,
            body: body,
        },
        data: {
            title: 'Título de los datos',
            body: '{"name" : "Laptop", "product_id" : "12345", "final_price" : "15300"}'
        },
    };
};

function sendInun(){
    wrMessage(title, inptInun.value);
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Error al enivar mensaje" + err);
            console.log("Respuesta: " + response);
        } else {
            console.log("Mensaje enviado correctamente: ", response);
        }
    });
    alert(inptInun.value)
};
function sendIncen(){
    wrMessage(title, inptIncen.value);
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Error al enivar mensaje" + err);
            console.log("Respuesta: " + response);
        } else {
            console.log("Mensaje enviado correctamente: ", response);
        }
    });
    alert(inptIncen.value)
};
function sendAcc(){
    wrMessage(title, inptAcc.value);
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Error al enivar mensaje" + err);
            console.log("Respuesta: " + response);
        } else {
            console.log("Mensaje enviado correctamente: ", response);
        }
    });
    alert(inptAcc.value)
};
function sendTraf(){
    wrMessage(title, inptTraf.value);
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Error al enivar mensaje" + err);
            console.log("Respuesta: " + response);
        } else {
            console.log("Mensaje enviado correctamente: ", response);
        }
    });
    alert(inptTraf.value)
};
function sendSis(){
    wrMessage(title, inptSis.value);
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Error al enivar mensaje" + err);
            console.log("Respuesta: " + response);
        } else {
            console.log("Mensaje enviado correctamente: ", response);
        }
    });
    alert(inptSis.value)
};
function sendOt(){
    wrMessage(title, inptOt.value);
    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Error al enivar mensaje" + err);
            console.log("Respuesta: " + response);
        } else {
            console.log("Mensaje enviado correctamente: ", response);
        }
    });
    alert(inptOt.value)
};