var moment = require('moment');
moment.locale('ru');

const eventTemplate = (id, type, date) => {
    return `#${id} ${type} ${moment(date).format("dddd, MMMM Do YYYY, hh:mm")}`;
};

module.exports = events => {
    return events.map(event => {
        const date = new Date(event.dataValues.date);
        return eventTemplate(event.dataValues.id, event.dataValues.type, date)
    }).join('\n')
};