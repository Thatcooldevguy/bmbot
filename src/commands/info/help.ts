import { Client, Command, RunArgumentsOptions } from '../../util'
import { MessageEmbed } from 'discord.js';
import { CommandStore } from '../../util/stores/CommandStore';

export default class HelpCommand extends Command {
  constructor(client: Client) {
    super(client, {
      arguments: [{
        all: true,
        name: 'resource',
        type: 'Command | Category',
      }],
    });
  }

  public main({ msg, args }: RunArgumentsOptions) {
    const embed = new MessageEmbed()
        .setTitle(`${this.client.user.username}'s Commands`)
        .setColor(`#${process.env.DEFAULTCOLOR}`);
    
    if(args.length === 0) {
        let categories: any = {};
        //Separate by category
        for(let cmd of this.client.commands.map(cmd => cmd)) {
            if(cmd.disabled || cmd.hidden) continue;
            if(typeof categories[cmd.category] === 'undefined')
                categories[cmd.category] = [cmd];
            else
                categories[cmd.category].push(cmd);
        }

        for(let categoryName in categories) {
            let category: Array<Command> = categories[categoryName];
            let categoryCommands: string = "";
            for(let cmd of category)
                categoryCommands += `\`${msg.prefix}${cmd.name}\`\n`;
            embed.addField(categoryName, categoryCommands, true);
        }

        embed.setDescription(`Hello, I'm ${this.client.user.username}, a bot built to serve the the **Blackmagic Design Community Discord Server**`);
    } else {
        let cmd = this.client.commands.get(args[0]);
        if(typeof cmd === 'undefined')
            return msg.send(`Command named ${args[0]} not found.`);

        if(cmd.help)
            embed.setDescription(cmd.help);
        embed.addField('Command', `${cmd.name} (${cmd.category})`, true);

        if(cmd.guildOnly)
            embed.addField('Guild Only', 'Yes', true);
        if(cmd.arguments.length !== 0)
            embed.addField('Arguments', cmd.arguments.map(a => `${a.name} ${a.type} ${a.required ? '(required)' : ''}\n`));
        if(cmd.requiredPermissions.length !== 0)
            embed.addField('Required Permissions', `\`${cmd.requiredPermissions.join('`, `')}\``, false)
    }

    msg.send(embed);
  }
}