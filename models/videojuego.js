const Sequelize = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Videojuego',{
        //Forma especifica de declarar atributos
        nombreVideojuego:{
            type: Sequelize.STRING,
            allowNull: true
        },
        clasificacion: Sequelize.STRING
    })
}