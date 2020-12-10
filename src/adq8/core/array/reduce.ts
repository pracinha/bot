export function reduce<A, B>(reducerFn: (acc: B, element: A) => B) {
	return function reduce(initialValue: B) {
		return function reduce(xs: A[]) {
			return xs.reduce((acc, elem) => reducerFn(acc, elem), initialValue);
		};
	};
}

export default reduce;
