
function Observable(observerFn) {
  let count = 1;
  setInterval(() => {
    (function operator1(value)  {
      value = value * 2;
      (function operator2(value) {
        value = value + 1;
        observerFn(value);
      })(value)
    })(count++);
  }, 1000);

}

Observable((v)=>{
  console.log('observer1', v);
});

Observable((v)=>{
  console.log('observer2', v);
});

function Subject() {
  this.observers = [];
  Observable((v)=>{
    this.observers.forEach((observer)=>{
      observer(v);
    });
  });
}

const subject = new Subject();

subject.observers.push((v)=>{
  console.log('subject.observer1', v);
});


subject.observers.push((v)=>{
  console.log('subject.observer2', v);
});