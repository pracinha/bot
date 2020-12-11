import {config} from 'dotenv';
import {existsSync as fileExists} from 'fs';
import {resolve} from 'path';
import {printDebug} from './logger';

export const BOT_APP_ROOT = resolve(__dirname, '../');

export const DEFAULT_COMMANDS_FOLDER = resolve(BOT_APP_ROOT, './commands');

export const CACHE_ROOT = resolve(BOT_APP_ROOT, './data/cache');

printDebug(`BOT APP ROOT: ${BOT_APP_ROOT}`);
printDebug(`CACHE ROOT: ${CACHE_ROOT}`);
printDebug(`COMMANDS FOLDER ${DEFAULT_COMMANDS_FOLDER}`);

const ENV_FILE_NAME =
	process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
const ENV_FILE = resolve(BOT_APP_ROOT, `./${ENV_FILE_NAME}`);

printDebug(`Looking for ${ENV_FILE}`);

if (fileExists(ENV_FILE)) {
	printDebug(`Using ENV_FILE: ${ENV_FILE}`);
	config({
		path: ENV_FILE,
	});
}

if (!process.env.PRACINHA_DISCORD_TOKEN) {
	throw new Error(
		'You need a PRACINHA_DISCORD_TOKEN environment variable. Aborting…'
	);
}

export const BOT_TOKEN: string = process.env.PRACINHA_DISCORD_TOKEN;

export const BOT_MESSAGE_TRACKER = '‎';

export const BOT_PREFIX = '!';

export const ENVIRONMENT = process.env.NODE_ENV || 'development';
