import {NonEmptyArray} from '../types';
import {F} from 'ts-toolbelt';
import {invert} from '../core/functions/invert';

export const isUnary = (fn: F.Function) => {
	return fn.length === 1;
};

export const areAllUnary = <T extends F.Function>(
	xs: NonEmptyArray<T>
): boolean => {
	return xs.every(isUnary);
};
export const throwIfNotUnary = (message: string) => (
	fns: NonEmptyArray<F.Function>
): void => {
	const nonUnary = fns.filter(invert(isUnary));
	if (!areAllUnary(fns)) throw new Error(message);
};
