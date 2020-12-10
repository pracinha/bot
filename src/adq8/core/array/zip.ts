import {F} from 'ts-toolbelt';

export function zip<A, B>(xs: A[]) {
	return function zip(ys: B[]) {
		return xs.map((x, idx) => [x, ys[idx]]);
	};
}

export function zipWith<A extends F.Function<[B], F.Function<[C], D>>, B, C, D>(
	fn: A
) {
	return function zipWith(xs: B[]) {
		return function zipWith(ys: C[]): D[] {
			return xs.map((x, idx) => fn(x)(ys[idx]));
		};
	};
}

export default zip;
