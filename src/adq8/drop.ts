import {isArray} from './_helpers/is-array';
import {drop as stringDrop} from './core/string/drop';
import {drop as arrayDrop} from './core/array/drop';
import {isString} from './_helpers/is-string';
import {A as Any} from 'ts-toolbelt';

export function drop(n: number) {
	return function drop<A>(xs: A): A {
		if (isString(xs)) {
			return (stringDrop(n)(xs) as unknown) as A;
		}
		if (isArray(xs)) {
			(arrayDrop(n)(xs) as unknown) as A;
		}
		throw new Error(`drop takes either a string or an array`);
	};
}
