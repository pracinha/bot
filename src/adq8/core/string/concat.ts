export function concat(strA: string) {
	return function concat(strB: string) {
		return `${strA}${strB}`;
	};
}

export default concat;
