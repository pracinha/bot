export interface Functor<T> {
	map<U>(f: (x: T) => U): Functor<U>;
	join(): T | null;
}
