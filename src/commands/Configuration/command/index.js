const Command = require('../../../structures/Command.js');
// const util = require('util');

module.exports = class CommandManager extends Command {
	constructor(Atlas) {
		super(Atlas, module.exports.info);
	}

	action(msg, args, { // eslint-disable-line no-unused-vars
		settings, // eslint-disable-line no-unused-vars
	}) {
		const responder = new this.Atlas.structs.Responder(msg);

		responder.embed(this.helpEmbed(msg)).send();
	}
};

module.exports.info = {
	name: 'command',
	description: 'info.command.base.description',
	guildOnly: true,
	aliases: [
		'cmd',
		'ccmd',
		'customcommand',
		'customcmd',
		'ccommand',
		'custom_command',
		'cc',
	],
	requirements: {
		permissions: {
			user: {
				manageGuild: true,
			},
		},
	},
};