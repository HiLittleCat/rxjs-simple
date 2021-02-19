import { Observable } from '../../core/observable';
import { Subscriber } from '../../core/subscriber';

export function fromArray<T>(input: ArrayLike<T>): Observable<T> {
  return new Observable((subscriber: Subscriber<T>) => {
    for (let i = 0; i < input.length; i++) {
      subscriber.next(input[i]);
    }
    subscriber.complete();
  });
}
