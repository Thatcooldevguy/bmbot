import { Client, Command, RunArgumentsOptions, Tag } from '../../util';

export default class CreateTagCommand extends Command {
  constructor(client: Client) {
    super(client, {
      help: 'Creates a new tag',
      aliases: ['dtag', 'remtag', 'removetag'],
      ownerOnly: true,
      arguments: [{ name: 'name', type: 'string', required: true }],
    });
  }

  public async main({ msg, args }: RunArgumentsOptions) {
    const tag = new Tag(args[0]);
    tag.reply = args[1];
    try {
      await this.client.database.tags.deleteTag(tag);
      msg.channel.send(`Tag \`${tag.name}\` deleted.`);
    } catch (err) {
      msg.channel.send(`:x: ${err}`);
    }
  }
}
