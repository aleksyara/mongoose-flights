const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create,
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
  
  function newTicket(req, res) {
    Ticket.find({}, function (err, tickets) {
      res.render('tickets/new', {
        title: 'Add Ticket',
        tickets
      });
    })
  }