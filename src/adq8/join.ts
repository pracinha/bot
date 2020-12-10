import {Functor} from './typeclass/functor';

export const join = () => <A>(joinable: Functor<A>) => {
	return joinable.join();
};
