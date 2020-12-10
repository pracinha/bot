export function isArray<T>(x: unknown): x is T[] {
	return Array.isArray(x);
}
