export function first<T>(from: Array<T>): T {
	return from[0];
}

export default first;

export const head = first;
