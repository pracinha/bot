export function last<T>(xs: Array<T>): T {
	return [...xs].reverse()[0];
}
