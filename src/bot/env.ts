import {config} from 'dotenv';
import {existsSync as fileExists} from 'fs';
import {resolve} from 'path';
import {formatInfo, printInfo} from './helpers/logger';

const ENV_FILE_NAME =
	process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
const ENV_FILE = resolve(__dirname, `../${ENV_FILE_NAME}`);
printInfo(`Looking for ${ENV_FILE}`);
if (fileExists(ENV_FILE)) {
	printInfo(`Using ENV_FILE: ${ENV_FILE}`);
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
