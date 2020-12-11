import signale, {Signale} from 'signale';

export const logger = new Signale({
	scope: 'bot',
	config: {
		displayTimestamp: true,
		displayFilename: false,
	},
});

const makeSignaleFormatter = (formatter: signale.LoggerFunc) => {
	return (format: string) => (...values: string[]) =>
		formatter.apply(null, [format, ...values]);
};

export const formatWarn = makeSignaleFormatter(logger.warn);
export const printWarn = formatWarn('%s');
export const formatDebug = makeSignaleFormatter(logger.debug);
export const printDebug = formatDebug('%s');
export const formatInfo = makeSignaleFormatter(logger.info);
export const printInfo = formatInfo('%s');
