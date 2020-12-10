export function mapArray<A, B>(fn: (a: A) => B) {
	return function mapArray(xs: Array<A>): Array<B> {
		return xs.map(fn) as Array<B>;
	};
}
