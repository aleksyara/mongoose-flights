const Flight = require('../models/flight');
 
 module.exports = {
   create
 };

 function create(req, res) {
   console.log('*************req.body: ',req.body);
   
    Flight.findById(req.params.id, function(err, flight) {
      console.log('***************flight: ', flight);
      console.log('***************flight.destinations: ', flight.destinations);
      flight.destinations.push(req.body);
      console.log('v2*************flight.destinations: ', flight.destinations)
      flight.save(function(err) {
        res.redirect(`/flights/${flight._id}`);
      });
    });
  }