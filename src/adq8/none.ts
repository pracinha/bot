import {Predicate} from './types';
export function none<A>(fns: Array<Predicate<A>>) {
	return (x: A) => fns.every(f => !f(x));
}

export default none;
