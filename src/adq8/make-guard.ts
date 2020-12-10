export function makeGuard<T>(fn: any) {
	return (x: T): x is T => fn(x);
}
