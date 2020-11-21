const currencyFormatter = require('currency-formatter');

function formatDollarAmount(amount) {
    return currencyFormatter.format(amount, { code: 'USD' });
}

// ticket is an array of Ticket objects, which has property price in it. 
function formatDollarAmountInTickets(tickets) {
    let output;
    output = tickets.map((ticket) => {
        ticket.price = currencyFormatter.format(ticket.price, { code: 'USD' })
        return ticket;
    })
    return output;
}


module.exports = {
    formatDollarAmount,
    formatDollarAmountInTickets
};