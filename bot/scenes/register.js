const Scene = require('telegraf/scenes/base')
const Markup = require('telegraf/markup')
const db = require('../../db/models/index')
const Event = db.event;
const Entry = db.entry;
const {eventButtons, eventInfo} = require('../templates')

const replyWithEventInfo = async ctx => {
    const event = await Event.findById(ctx.scene.session.eventID);
    const entries = await event.getEntries();
    const answer = eventInfo(event, entries);

    ctx.replyWithMarkdown(answer)
};

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
    ctx.scene.session.playerName = `${player.first_name}_${player.last_name}`
    ctx.reply(
      `Ты хочешь зарегаться на ${ctx.scene.session.eventID}\n под именем ${ctx.scene.session.playerName}?`,
       Markup.inlineKeyboard([
        Markup.callbackButton('➡️ Отменить', 'cancel'),
        Markup.callbackButton('➡️ Подтвердить', 'register')
    ]).oneTime()
    .resize()
    .extra())
  })

registerScene.action('register', async ctx => {
  try {
    const result = await Entry.findOrCreate({
        where: {
            name: ctx.scene.session.playerName,
            eventID: ctx.scene.session.eventID
        }
    }); 

    const entry = result[0];
    const isCrated = result[1];

    if (!isCrated) {

        //TODO: rewrite with joins
        ctx.reply(`Вы уже зареганы на данный ивент`)
        replyWithEventInfo(ctx).then(() => {
            ctx.scene.leave();
          });
        return;
      }

  } catch (error) {
    ctx.reply(`Что то пошло по пизде`)
    console.log(error);
    ctx.scene.leave();
    return;
  }
  
  ctx.reply(`${ctx.scene.session.playerName}! Ты успешно зарегался на ивент`)
  replyWithEventInfo(ctx).then(() => {
    ctx.scene.leave();
  });
});

registerScene.action('cancel', ctx => {
    ctx.reply(`Охрана! Отмена!`)
    ctx.scene.leave();
  });

module.exports = registerScene;