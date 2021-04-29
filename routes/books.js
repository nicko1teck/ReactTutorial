const express = require('express');
const mysql = require('mysql');
//const dbConn = require('../config/db');

const router = express.Router();

const BookRepository = require('../database/book-repository');
const connectionPool = require('../database/connection-pool');

let repository = new BookRepository(connectionPool);


router.get('/:id', function (req, res) {
  repository.get(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.status(200).json(result);
    }
  })
})




// Get a single book
router.get('/:id', function (req, res) {
  repository.get(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.status(200).json(result);
    }
  });
})



// Update a book
router.put('/:id', function (req, res) {
  repository.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.sendStatus(200);
    }
  });
})



// Delete a book
router.delete('/:id', function (req, res) {
  repository.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.sendStatus(200);
    }
  });
})



// Save a book
router.post('/', function (req, res) {

  repository.save(req.body, (err, result) => {
    if (err) {
      console.log("THERE WAS AN ERROR IN THE SAVE METHOD");
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.sendStatus(200);
    }
  });
})

// Get all the books
router.get('/', function (req, res) {
  repository.getAll((err, result) => {
    if (err) {
      res.status(500).json({ 'error': err.toString() });
    }
    else {
      res.status(200).json(result);
    }
  });
});


module.exports = router;