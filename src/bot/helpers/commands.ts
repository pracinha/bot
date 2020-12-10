import all from 'adq8/all';
import compose from 'adq8/compose';
import {reject} from 'adq8/core/array/filter';
import {join} from 'adq8/core/array/join';
import {mapArray} from 'adq8/core/array/map';
import {makeUnary} from 'adq8/core/functions/arity';
import {getProp} from 'adq8/core/object/get-prop';
import {hasProp} from 'adq8/core/object/has-prop';
import {isObject} from 'adq8/core/object/is-object';
import endsWith from 'adq8/core/string/ends-with';
import startsWith from 'adq8/core/string/starts-with';
import {traceWith} from 'adq8/_helpers/trace';
import {Message} from 'discord.js';
import {sync as globby} from 'globby';
import {basename} from 'path';
import {F} from 'ts-toolbelt';
import {DISABLED_COMMAND_PREFIX, DTS_EXTENSION} from '../constants';
import {BOT_PREFIX} from '../env';
import {formatInfo} from './logger';

const readFolder = () =>
	function readFolder(path: string) {
		try {
			return globby(path);
		} catch (_) {
			return [];
		}
	};

const isFileDisabled = (disabledPrefix: string) =>
	compose(startsWith(disabledPrefix), makeUnary(basename));

export type Command = {
	name: string;
	description: string;
	aliases: string[];
	handler: F.Function<[Message, string, string[]], unknown>;
};

export const noop = (_: Message) => {};

export type CommandDefinition = {
	command: Command;
	args: string[];
	message: Message;
};

/**
 * loadFromDisk :: PathLike -> [Command]
 *
 * Load commands from any location on the disk.
 *
 */
export const loadFromDisk = compose(
	traceWith(
		compose(
			formatInfo('Loaded Command: %s'),
			join(', '),
			mapArray<Command, string>(getProp('name'))
		)
	),
	mapArray(compose(getProp<Command>('command'), require)),
	reject(isFileDisabled(DISABLED_COMMAND_PREFIX)),
	reject(endsWith(DTS_EXTENSION)),
	readFolder()
);

export const isMessageCommand = compose(
	startsWith(BOT_PREFIX),
	getProp('content')
);

export const isCommand = all<Command | string>([
	isObject,
	hasProp('name'),
	hasProp('handler'),
]);
