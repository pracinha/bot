import {Client, GuildMember, Message, MessageReaction, User} from 'discord.js';
import {fromEvent} from 'rxjs';
import {filter} from 'rxjs/operators';
import {makeGuard} from 'adq8/make-guard';
import {isMessageCommand} from './commands';

export const whenReady = (client: Client) => {
	return fromEvent(client, 'ready');
};

export const onMessage = (client: Client) => {
	return fromEvent<Message>(client, 'message');
};

export const whenMemberJoins = (client: Client) => {
	return fromEvent<GuildMember>(client, 'guildMemberAdd');
};

export const onMessageReaction = (client: Client) => {
	return fromEvent<[MessageReaction, User]>(client, 'messageReactionAdd');
};

export const onCommand = (client: Client) => {
	return onMessage(client).pipe<Message>(filter(makeGuard(isMessageCommand)));
};

export const getEventListeners = (client: Client) => {
	return {
		whenReady: whenReady(client),
		onMessage: onMessage(client),
		whenMemberJoins: whenMemberJoins(client),
		onMessageReaction: onMessageReaction(client),
		onCommand: onCommand(client),
	};
};
