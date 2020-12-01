const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const connectionPool = require('../database/connection-pool')
const BookRepository = require('../database/book-repository')


/*   https://www.codementor.io/@oparaprosper79/understanding-node-error-err_http_headers_sent-117mpk82z8  */

let repository = new BookRepository(connectionPool);



/*  GET A SINGLE BOOK */
router.get('/:id', function(req,res) {

  repository.get(req.params.id, (err,result)=>{
    if (err) {
      res.status(500).json({'error': err.toString() });
    }
    else {
      res.status(200).json(result);
    }
  });
 
})





/* GET users listing. */
router.get('/', function(req, res) {
  
  //no parameters just the callback, see the DAO repo
  repository.getAll((err,result)=>{
    if (err) {
      res.status(500).json({'error': err.toString() });
    }
    else {
      res.status(200).json(result);
    }
  });

});




/*  PUT  / UPDATE A BOOK */
router.put('/:id', function(req,res) {

  repository.update(req.params.id, req.body, (err,result)=>{
    if (err) {
      res.status(500).json({'error': err.toString() });
    }
    else {
      res.sendStatus(200);
    }
  });

})


/*  DELETE  */
router.delete('/:id', function(req,res) {
  
  repository.delete(req.params.id, (err,result)=>{
    if (err) {
      res.status(500).json({'error': err.toString() });
    }
    else {
      res.sendStatus(200);
    }
  });

})


/* SAVE BOOK */
/* POST */
router.post('/', function(req,res) {

  console.log(req.body);

  repository.save(req.body, (err,result)=>{
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.sendStatus(200);
    }
  });
})







module.exports = router;