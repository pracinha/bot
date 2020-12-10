export function slice<T>(fromIndex: number) {
	return (toIndex: number) => (arr: Array<T>) =>
		arr.slice(fromIndex, toIndex);
}

export default slice;
