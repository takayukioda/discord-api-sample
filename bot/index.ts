import { Client, Message } from 'discord.js';

// const mapping = {
//   ping: (msg: Message) => msg.reply('pong'),
// };

const bot = new Client();
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('message', async (msg: Message) => {
  if (msg.system) {
    /* Don't react to any system messages */
    console.log('ignoring system message.');
    return;
  }
  if (msg.author.bot) {
    /* Don't react to any bot messages */
    console.log('ignoring bot message.');
    return;
  }
  // static message to return;
  switch (msg.content) {
    case 'ping':
      msg.reply('pong');
      return;
    case 'what\'s message?':
      msg.reply(JSON.stringify(msg, (k, v) => k ? '' + v : v , 2));
      msg.reply(JSON.stringify(msg.reactions, null, 2));
      msg.reply(JSON.stringify(msg.mentions, (k, v) => k ? '' + v : v , 2));
      return;
    default: break;
  }

  let regexMatch; // stores regex match object
  // dynamic messages
  const githubCommandRegex = /^\?github\s+(.*?)\s+(.*)/;
  regexMatch = msg.content.match(githubCommandRegex);
  if (regexMatch) {
    const [_, command, args] = regexMatch;
    // send message to the channel
    await msg.channel.send(`
Receive a bot command: ?github
command: ${command}
arguments: ${args}
`);
  }

  const alarmCommandRegex = /^\?alarm/;
  regexMatch = msg.content.match(alarmCommandRegex);
  if (regexMatch) {
    // send direct message to the user
    await msg.author.send(`Beep Beep!`);
  }
});

bot.on('error', (err: Error) => {
  console.error(err);
});

bot.login(process.env.DISCORD_BOT_TOKEN);
