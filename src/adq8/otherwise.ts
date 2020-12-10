import {F} from 'ts-toolbelt';

/**
 * Returns a condition compatible with `whenDo` where the first element of the
 * tuple will always evaluate to true, so the `expr` in the second element will
 * always run
 */
export function otherwise(expr: F.Function) {
	return [() => true, expr] as [F.Function<[unknown], boolean>, F.Function];
}
