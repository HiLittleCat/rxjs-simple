import { Subscriber } from './subscriber';
import { Unsubscribable } from './types';

export interface Operator<T, R> {
  call(
    subscriber: Subscriber<R>,
    source: any,
  ): Subscriber<any>;
}
