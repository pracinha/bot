export function getProp<Result>(propName: string) {
	return (obj: any) => obj[propName] as Result;
}
