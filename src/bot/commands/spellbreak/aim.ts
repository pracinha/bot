import {Command} from '@bot/helpers/commands';

const commentUrl =
	'https://www.reddit.com/r/Spellbreak/comments/g2j431/aim_assist_settings/fnoy9rm/?utm_source=reddit&utm_medium=web2x&context=3';

export const command: Command = {
	name: 'aim',
	aliases: [],
	description:
		'Send the link to the comment explaining aim settings at reddit',
	handler: async message => {
		message.channel.send(commentUrl);
	},
};
