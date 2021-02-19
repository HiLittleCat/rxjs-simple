import { Observable, fromArray } from '../index';

const observable = fromArray([1, 2, 3]);

const subscription = observable.subscribe({
  next: (v) => {
    console.log(v);
  },
});
