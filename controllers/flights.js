const Flight = require('../models/flight');

module.exports = {
    index: index,
    show,
    new: newFlight,
    create   
  };
  
  function index(req, res) {
    Flight.find({}, function(err, flights) {
      console.log(flights, ' <============ flights in show page')
      res.render('flights/index', { title: 'All Flights', flights });
    });
  }
  
  function show(req, res) {
    console.log('req.params.id: ', req.params.id);
    Flight.findById(req.params.id, function(err, flight) { //flight is my model
      console.log(flight, ' <============ flight in show page')
      res.render('flights/show', { title: 'Flight Detail', flight });
    });
  }

  function newFlight(req, res) {
    res.render('flights/new', { title: 'Add Flight' });
  }

  function create(req, res) {
    console.log('*******');
    console.log('req.body: ', req.body);
    console.log('req.body.departs: ', req.body.departs);
    console.log('typeof req.body.departs: ', typeof req.body.departs);
  
    const flight = new Flight(req.body);
    if (req && req.body && req.body.departs === '') {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      flight.departs = new Date(year + 1, month, day);
    }

    console.log('flight: ', flight);
    
    flight.save(function(err) {
      console.log('This is error: ', err);
      // one way to handle errors
      if (err) return res.redirect('/flights/new');
      console.log('flight: ', flight);
      // for now, redirect right back to new.ejs
      res.redirect('/flights');
    });
  }
  