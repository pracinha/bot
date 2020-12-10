export function subtract(x: number) {
	return function subtract(y: number) {
		return x - y;
	};
}

export const remove = subtract;
export const minus = subtract;

export default subtract;
