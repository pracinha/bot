function isNullable<T>(x: T): boolean {
	return x === undefined || x === null;
}

// function encase(fn) {
// 	return function encase(x) {
// 		try {
// 			return Right (fn (x))
// 		}
// }
// 	function readFolder(path: string) {
// 		try {
// 			return readdirSync(path).map(resolvePath(path));
// 		} catch (_) {
// 			return [];
// 		}
// 	};
