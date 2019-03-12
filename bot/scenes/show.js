const Scene = require('telegraf/scenes/base')
const { eventStringMask } = require('../templates')
const { buildShowEventsHandler, replyWithEventInfo } = require('./eventListBase')

const showScene = new Scene('show');
showScene.leave((ctx) => ctx.reply('Bye'))

showScene.enter( buildShowEventsHandler('Выберете ивент'))

showScene.hears(eventStringMask, (ctx) => {
    ctx.scene.session.eventID = parseInt(ctx.match[1]);
    replyWithEventInfo(ctx).then(() => {
      ctx.scene.leave();
    });
  })

module.exports = showScene;