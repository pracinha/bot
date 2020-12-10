import {F} from 'ts-toolbelt';
import {first} from './core/array/first';

export function pipe<Fns extends Array<F.Function>>(
	...fns: F.Piper<Fns>
): F.Piped<Fns> {
	const firstFn = first(fns);
	return function (...fnArgs) {
		return fns.slice(1).reduce((arg, f) => {
			return f(arg);
		}, firstFn.apply(null, fnArgs));
	};
}

export default pipe;
