export function sum(x: number) {
	return function sum(y: number) {
		return x + y;
	};
}

export const add = sum;
export const plus = sum;

export default sum;
