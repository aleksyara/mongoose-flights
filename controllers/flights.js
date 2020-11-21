const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
const moment = require('moment');
const DateFormatter = require('../utils/date-fomratter');
const CurrencyFormatter = require('../utils/currency-formatter');

module.exports = {
    index: index,
    show,
    new: newFlight,
    create   
  };
  
  function index(req, res) {
    Flight.find({}, function(err, myFlights) {
      let flights = JSON.parse(JSON.stringify(myFlights));
      flights = DateFormatter.formatFlightDepartureDates(flights);
      console.log(flights, ' <============ flights in show page')
      res.render('flights/index', { title: 'All Flights', flights });
    });
  }
  
  function show(req, res) {
    
    CurrencyFormatter.formatDollarAmount('1000.7898');
    Flight.findById(req.params.id, function(err1, myFlight) { //flight is my model

      if (!err1 && myFlight) {
        let flight = JSON.parse(JSON.stringify(myFlight));
        let formattedDate = DateFormatter.formatFlightDepartureDate(myFlight.departs);
        flight.destinations = DateFormatter.formatDestinationDates(flight.destinations);
        flight.departs = formattedDate;

        Ticket.find({'_id': {$in: myFlight.tickets}}, function(err2, myTickets) {
          
          if (!err2 && myTickets) {
            let tickets = JSON.parse(JSON.stringify(myTickets));
            tickets = CurrencyFormatter.formatDollarAmountInTickets(tickets);
            flight.tickets = tickets;
          }
          console.log(flight, ' <============ flight in show page');
          res.render('flights/show', { title: 'Flight Detail', flight });

        });
      }
    });
  }

  function newFlight(req, res) {
    res.render('flights/new', { title: 'Add Flight' });
  }

  function create(req, res) {
    const flight = new Flight(req.body);
    if (req && req.body && req.body.departs === '') {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      flight.departs = new Date(year + 1, month, day);
    }
    
    flight.save(function(err) {
      console.log('This is error: ', err);
      // one way to handle errors
      if (err) return res.redirect('/flights/new');
      console.log('flight: ', flight);
      // for now, redirect right back to new.ejs
      res.redirect('/flights');
    });
  }
  