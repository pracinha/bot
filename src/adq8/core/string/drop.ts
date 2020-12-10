export function drop(n: number) {
	return function drop(str: string) {
		return str.slice(n);
	};
}

export default drop;
