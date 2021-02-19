import { isFunction } from './util/isFunction';

import { SubscriptionLike } from './types';

export class Subscription implements SubscriptionLike {

  public static EMPTY: Subscription = (function(empty: any) {
    empty.closed = true;
    return empty;
  }(new Subscription()));
  
  public closed: boolean = false;

  private _unsubscribe: Function | undefined;

  constructor(unsubscribe?: () => void) {
    this._unsubscribe = unsubscribe;
  }

  unsubscribe() {
    if (this.closed) return;
    if (isFunction(this._unsubscribe)) this._unsubscribe();
  }
}
