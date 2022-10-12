const path = require("path");
const Consola = require("../utils/database").models.Consola;
//const sequelize =require("../utils/database");
//const Sequelize = require("sequelize");

// Firebase SDK
var FCM = require('fcm-node');
const { initializeApp } = require( "firebase/app");



// Proceso cuando se llame a la ruta
exports.getAltaConsola = (req,res)=>{
    //res.send('<h1>Formulario de consola</h1>')
    res.sendFile(path.join(__dirname,'..','views','submit.html'));
}

exports.postAltaConsola = (req,res)=>{
    console.log(req.body)
    //INSERT INTO Consola VALUES ()
    Consola.create(req.body)
        .then(resultado=>{
            console.log("Registro exitoso");//Servidor
            res.send("Registro exitoso") //Cliente
        })
        .catch(error=>{
            console.log(error); //Servidor
            res.send("Ocurrio un error")//Cliente
            res.redirect("/consola/altaConsola")
        })    
}

exports.getConsultaConsola = (req,res)=>{
    res.send('<h1>Datos de las consolas</h1>')
}