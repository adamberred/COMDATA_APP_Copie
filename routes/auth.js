const express = require('express');

const jwt = require('jsonwebtoken');

var md5 = require('md5');



var router = express.Router();

var db = require('../public/config/dbc.js')

const app = express();

router.get('/', (req, res) => {

    res.json({
  
      message: 'Welcome to the API'
  
    });
  
  });

  

  
  
  
/*  router.post('/posts', verifyToken, (req, res) => {  
  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
  
      if(err) {
  
        res.sendStatus(403);
  
      } else {
  
        res.json({
  
          message: 'Post created...',
  
          authData
  
    //    });
  
   //   }
  
  //  });
  //
  //}); */
  
  
  
  /*router.get('/:username/:password', (req, res) => {
  
    // Mock user
    var tok =""
  
    const queryUserPerId = "select id_user from users where username = ? and password = ?"
    const username = req.params.username
    const password = req.params.password

    db.connexion.query(queryUserPerId,[ username,password],(err,rows,fields)=>{
        if(!err){
            console.log()
        if(rows[0])
        {

            jwt.sign({rows}, 'secretkey', { expiresIn: '30d' }, (err, token) => {
  
                
            
                  

               
                  const queryUserPerInsert = "insert into tokens (  id_user , token ) values ('"+rows[0].id_user+"','"+token+"')"
            db.connexion.query(queryUserPerInsert,(err,rows,fields)=>{
                res.send(tok)
            })
                
            
              });
            
        }

        else
        {

                  res.send('false')


        } 
    }  
    
    else (err)=> {
    console.log(err)
}
    console.log(username+' '+password) 
      })
  
  
  
    
  
  });
  
  */


   
 router.post("/", (req, res) => {
  
    // Mock user
    var tok =""
  
    const queryUserPerId = "select id_user from users where username = ? and password = ?"
    console.log(req.body);


    const username = req.body.username
    const password = md5(db.test+req.body.password)
    console.log(db.test+req.body.password)
    console.log(req.body)
    db.connexion.query(queryUserPerId,[ username,password],(err,rows,fields)=>{
        if(!err){
            console.log()
        if(rows[0])
        {
            console.log(rows[0]);
            jwt.sign({rows}, 'secretkey', { expiresIn: '30d' }, (err, token) => {
  
              
            
                  

               
                  const queryUserPerInsert = "insert into tokens (  id_user , token ) values ('"+rows[0].id_user+"','"+token+"')"
            db.connexion.query(queryUserPerInsert,(err,rows,fields)=>{
                if(err){console.log(err)}
                else 
                res.writeHead(200, {'Content-Type': 'text/plain' });
                var toks = {'token': token}
                res.end(JSON.stringify(toks))
            })
                
            
              });
            
        }

        else
        {

            res.writeHead(400, {'Content-Type': 'text/plain' , 'token' : 'erreur'});
            res.end()


        } 
    }  
    
    else (err)=> {
        res.writeHead(600, {'Content-Type': 'text/plain' , 'token' : 'erreur serveur'});
        res.end()


}
    console.log(username+' '+password) 
      })
  
  
  
    
  
  });
  
  
  // FORMAT OF TOKEN
  
  // Authorization: Bearer <access_token>
  
  
  
  // Verify Token
  
  function verifyToken(req, res, next) {
  
    // Get auth header value
  
    const bearerHeader = req.headers['authorization'];
  
    // Check if bearer is undefined
  
    if(typeof bearerHeader !== 'undefined') {
  
      // Split at the space
  
      const bearer = bearerHeader.split(' ');
  
      // Get token from array
  
      const bearerToken = bearer[1];
  
      // Set the token
  
      req.token = bearerToken;
  
      // Next middleware
  
      next();
  
    } else {
  
      // Forbidden
  
      res.sendStatus(403);
  
    }
  
  
  
  }
  module.exports = router;