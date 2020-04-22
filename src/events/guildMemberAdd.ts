import { Event, Client } from '../util'
import { GuildMember, TextChannel, Message, MessageEmbed } from 'discord.js';

export default class MemberAddEvent extends Event {
  constructor(client: Client) {
    super(client, {
      disabled: false,
    });
  }

  main(member: GuildMember): any {
    try
    {
      const channel: TextChannel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL) as TextChannel;
      channel.send('hello this is a welcome message by `Grant the bot`:tm:').then(m => m.delete({timeout: 5 * 60 * 1000, reason: 'Automatic removal of welcome message.' }));

      let embed: MessageEmbed = new MessageEmbed()
      .setColor(`#${process.env.DEFAULTCOLOR}`)
      .setTitle('Channels Overview')
      .setDescription('See what each channel is for below:');

      const channels: TextChannel[] = member.guild.channels.cache.filter(e => e.type === 'text').array() as TextChannel[];
      for(let channel of channels) {
        if(channel.members.has(member.id))
          embed.addField(channel.name, channel.topic, true);
      }

      member.send(embed);
    } catch (err) {
      this.client.logger.log(`Failed on ${member.user.tag} (${member.id} join: ${err}`);
    }

    return;
  }
}