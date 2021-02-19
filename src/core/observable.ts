import { Operator } from './operator';
import { Subscription } from './subscription';
import { Subscriber } from './subscriber';
import {
  Subscribable,
  Unsubscribable,
  Observer,
  OperatorFunction,
} from './types';
import { pipeFromArray } from './util/pipe';

export class Observable<T> implements Subscribable<T> {
  source: Observable<any> | undefined = undefined;
  operator: Operator<any, T> | undefined = undefined;

  /**
   * @constructor
   * @param subscribe 事件源
   */
  constructor(
    subscribe?: (subscriber: Subscriber<T>) => Unsubscribable | Function | void,
  ) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  lift<R>(operator: Operator<T, R>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  pipe(...operations: OperatorFunction<any, any>[]): Observable<any> {
    if (operations.length === 0) return this;

    return pipeFromArray(operations)(this);
  }

  /**
   * @param observer 该observer订阅Observable
   */
  subscribe(observer?: Observer<T>): Subscription {
    const subscriber = new Subscriber(observer);
    const { source, operator } = this;
    if (operator) {
      return operator.call(subscriber, source);
    } else {
      this._subscribe(subscriber);
      return subscriber;
    }
  }

  _subscribe(observer: Observer<any>): Unsubscribable | Function | void {
    const { source } = this;
    if (source) return source.subscribe(observer);
  }
}
