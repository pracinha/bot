import {Functor} from './typeclass/functor';

type Maybe<T> = Just<T> | Nothing;

class Nothing implements Functor<null> {
	value = null;
	isNothing = true;
	isJust = false;
	map(_: any) {
		return Nothing.of();
	}
	static of() {
		return new Nothing();
	}
	join() {
		return null;
	}
	toString() {
		return `Nothing()`;
	}
}

export function of<A>(x: A): Maybe<A> {
	return x === null || x === undefined ? Nothing.of() : Just.of(x);
}

class Just<T> implements Functor<T> {
	value: T;
	isNothing = false;
	isJust = true;
	private constructor(x: T) {
		this.value = x;
	}
	map<U>(f: (x: T) => U): Maybe<U> | Nothing {
		return of(f(this.value));
	}
	join() {
		return this.value;
	}
	static of<A>(x: A) {
		return new Just<A>(x);
	}
	toString() {
		return `Just(${JSON.stringify(this.value)})`;
	}
}
