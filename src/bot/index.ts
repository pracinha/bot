import {always} from 'adq8/always';
import compose from 'adq8/compose';
import {reduce} from 'adq8/core/array/reduce';
import drop from 'adq8/core/string/drop';
import {guard} from 'adq8/guard';
import Discord from 'discord.js';
import {BOT_TOKEN} from './helpers/env';
import {Command, loadFromDisk} from './helpers/commands';
import {DEFAULT_COMMANDS_FOLDER} from './helpers/env';
import {getEventListeners} from './helpers/events';
import {formatWarn, printInfo} from './helpers/logger';

const client = new Discord.Client();

const {whenReady, onCommand} = getEventListeners(client);

const addCommandToMap = (
	currentMap: Map<string, Command>,
	currentCommand: Command
) => {
	currentCommand.aliases.forEach(alias =>
		currentMap.set(alias, currentCommand)
	);
	return currentMap.set(currentCommand.name, currentCommand);
};

const commands = compose(
	reduce(addCommandToMap)(new Map<string, Command>()),
	loadFromDisk
)(DEFAULT_COMMANDS_FOLDER);

const getFromMap = <A, B>(map: Map<A, B>) => {
	return (key: A): B => map.get(key) as B;
};

const mapHas = <A, B>(map: Map<A, B>) => {
	return (key: A) => map.has(key);
};

const getCommandFromMap = compose(getFromMap(commands), drop(1));

const noopCommand: Command = {
	name: 'noop',
	aliases: [],
	description: 'Command used when no operation should be performerd',
	handler: (message, commandTrigger, commandArgs) => {
		formatWarn(`%s is not a command`)(commandTrigger);
		formatWarn(`Arguments: %s`)(commandArgs.join(', '));
	},
};

onCommand.subscribe(x => {
	const [commandTrigger, ...args] = x.content.split(' ');
	const runCommand = guard<string, Command>([
		[compose(mapHas(commands), drop(1)), getCommandFromMap],
	])(always(noopCommand))(commandTrigger);
	runCommand.handler(x, commandTrigger, args);
});

whenReady.subscribe(() => {
	printInfo('Pracinha is Ready…');
});

client.login(BOT_TOKEN);
