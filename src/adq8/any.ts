import {Predicate} from './types';
export function any<A>(fns: Array<Predicate<A>>) {
	return (x: A) => fns.some(f => f(x));
}

export default any;
