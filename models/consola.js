const Sequelize = require('sequelize');

const Consola = (sequelize) =>{
    sequelize.define('Consola',{
        nombreConsola: Sequelize.STRING,
        descripcionConsola: Sequelize.STRING
    })
}

module.exports = Consola;