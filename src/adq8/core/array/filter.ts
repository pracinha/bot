import {F} from 'ts-toolbelt';

/**
 * filter :: (a, b, [a] -> Bool) -> [a] -> [a]
 *
 * Takes a predicate and returns a new array with all the elements that
 * satisfy the predicate.
 *
 * The predicate will be passed directly to Array.prototype.filter, so the
 * signature is the same as the native filter method, but in a point-free
 * style.
 *
 */
export function filter<T>(predicate: F.Function<[T, number, T[]], boolean>) {
	return function filter(xs: T[]): T[] {
		return xs.filter(predicate);
	};
}

/**
 * accept :: (a, b, [a] -> Bool) -> [a] -> [a]
 *
 * @see filter
 */
export const accept = filter;

/**
 * reject :: (a, b, [a] -> Bool) -> [a] -> [a]
 *
 * Takes a predicate and returns a new array with all the elements that
 * do not satisfy the predicate.
 *
 */
export function reject<T>(predicate: F.Function<[T, number, T[]], boolean>) {
	return function reject(xs: T[]): T[] {
		return xs.filter((x, i, xs) => !predicate(x, i, xs));
	};
}
