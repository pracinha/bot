import {F} from 'ts-toolbelt';

export class List<T> {
	$value: T[];
	private constructor(value: T[]) {
		this.$value = value;
	}
	static of<T>(items: T[]): List<T> {
		return new List<T>(items);
	}
	map<U>(fn: (x: T) => U) {
		return List.of(this.$value.map(fn));
	}
	filter(predicate: F.Function<[T], boolean>): List<T> {
		return List.of<T>(this.$value.filter(predicate));
	}
	join() {
		return this.$value;
	}
}
