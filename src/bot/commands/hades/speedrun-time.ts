import {MINUTE_IN_MS} from '@bot/constants';
import {getCache} from '@bot/helpers/cache';
import {Command} from '@bot/helpers/commands';

const speedrunCache = getCache('speedrun');

const cacheExpirationTime = 5 * MINUTE_IN_MS;

const speedrunUrl =
	'https://www.speedrun.com/api/v1/leaderboards/o1y9okr6/category/zd3xmmvd?embed=players&top=3&var-0nwork5l=013768dl';

const makeUrlKey = (str: string) => str.split('.').join('_');
const getData = (url: string) => {
	const urlKey = makeUrlKey(url);
	const speedrunCacheResults = speedrunCache.get(urlKey).value();
	const {updatedAt} = speedrunCacheResults;
	return updatedAt;
};

export const command: Command = {
	name: 'speedruntime',
	aliases: ['srt'],
	description: 'Show when the speedrun leaderboard where last updated',
	handler: async message => {
		const updatedAt = getData(speedrunUrl);
		message.channel.send(`Times updated at ${new Date(updatedAt)}`);
	},
};
