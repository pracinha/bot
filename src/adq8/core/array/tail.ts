import {slice} from './slice';

export function tail<T>(arr: Array<T>): Array<T> {
	return slice<T>(1)(Infinity)(arr);
}

export default tail;
