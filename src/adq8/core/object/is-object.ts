export function isObject<T>(obj: T): boolean {
	return obj !== null && typeof obj === 'object';
}
export default isObject;
