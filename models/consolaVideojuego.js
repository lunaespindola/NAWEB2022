const Sequelize = require('sequelize');

const ConsolaVideojuego = (sequelize) =>{
    sequelize.define('ConsolaVideojuego',{
        unidadesVendidas:Sequelize.INTEGER
    })
}

module.exports = ConsolaVideojuego;