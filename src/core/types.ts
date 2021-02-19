import { Observable } from './observable';

export interface Observer<T> {
  closed?: boolean;
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

export interface Subscribable<T> {
  subscribe(observer?: Observer<T>): Unsubscribable;
}

export interface Unsubscribable {
  unsubscribe(): void;
}

export interface SubscriptionLike extends Unsubscribable {
  unsubscribe(): void;
  readonly closed: boolean;
}

export interface UnaryFunction<T, R> { (source: T): R; }

export interface OperatorFunction<T, R> extends UnaryFunction<Observable<T>, Observable<R>> {}
