import {Head} from 'List/Head';
import {F} from 'ts-toolbelt';

export function makeUnary<Fn extends F.Function>(fn: Fn) {
	return (value: Head<F.Parameters<Fn>>): F.Return<Fn> => fn(value);
}
