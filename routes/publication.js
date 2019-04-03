var express = require('express');
var router = express.Router();

var db = require('../public/config/dbc.js')
var fs = require('fs')




function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync("C:/Users/zbook/COMDATA_APP/public/images/"+file);
  
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

router.get('/:username:password',function (req,res,next){
  const queryUserPerId = "select * from publication where username = ? and password =?"
  const username = req.params.username
  const password = req.params.password
  db.connexion.query(queryUserPerId,[username,password],(err,rows,fields)=>{
    if(!err)
    {
      for (var i = 0 ; i<rows.length ; i++)
    {
       a =  {id:rows[i].id,contenu:rows[i].contenu,image:base64_encode(rows[i].image),titre:rows[i].titre,type_publi:rows[i].type_publi}
       
    }
    res.json([a])
    }
  })

})



router.post('/', function(req, res, next) {

  var token = req.body.token
  console.log(req.body)
  console.log(req.body.token)
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "select p.* , u.nom , u.prenom , u.img_profil from publication_francais p , users u where u.id_user = p.id_publisher order by p.id asc"
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

router.post('/add_like', function(req, res, next) {

  var token = req.body.token
  var id_pub = req.body.id_pub
  console.log(req.body)
  console.log(req.body.token)
 
  const queryUserPerId = "select * from tokens where token = '"+token+"'"

  db.connexion.query(queryUserPerId,(er,row,field)=>{
    const queryUser = "update publication_francais set nbr_like = nbr_like+1 where id = ?"
    if(!er)
    if(row.length){
    if(row[0].token==token)
    {
      db.connexion.query(queryUser,[id_pub],(err,rows,fields)=>{
        res.writeHead(200, {'Content-Type': 'text/plain'  })
        res.end()

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


router.get('/:id', function(req, res, next) {

  const queryUserPerId = "select * from publication_francais where id = ?"
  const userId = req.params.id
  var root ={name:"Berred" , lastname:"Adam"}
  db.connexion.query(queryUserPerId,[userId],(err,rows,fields)=>{
  if(!err)
  {
    var a = ''
    var b =''
    for (var i = 0 ; i<rows.length ; i++)
    {
       a =  {id:rows[i].id,contenu:rows[i].contenu,image:base64_encode(rows[i].image),titre:rows[i].titre,type_publi:rows[i].type_publi}
       
    }
    res.json([a])
  }
    
  else console.log(err)
  })
});

router.get('/', function(req, res, next) {

  const queryUserPerId = "select * from publication_francais"
  const userId = req.params.id
  db.connexion.query(queryUserPerId,(err,rows,fields)=>{
  if(!err)
  {
    var a = new Array()

    for (var i = 0 ; i<rows.length ; i++)
    {
      a[i]={id:rows[i].id,contenu:rows[i].contenu,image:base64_encode(rows[i].image),titre:rows[i].titre,type_publi:rows[i].type_publi}
       
    }
    res.json(a)
    
  }
    
  else console.log(err)
  })
});





module.exports = router;
