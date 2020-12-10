export function groupBy<A extends {[key: string]: any}>(propName: string) {
	return function groupBy(list: A[]) {
		return list.reduce((grouped, item) => {
			const key: string = item[propName];
			if (!key) {
				return grouped;
			}
			if (!grouped[key]) {
				grouped[key] = [];
			}
			grouped[key].push(item);
			return grouped;
		}, {} as Record<string, A[]>);
	};
}
