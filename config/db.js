//'use strict';

//const mysql = require('mysql');

const db = {
    'user': 'en39ofgw7mc2r1pp',
    'password': 'nzd9tybiwsotft43',
    'host': 'pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    'database': 't6pd1yyl4reebhx9',
    'timezone': 'utc', 
}

/*

const dbConn = mysql.createConnection(db);


dbConn.connect( function(err) {
    if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
  });

*/



module.exports=db;