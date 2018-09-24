const Command = require('../../../structures/Command.js');


module.exports = class Log extends Command {
	constructor(Atlas) {
		super(Atlas, module.exports.info);
	}

	async action(msg, args, { // eslint-disable-line no-unused-vars
		settings, // eslint-disable-line no-unused-vars
	}) {
		const responder = new this.Atlas.structs.Responder(msg);

		if (!args[0]) {
			await settings.update({
				'plugins.moderation.logs.action': null,
			});

			return responder.text('log.actions.disabled').send();
		}

		const query = args.join(' ');

		const channel = (new this.Atlas.structs.Fuzzy(msg.guild.channels, {
			keys: ['name', 'id', 'mention'],
		})).search(query);

		if (!channel) {
			return responder.error('log.actions.noResults', query).send();
		}

		await settings.update({
			'plugins.moderation.logs.action': channel.id,
		});

		return responder.text('log.actions.success', channel.mention).send();
	}
};

module.exports.info = {
	name: 'actions',
	usage: 'info.log.actions.usage',
	description: 'info.log.actions.description',
	guildOnly: true,
	requirements: {
		permissions: {
			user: {
				manageGuild: true,
			},
			bot: {
				manageWebhooks: true,
			},
		},
	},
};