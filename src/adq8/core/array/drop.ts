export function drop(n: number) {
	return function drop<T>(xs: Array<T>) {
		return [...xs].slice(n);
	};
}
