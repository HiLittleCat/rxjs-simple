import { Observable, Subject, map, mapTo } from '../index';

const ob$ = new Observable<number>((subscriber) => {
  let count = 1;
  const handler = setInterval(() => {
    subscriber.next(count++);
  }, 1000);
  return subscriber;
});

const source$ = ob$.pipe(
  map((v) => v * 2),
  mapTo(2),
);

const subject$$ = new Subject<number>();

source$.subscribe(subject$$);

subject$$.subscribe({
  next: (v) => {
    console.log('subscribe1', v);
  },
});

subject$$.subscribe({
  next: (v) => {
    console.log('subscribe2', v);
  },
});
