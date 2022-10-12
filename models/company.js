const Sequelize = require('sequelize');

const Company = (sequelize) =>{
    sequelize.define('Company',{
        nombreComopany: Sequelize.STRING        
    })
}

module.exports = Company;