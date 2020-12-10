export function divide(y: number) {
	return function divide(x: number) {
		return x / y;
	};
}

export const divBy = divide;
export const divideBy = divide;
export const div = divide;

export default divide;
