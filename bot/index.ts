import { Client, Message } from 'discord.js';

// const mapping = {
//   ping: (msg: Message) => msg.reply('pong'),
// };

const bot = new Client();
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
});

bot.on('message', (msg: Message) => {
  if (msg.system) {
    /* Don't react to any system messages */
    console.log('Ignoring system message.');
    return;
  }
  if (msg.author.bot) {
    /* Don't react to any bot messages */
    console.log('Ignoring bot message.');
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

  // dynamic messages
  const githubRegex = /github\.com\/(.*?)\/(.*)/;
  const regexMatch = msg.content.match(githubRegex);
  if (regexMatch) {
    console.log('matched');
    const [_, username, repository] = regexMatch;
    msg.reply(`Repository: ${repository}, Owned by ${username}`);
  }
});

bot.on('error', (err: Error) => {
  console.error(err);
});

bot.login(process.env.DISCORD_BOT_TOKEN);
