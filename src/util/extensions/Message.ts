import { APIMessage, DMChannel, Structures, TextChannel } from 'discord.js';
import { Client } from '../core/Client';
import { Command } from '../structures/command/Command';

declare module 'discord.js' {
  export interface Message {
    command: Command;
    prefix: string;
    reply(): Promise<Message>;
    setSettings(): Promise<void>;
  }
}

export default Structures.extend('Message', (message) => {
  class Message extends message {
    public prefix: string;
    public command: Command;

    constructor(client: Client, data: any, channel: DMChannel | TextChannel) {
      super(client, data, channel);
    }

    public reply(content?: any, options?: any): Promise<any> {
      return this.channel.send(
        content instanceof APIMessage ? content : APIMessage.transformOptions(content, options, { reply: this.member || this.author })
      );
    }

    public combineContentOptions(content: any, options: any): any {
      if (!options) return Object.prototype.toString.call(content) === '[object Object]' ? content : { content };
      return Object.assign(options, { content });
    }
  }
  return Message;
});
