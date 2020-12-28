import {F} from 'ts-toolbelt';
import {always} from './always';
import {Predicate} from './types';

/**
 * guard :: [[(a -> boolean), (a -> b)]] -> (a -> b) -> b
 *
 * Like when, but for multiple conditions. Takes a list of tuples where the
 * first element is the predicate that must be fulfilled and the second is the
 * expression to run against the supplied value.
 *
 * Think about it like this: when first is true, run the second.
 *
 * ```js
 * const myGuard = guard([
 * 		[isString, (x) => x.toUppercase()],
 * 		[isArray, (xs) => xs.map(x => x.toUppercase())]
 * ])(x => `${x} is neither a string nor an array`)
 * myGuard("Hello");
 * //=> 'ello'
 * myGuard([1, 2, 3])
 * //=> [2,3]
 * myGuard({})
 * //=> [object Object] is neither a string nor an array
 * ```
 */
export function guard<A, B>(branches: Array<[Predicate<A>, (x: A) => B]>) {
	return function (fallback: (x: A) => B) {
		return (input: A): B => {
			const [, expr] = [...branches, [always(true), fallback]].find(
				([cond]) => {
					return cond(input);
				}
			);
			return expr(input) as B;
		};
	};
}

export default guard;

export function branches<A, B>(branches: Array<[Predicate<A>, (x: A) => B]>) {
	return (input: A): B => {
		const [, expr] = [...branches].find(([cond]) => {
			return cond(input);
		});
		return expr(input) as B;
	};
}
