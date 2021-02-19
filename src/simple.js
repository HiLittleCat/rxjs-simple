class Observable {
  constructor(fn) {
    this._subcribe = fn;
  }

  subscribe(subscriber) {
    this._subcribe(subscriber);
  }
}

class Subject extends Observable {

  constructor() {
    super();
    this.observer = [];
  }

  next(value) {
    this.observer.forEach((subscriber) => {
      subscriber.next(value);
    });
  }

  subscribe(subscriber) {
    this.observer.push(subscriber);
  }
}


const ob = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next(1);
  }, 1000);

});

const subject = new Subject();

ob.subscribe(subject);

subject.subscribe({
  next: (v) => {
    console.log(1, v);
  }
});


subject.subscribe({
  next: (v) => {
    console.log(2, v);
  }
});
