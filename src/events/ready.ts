import { Collection, Message, TextChannel } from 'discord.js';
import { Client, Event } from '../util';

export let roleList: any = {};

const emojiRgx = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;

export default class ReadyEvent extends Event {
  constructor(client: Client) {
    super(client, {
      disabled: false,
    });
  }

  async main(): Promise<any> {
    const channel: TextChannel = (await this.client.channels.fetch(process.env.ROLES_CHANNEL)) as TextChannel;
    const messages: Collection<string, Message> = await channel.messages.fetch();
    messages.forEach((m) => {
      roleList[m.id] = {};

      const content = m.content.split('\n');
      content.forEach((a) => {
        const emojis = a.match(emojiRgx);
        if (!emojis) return;
        const role = m.guild.roles.cache.find((r) => r.name === a.substring(a.indexOf(' ') + 1).trim());
        if (!role) return;
        roleList[m.id][a.substring(0, a.indexOf(' '))] = role.id;
      });

      // sync
    });

    this.client.logger.log(`Hello, I'm ${this.client.user.username}, and I'm ready to rock and roll!`);
    return;
  }
}
