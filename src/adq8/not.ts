export function not<A>(fn: (a: A) => boolean) {
	return (x: A) => {
		return fn(x) ? false : true;
	};
}

export const unless = not;
