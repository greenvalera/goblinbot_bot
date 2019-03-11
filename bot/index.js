const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const TelegramBotKey = "669147388:AAEBqB7u5ilj6ueZyKwFpBYIuRWY9a6DbpA";
const registerScene = require('./scenes/register')

//Event.findOrCreate({where: {type: 'showdown'}, defaults: {type: 'showdown', date: new Date()}});

const { enter } = Stage 

const bot = new Telegraf(TelegramBotKey)
const stage = new Stage([registerScene], { ttl: 10 })
bot.use(session())
bot.use(stage.middleware())
bot.command('register', enter('register'))
bot.on('message', (ctx) => ctx.reply('Try /register'))

module.exports = bot