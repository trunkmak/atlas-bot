const TagError = require('../../TagError');
const getUserXPProfile = require('../../../../lib/xputil/getUserXPProfile');

module.exports = async (context, [number]) => {
	number = context.Atlas.lib.utils.parseNumber(number);

	if (isNaN(number)) {
		throw new TagError('Invalid XP number');
	}

	const { next: { level } } = getUserXPProfile(number);

	return level;
};

module.exports.info = {
	name: 'utils.calcNextLevel',
	args: '<number>',
	description: 'Gets the users next level from their XP.',
	examples: [{
		input: '{utils.calcNextLevel;1337}',
		output: '6',
	}],
	dependencies: [],
};
