const Ticket = require('../models/ticket');
const Flight = require('../models/flight');
const moment = require('moment');

module.exports = {
  getNewTicketForm,
  create,
  addTicketToFlight
};


function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const p = req.body.price;
  req.body.price = `${p.substr(5, 2)}-${p.substr(8, 2)}-${p.substr(0, 4)}`;
  Ticket.create(req.body, function (err, ticket) {
    res.redirect('/tickets/new');
  });
}

function addTicketToFlight(req, res) {
  let newTicket = new Ticket(req.body);
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.push(newTicket);
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`);
    });
  });
}
  
function getNewTicketForm(req, res) {
  console.log('this is req.body: ', req.body);
  Flight.findById(req.params.id, function(err, myFlight) { //flight is my model
    let formattedDate = moment(myFlight.departs).format('lll');
    console.log('formattedDate: ', formattedDate);
    let flight = JSON.parse(JSON.stringify(myFlight));
    flight.destinations.map((elem) => {
      return elem.arrival = moment(elem.arrival).format('lll');
    });
    flight.departs = formattedDate;
    console.log('formattedFlight: ', flight);
    console.log(flight, ' <============ flight in show page');
    res.render('tickets/new-ticket', { title: 'Buy Ticket', flight });
  });
}