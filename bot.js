const Telegraf = require('telegraf')
const db = require('./db/models/index')
const Event = db.event;
const TelegramBotKey = "669147388:AAEBqB7u5ilj6ueZyKwFpBYIuRWY9a6DbpA";
const eventsListTemplate = require('./templates')

//Event.findOrCreate({where: {type: 'showdown'}, defaults: {type: 'showdown', date: new Date()}});

const bot = new Telegraf(TelegramBotKey)
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('events', (ctx) => {
    Event.findAll().then(events => ctx.reply(eventsListTemplate(events)))
})
bot.launch()