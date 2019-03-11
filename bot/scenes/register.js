const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const db = require('../../db/models/index')
const Event = db.event;
const {eventButtons} = require('../templates')

const registerScene = new Scene('register');
registerScene.leave((ctx) => ctx.reply('Bye'))

registerScene.enter(
  async ctx => {
    const events = await Event.findAll();
    const buttons = eventButtons(events);
    ctx.reply(
      'Шаг 1. Выберете ивент, на который хотите зарегистрироваться:',
       Markup.keyboard(buttons).oneTime()
        .resize()
        .extra())
   })

registerScene.hears(/^#(\d)\s(\w+)\s.+/, (ctx) => {
    ctx.scene.session.eventID = ctx.match[1];
    const player = ctx.message.from;
    ctx.scene.session.playerName = `${player.first_name} ${player.last_name}`
    ctx.reply(
      `Ты хочешь зарегаться на ${ctx.scene.session.eventID}\n под именем ${ctx.scene.session.playerName}?`,
       Markup.inlineKeyboard([
        Markup.callbackButton('➡️ Подтвердить', 'register'),
        Markup.callbackButton('➡️ Отменить', 'cancel')
    ]).oneTime()
    .resize()
    .extra())
  })

registerScene.action('register', ctx => {
  ctx.reply(`${ctx.scene.session.playerName}! Ты успешно зарегался на ивент ${ctx.scene.session.eventID}`)
  ctx.scene.leave();
});

registerScene.action('cancel', ctx => {
    ctx.reply(`Охрана! Отмена!`)
    ctx.scene.leave();
  });

module.exports = registerScene;