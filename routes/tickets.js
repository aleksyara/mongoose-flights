const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

router.get('/new/:id', ticketsCtrl.prepareToByTicket);

// router.get('/new', function(req, res, next) {
//     res.render('tickets/new-ticket', {title: 'New Ticket'}, );
// });

router.post('/tickets', ticketsCtrl.create);
// router.post('/flights/:id/ticket', ticketCtrl.create);

module.exports = router;