export const uncons = <A>(xs: Array<A>) => {
	const [head, ...tail] = xs;
	return [head, tail] as [A, A[]];
};
