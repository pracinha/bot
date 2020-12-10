export const join = (joiner: string) =>
	function join<A>(xs: Array<A>) {
		return xs.join(joiner);
	};
