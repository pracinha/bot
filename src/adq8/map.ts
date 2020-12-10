import {Functor} from './typeclass/functor';

export function map<A, B>(transformer: (f: A) => B) {
	return (mappable: Functor<A>) => mappable.map(transformer);
}
