var mysql = require('mysql')
const connexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'comdata_app'
  })
var test = 'gRs&14oP';
  module.exports.connexion=connexion;
  module.exports.test=test;