var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');
const ticketsCtrl = require('../controllers/tickets');

/* GET users listing. */
router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.get('/:id', flightsCtrl.show);
router.post('/', flightsCtrl.create);//it's posting NEW flight FORM

router.get('/:id/tickets/new', ticketsCtrl.getNewTicketForm);
router.post('/:id/tickets', ticketsCtrl.addTicketToFlight);

module.exports = router;
