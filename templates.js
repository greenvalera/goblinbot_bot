var moment = require('moment');
moment.locale('ru');
const Markup = require('telegraf/markup')

const eventTemplate = (id, type, date) => {
    return `#${id} ${type} ${moment(date).format("dddd, MMMM Do YYYY, hh:mm")}`;
};

const eventsListTemplate = events => {
    return events.map(event => {
        const date = new Date(event.dataValues.date);
        return eventTemplate(event.dataValues.id, event.dataValues.type, date)
    }).join('\n')
}

const eventButtons = events => {
    return events.map(event => {
            const date = new Date(event.dataValues.date);
            return [
                eventTemplate(event.dataValues.id, event.dataValues.type, date)
            ]
        }
    )
}

module.exports = {
    eventTemplate,
    eventButtons,
    eventsListTemplate
}
