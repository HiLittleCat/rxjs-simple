import { Observable, Subject, map, mapTo } from '../index';

const subject = new Subject<number>().pipe(
  map((v) => v * 2),
  mapTo(2),
  map((v) => v * 3),
);
console.log(subject);

const subscription1 = subject.subscribe({
  next: (v) => {
    console.log('subscribe1', v);
  },
});

subject.subscribe({
  next: (v) => {
    console.log('subscribe2', v);
  },
});

setTimeout(() => {
  subscription1.unsubscribe();
}, 4500);

(subject as Subject<number>).next(1);
