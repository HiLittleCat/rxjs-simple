import { Observable, Subject } from '../index';

const observable = new Observable<number>((subscriber) => {
  let count = 1;
  console.log('source');
  setInterval(() => {
    subscriber.next(count++);
  }, 1000);
  return subscriber;
});

const subscription = observable.subscribe({ next: (v) => {
  console.log(2, v);
} });


setTimeout(()=>{
  subscription.unsubscribe();
}, 4500);