  module.exports = {
   clearDb
 };

 function clearDb(req, res) {
   console.log('Database will be nuked!!!');
   const Flight = require('../models/flight');
   Flight.deleteMany({}, (err, result) => {
       console.log('Database will be nuked!!!');
       console.log(result);
       res.send(result);
    });

   
};