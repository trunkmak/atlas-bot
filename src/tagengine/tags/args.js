const TagError = require('../TagError');

module.exports = async ({ msg }, [i, r = '1']) => {
	let args;
	if (msg.args) {
		// should already be there for commands
		({ args } = msg);
	} else {
		args = msg.content.split(/ +/g);
	}

	if (!i) {
		return args.join(' ');
	}

	const index = this.Atlas.lib.utils.parseNumber(i) - 1;
	if (isNaN(index)) {
		throw new TagError('Expected "index" to be a finite number.');
	}

	const range = this.Atlas.lib.utils.parseNumber(r);
	if (isNaN(range)) {
		throw new TagError('Expected "range" to be a finite number.');
	}

	return args.slice(index, range).join(' ');
};

module.exports.info = {
	name: 'args',
	args: '<index> <range=1>',
	description: 'Returns a random argument.',
	examples: [{
		input: '{args;1}',
		output: 'arg1',
		note: 'Input would be "a!actionlabel arg1 arg2".',
	}, {
		input: '{args;2}',
		output: 'arg2',
		note: 'Input would be "a!actionlabel arg1 arg2".',
	}, {
		input: '{args}',
		output: 'arg1 arg2',
		note: 'Input would be "a!actionlabel arg1 arg2".',
	}, {
		input: '{args;2;2}',
		output: 'arg2 arg3',
		note: 'Input would be "a!actionlabel arg1 arg2 arg3 arg4',
	}],
	dependencies: ['msg'],
};
