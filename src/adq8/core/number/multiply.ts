export function multiply(x: number) {
	return function multiply(y: number) {
		return x * y;
	};
}

export const times = multiply;
export const mult = multiply;

export default multiply;
