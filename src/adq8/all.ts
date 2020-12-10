import {Predicate} from './types';
export function all<A>(fns: Array<Predicate<A>>) {
	return (x: A) => fns.every(f => f(x));
}

export default all;
