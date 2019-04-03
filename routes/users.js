var express = require('express');
var router = express.Router();

var db = require('../public/config/dbc.js')







router.post('/', function(req, res, next) {

  var token = req.body.token
  console.log(req.body)
  console.log(req.body.token)
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "select  id_user , nom , prenom , email , linkedin , fonction , tel , localisation ,img_profil  from users"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,(err,rows,fields)=>{
        res.writeHead(200, {'Content-Type': 'text/plain'  })
        res.end(JSON.stringify(rows))

      })
    }
  }
    else 
    {
      res.writeHead(400, {'Content-Type': 'text/plain' , 'error': 'BAD TOKEN'  })
      res.end()
    }
  })
});




module.exports = router;
