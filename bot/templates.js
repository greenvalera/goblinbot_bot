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

const eventInfo = (event, entries) => {
    const entryesHTMLStrings = entries.map(entry => `+ ${entry.name.replace('_', ' ')}`).join('\n')
        
    return `
    ${event.type} ${moment(event.date).format("dddd, MMMM Do YYYY, hh:mm")}
    -----------------------------------
    Список участников
    -----------------------------------
    ${entryesHTMLStrings}
    -----------------------------------
    Всего ${entries.length}
    `
}

module.exports = {
    eventInfo,
    eventTemplate,
    eventButtons,
    eventsListTemplate
}
