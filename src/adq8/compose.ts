import {F} from 'ts-toolbelt';
import {last} from './core/array/last';

export function compose<Fns extends Array<F.Function>>(
	...fns: F.Composer<Fns>
): F.Composed<Fns> {
	const lastFn = last(fns);
	const composedFns = fns.reverse();
	return function (...fnArgs) {
		return composedFns.slice(1).reduce((arg, f) => {
			return f(arg);
		}, lastFn.apply(null, fnArgs));
	};
}

export default compose;
