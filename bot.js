// const Telegraf = require('telegraf')
const db = require('./db/models/index')
const Event = db.event;
const TelegramBotKey = "669147388:AAEBqB7u5ilj6ueZyKwFpBYIuRWY9a6DbpA";
const {eventsListTemplate, eventButtons, eventTemplate} = require('./templates')

// //Event.findOrCreate({where: {type: 'showdown'}, defaults: {type: 'showdown', date: new Date()}});

// const bot = new Telegraf(TelegramBotKey)
// bot.start((ctx) => ctx.reply('Welcome!'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('events', (ctx) => {
//     Event.findAll().then(events => ctx.reply(eventsListTemplate(events)))
// })
// bot.launch()


const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')

const stepHandlerPart2 = new Composer()
stepHandlerPart2.hears(/^#(\d)\s(\w+)\s.+/, (ctx) => {
  console.log(ctx.message)
  const eventID = ctx.match[1];
  const player = ctx.message.from;
  const playerName = `${player.first_name} ${player.last_name}`
  ctx.reply(`Ты хочешь зарегаться на ${eventID}\n под именем ${playerName}?`)
  ctx.reply('Step 1', Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('➡️ Next', 'next')
  ]).extra())
})

//stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'))

const superWizard = new WizardScene('super-wizard',
  (ctx) => {
    Event.findAll().then(events => {
        const buttons = eventButtons(events);
        ctx.reply(
          'Шаг 1. Выберете ивент, на который хотите зарегистрироваться:',
          Markup.keyboard(buttons).oneTime()
            .resize()
            .extra())
    })
    return ctx.wizard.next()
  },
  stepHandlerPart2,
  (ctx) => {
    ctx.reply('Done')
    return ctx.scene.leave()
  }
)

const bot = new Telegraf(TelegramBotKey)
const stage = new Stage([superWizard], { default: 'super-wizard' })
bot.use(session())
bot.use(stage.middleware())
bot.launch()