import { Observer } from './types';
import { Subscription } from './subscription';
import { empty as emptyObserver } from './observer';

export class Subscriber<T> extends Subscription implements Observer<T> {
  protected isStopped: boolean = false;
  protected destination: Observer<any>;

  constructor(observer?: Observer<T>) {
    super();
    this.destination = observer || emptyObserver;
  }

  next(value: any): void {
    if (!this.isStopped) {
      this._next(value);
    }
  }

  error(err?: any): void {
    if (!this.isStopped) {
      this.isStopped = true;
      this._error(err);
    }
  }

  complete(): void {
    if (!this.isStopped) {
      this.isStopped = true;
      this._complete();
    }
  }

  unsubscribe(): void {
    if (this.closed) {
      return;
    }
    this.isStopped = true;
    super.unsubscribe();
  }

  protected _next(value: any) {
    if (this.destination.next) this.destination.next(value);
  }

  protected _error(err: any): void {
    if (this.destination.error) this.destination.error(err);
    this.unsubscribe();
  }

  protected _complete(): void {
    if (this.destination.complete) this.destination.complete();
      this.unsubscribe();
  }
}
