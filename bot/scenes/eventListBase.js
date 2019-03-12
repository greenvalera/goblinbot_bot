const Markup = require('telegraf/markup')
const db = require('../../db/models/index')
const Event = db.event;
const { eventButtons, eventInfo } = require('../templates')

const buildShowEventsHandler = title => async ctx => {
    ctx.scene.session.events = await Event.findAll();
    const buttons = eventButtons(ctx.scene.session.events);
    ctx.reply(
      title,
       Markup.keyboard(buttons).oneTime()
        .resize()
        .extra())
};

const replyWithEventInfo = async ctx => {
    const event = ctx.scene.session.events.find(event => event.dataValues.id === ctx.scene.session.eventID);
    const entries = await event.getEntries();
    const answer = eventInfo(event, entries);

    ctx.replyWithMarkdown(answer)
};

module.exports = {
  buildShowEventsHandler,
  replyWithEventInfo
}