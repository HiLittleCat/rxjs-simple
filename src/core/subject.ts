import { SubscriptionLike, Observer } from './types';
import { Observable } from './observable';
import { Subscriber } from './subscriber';
import { Subscription } from './subscription';
import { Operator } from './operator';


export class Subject<T> extends Observable<T> implements SubscriptionLike, Observer<T> {

  observers: Observer<T>[] = [];
  closed: boolean = false;
  isStopped = false;

  constructor() {
    super();
  }

  lift<R>(operator: Operator<T, R>): Observable<R> {
    const subject = new AnonymousSubject(this, this);
    subject.operator = <any>operator;
    return <any>subject;
  }

  next(value: T) {
    if (this.closed) {
      throw new Error('未订阅');
    }
    if (!this.isStopped) {
      this.observers.forEach((observer) => {
        if (observer.next) observer.next(value);
      });
    }
  }

  error(err: any) {
    if (this.closed) {
      throw new Error('未订阅');
    }
    this.isStopped = true;
    this.observers.forEach((observer) => {
      if (observer.error) observer.error(err);
    });
    this.observers.length = 0;
  }

  complete() {
    if (this.closed) {
      throw new Error('未订阅');
    }
    this.isStopped = true;
    this.observers.forEach((observer) => {
      if (observer.complete) observer.complete;
    });
    this.observers.length = 0;
  }

  _subscribe(subscriber: Subscriber<T>): Subscription {
    if (this.closed) {
      throw new Error('未订阅');
    } else if (this.isStopped) {
      subscriber.complete();
      return Subscription.EMPTY;
    } else {
      this.observers.push(subscriber);
      return new SubjectSubscription(this, subscriber);
    }
  }

  unsubscribe() {
    this.isStopped = true;
    this.closed = true;
    this.observers.length = 0;
  }
}

export class SubjectSubscription<T> extends Subscription {
  closed: boolean = false;
  constructor(public subject: Subject<T>, public subscriber: Observer<T>) {
    super();
  }

  unsubscribe() {
    if (this.closed) {
      return;
    }

    this.closed = true;

    const subject = this.subject;
    const observers = subject.observers;

    // this.subject = null;

    if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
      return;
    }

    const subscriberIndex = observers.indexOf(this.subscriber);

    if (subscriberIndex !== -1) {
      observers.splice(subscriberIndex, 1);
    }
  }
}


/**
 * @class AnonymousSubject<T>
 */
export class AnonymousSubject<T> extends Subject<T> {
  constructor(protected destination?: Observer<T>, source?: Observable<T>) {
    super();
    this.source = source;
  }

  next(value: T) {
    const { destination } = this;
    if (destination && destination.next) {
      console.log(`destination ${value}`);
      destination.next(value);
    }
  }

  error(err: any) {
    const { destination } = this;
    if (destination && destination.error) {
      destination.error(err);
    }
  }

  complete() {
    const { destination } = this;
    if (destination && destination.complete) {
      destination.complete();
    }
  }

  /** @deprecated This is an internal implementation detail, do not use. */
  _subscribe(subscriber: Subscriber<T>): Subscription {
    const { source } = this;
    if (source) {
      return source.subscribe(subscriber);
    } else {
      return Subscription.EMPTY;
    }
  }
}