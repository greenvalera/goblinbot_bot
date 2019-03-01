const Telegraf = require('telegraf')
const db = require('./db/models/index')

const Event = db.event;


//Event.findOrCreate({where: {type: 'draft'}, defaults: {type: 'draft', date: new Date()}});

const bot = new Telegraf("669147388:AAEBqB7u5ilj6ueZyKwFpBYIuRWY9a6DbpA")
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there nahuy bHUY HUY HUY'))
bot.launch()