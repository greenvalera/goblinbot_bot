const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const TelegramBotKey = "669147388:AAEBqB7u5ilj6ueZyKwFpBYIuRWY9a6DbpA";
const registerScene = require('./scenes/register')
const showScene = require('./scenes/show')

// const db = require('../db/models/index')
// const Event = db.event;
// Event.findOrCreate({where: {type: 'draft'}, defaults: {type: 'draft', date: new Date()}});

const { enter } = Stage 

const bot = new Telegraf(TelegramBotKey)
const stage = new Stage([registerScene, showScene], { ttl: 10 })
bot.use(session())
bot.use(stage.middleware())
bot.command('register', enter('register'))
bot.command('show', enter('show'))
bot.on('message', (ctx) => ctx.reply('Try /register or /show'))

module.exports = bot