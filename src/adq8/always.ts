/**
 * Always return the same value when called.
 *
 * @alias constant
 */
export function always<T>(x: T) {
	return () => x;
}

export const constant = always;

export default always;
