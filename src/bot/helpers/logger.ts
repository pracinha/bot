import {Signale} from 'signale';

export const logger = new Signale({
	scope: 'bot',
	config: {
		displayTimestamp: true,
		displayFilename: false,
	},
});

export const formatWarn = (format: string) => (...values: string[]) =>
	logger.warn.apply(null, [format, ...values]);
export const printWarn = formatWarn('%s');
export const formatInfo = (format: string) => (...values: string[]) =>
	logger.info.apply(null, [format, ...values]);
export const printInfo = formatInfo('%s');
