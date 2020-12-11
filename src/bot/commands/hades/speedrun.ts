import {MINUTE_IN_MS, SECOND_IN_MS} from '@bot/constants';
import {getCache} from '@bot/helpers/cache';
import {Command} from '@bot/helpers/commands';
import compose from 'adq8/compose';
import first from 'adq8/core/array/first';
import {zipWith} from 'adq8/core/array/zip';
import {getTime} from 'adq8/core/date/get-time';
import {divideBy} from 'adq8/core/number/divide';
import {getProp} from 'adq8/core/object/get-prop';
import got from 'got';

const speedrunCache = getCache('speedrun');

const speedrunUrl =
	'https://www.speedrun.com/api/v1/leaderboards/o1y9okr6/category/zd3xmmvd?embed=players&top=3&var-0nwork5l=013768dl';

const cacheExpirationTime = 5 * MINUTE_IN_MS;

const makeUrlKey = (str: string) => str.split('.').join('_');
const getData = async (url: string) => {
	const urlKey = makeUrlKey(url);
	const speedrunCacheResults = speedrunCache.get(urlKey).value();
	const {updatedAt, result: cacheResult} = speedrunCacheResults;
	const now = getTime();
	if (updatedAt + cacheExpirationTime > now) {
		return {result: cacheResult, updatedAt};
	}
	// If cache is invalid
	const result = await fetchData(url);
	speedrunCache.set(urlKey, {result, updatedAt: now}).write();
	return {result, updatedAt: now};
};

const fetchData = async (url: string) => {
	return await got.get(url).json<SpeedrunComResponse>();
};

export type SpeedrunComRun = {
	id: string;
	weblink: string;
	run: {
		players: SpeedrunComPlayer[];
		times: string[];
	};
};

export type SpeedrunComPlayer = {
	id: string;
	names: {
		international: string;
	};
	location: {
		country: {
			code: string;
		};
	};
};
export type SpeedrunComResponse = {
	data: {
		runs: SpeedrunComRun[];
	};
};

export type DataWrapped<A> = {
	data: A;
};

const getRuns = compose(
	getProp<SpeedrunComRun[]>('runs'),
	getProp<SpeedrunComResponse>('data')
);

const getPlayers = compose(
	getProp<SpeedrunComPlayer[]>('data'),
	getProp<DataWrapped<SpeedrunComPlayer[]>>('players'),
	getProp<SpeedrunComResponse>('data')
);
async function getLatestTimes() {
	const {result: data} = await getData(speedrunUrl);
	const allPlayers = getPlayers(data);
	const top3runs = getRuns(data);
	const times = top3runs.map(
		compose(
			formatTime,
			getProp('ingame_t'),
			getProp('times'),
			getProp('run')
		)
	);
	const playerRuns = top3runs.map(x => {
		const player = allPlayers.find(p => p.id === first(x.run.players).id);
		if (!player) {
			return 'N/A';
		}
		return player.names.international;
	});
	return zipWith(player => time => `${player} - ${time}`)(playerRuns)(times);
}

const secondsToMinutes = compose(Math.floor, divideBy(60));
const missingSecondsToMinutes = (totalSeconds: number) =>
	totalSeconds - secondsToMinutes(totalSeconds) * 60;
const formatTime = (time: number) => {
	const minutes = secondsToMinutes(time);
	const seconds = missingSecondsToMinutes(time);
	return `${minutes}m${seconds}s`;
};

export const command: Command = {
	name: 'speedrun',
	aliases: [],
	description: 'Show the latest speedrun times for Hades',
	handler: async message => {
		const times = await getLatestTimes();
		message.channel.send(
			`The latest Top #3 Speedrun times for Hades are:\n${times.join(
				'\n'
			)}`
		);
		message.channel.send(
			`See more in <https://www.speedrun.com/hades#Any_Heat>`
		);
	},
};
