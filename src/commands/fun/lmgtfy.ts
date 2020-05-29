import fetch from 'node-fetch';
import { Client, Command, RunArgumentsOptions } from '../../util';

export default class ComplimentCommand extends Command {
  constructor(client: Client) {
    super(client, {
      aliases: ['google'],
      help: 'Someone asking a question they could simply google?',
      deletable: true,
    });
  }

  public async main({ msg, args }: RunArgumentsOptions) {
    const uri =  args.map(encodeURIComponent).join("+")
    msg.channel.send(`We're happy to help you on questions that are not easy to google. But you can literally google your message.\nhttps://lmgtfy.com/?q=${uri}`);
  }
}