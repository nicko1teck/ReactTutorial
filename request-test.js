'use strict';

const axios = require('axios');

const book = {
    'author': 'Barry Goldwater',
    'title': 'I am Barry fuckin Goldwater',
    'published': '2010-01-01'
  }

axios.delete('http://localhost:3000/books/2')
.then(response=>{
    console.log(response)
})
.catch(error=>{
    console.log(error);
});






