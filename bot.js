const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const db = require('./db/models/index')
const Event = db.event;
const TelegramBotKey = "669147388:AAEBqB7u5ilj6ueZyKwFpBYIuRWY9a6DbpA";
const {eventsListTemplate, eventButtons, eventTemplate} = require('./templates')

//Event.findOrCreate({where: {type: 'showdown'}, defaults: {type: 'showdown', date: new Date()}});

const { enter, leave } = Stage

const eventListScene = new Scene('register');
eventListScene.leave((ctx) => ctx.reply('Bye'))

eventListScene.enter(
  async ctx => {
    const events = await Event.findAll();
    const buttons = eventButtons(events);
    ctx.reply(
      'Шаг 1. Выберете ивент, на который хотите зарегистрироваться:',
       Markup.keyboard(buttons).oneTime()
        .resize()
        .extra())
   })

eventListScene.hears(/^#(\d)\s(\w+)\s.+/, (ctx) => {
    ctx.scene.session.eventID = ctx.match[1];
    const player = ctx.message.from;
    ctx.scene.session.playerName = `${player.first_name} ${player.last_name}`
    ctx.reply(
      `Ты хочешь зарегаться на ${ctx.scene.session.eventID}\n под именем ${ctx.scene.session.playerName}?`,
       Markup.inlineKeyboard([
        Markup.callbackButton('➡️ Подтвердить', 'register')
    ]).oneTime()
    .resize()
    .extra())
  })

eventListScene.action('register', ctx => {
  ctx.reply(`${ctx.scene.session.playerName}! Ты успешно зарегался на ивент ${ctx.scene.session.eventID}`)
  ctx.scene.leave();
});  

const bot = new Telegraf(TelegramBotKey)
const stage = new Stage([eventListScene], { ttl: 10 })
bot.use(session())
bot.use(stage.middleware())
bot.command('register', enter('register'))
bot.on('message', (ctx) => ctx.reply('Try /register'))
bot.launch()