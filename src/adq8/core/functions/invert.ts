import {F, List} from 'ts-toolbelt';

export function invert(fn: F.Function) {
	return (...args: any[]) => {
		const result = fn.apply(null, args);
		return !result;
	};
}
