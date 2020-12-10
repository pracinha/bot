export function hasProp(propName: string) {
	return <T>(obj: T) => propName in obj;
}
