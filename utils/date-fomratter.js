const moment = require('moment');

function formatDestinationDates(destinationArr) {
    let output;
    output = destinationArr.map((elem) => {
        let formattedDestination = moment(elem.arrival).format('lll');
        elem.arrival = formattedDestination;
        return elem;
    });
    return output;
}

function formatFlightDepartureDate(departureDate) {
    let output;
    output = moment(departureDate).format('lll');
    return output;
}

function formatFlightDepartureDates(flightArr) {
    let output;
    output = flightArr.map((elem) => {
        let formattedDeparureDate = moment(elem.arrival).format('lll');
        elem.departs = formattedDeparureDate;
        return elem;
    });
    return output;
}


module.exports = {
    formatDestinationDates,
    formatFlightDepartureDate,
    formatFlightDepartureDates
};