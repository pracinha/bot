import {F} from 'ts-toolbelt';

/**
 * Use `trace` to log the current value to the console.
 *
 * Example:
 * ```js
 * trace('Name')(varName)
 * // this is the same as `console.log('Name', varName)`
 * ```
 */
export const trace = (id: string) =>
	function trace(message: any) {
		console.log(id, message);
		return message;
	};

export const traceWithMap = <A, B>(map: F.Function<[B], A>) =>
	function traceWithMap(id: string) {
		return function traceWithMap(message: B) {
			console.log(id, map(message));
			return message;
		};
	};

export const traceWith = <A>(fn: (message: A) => unknown) => {
	return function traceWith(message: A): A {
		fn.apply(null, [message]);
		return message;
	};
};
