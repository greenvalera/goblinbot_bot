const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const TelegramBotKey = "669147388:AAEBqB7u5ilj6ueZyKwFpBYIuRWY9a6DbpA";
const registerScene = require('./scenes/register')
const showScene = require('./scenes/show')

 const db = require('../db/models/index')
 const Event = db.event;
// Event.findOrCreate({where: {type: 'draft'}, defaults: {type: 'draft', date: new Date()}});

const { enter } = Stage

const bot = new Telegraf(TelegramBotKey)
const stage = new Stage([registerScene, showScene], { ttl: 10 })
bot.use(session())
bot.use(stage.middleware())
//bot.command('register', enter('register'))
//bot.command('show', enter('show'))
//bot.on('message', (ctx) => ctx.reply('Try /register or /show'));
bot.on('inline_query', async ({inlineQuery, answerInlineQuery}) => {

    const eventsResult = await Event.findAll();
    const events = eventsResult
        .map(model => model.dataValues)
        .map(event => ({
                type: 'article',
                id: event.id,
                title: event.type,
                description: 'Список учасников',
                query: 'Asdasdasd',
                thumb_url: 'https://mythicspoiler.com/tbd/cards/elspethsunsnemesis1.jpg',
                input_message_content: {
                    message_text: 'input_message_content'
                },
            reply_markup: Markup.inlineKeyboard([
                Markup.callbackButton('Список учасников', 'list'),
                Markup.callbackButton('Зарегаться', 'reg')
            ]),
        }));

    console.log(events);

    return answerInlineQuery(events)
});

bot.on('chosen_inline_result', ctx => {
    console.log(ctx.chosenInlineResult)
})

bot.action('list', async (ctx) => {
    await ctx.answerCbQuery('Yeeeee')
    await ctx.editMessageText('Yeeeeee')
});

module.exports = bot