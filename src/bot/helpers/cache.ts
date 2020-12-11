import compose from 'adq8/compose';
import {makeUnary} from 'adq8/core/functions/arity';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import {CACHE_ROOT} from './env';

const getCacheFileAdapter = (name: string) => {
	return new FileSync(`${CACHE_ROOT}/${name}.json`);
};

export const getCache = compose(makeUnary(low), getCacheFileAdapter);
