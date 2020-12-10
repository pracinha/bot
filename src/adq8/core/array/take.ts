export function take<T>(n: number) {
	return function take(xs: T[]): T[] {
		return xs.slice(0, n);
	};
}

export default take;
