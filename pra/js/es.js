// function es6() {
//   var testVar = 'var';
//   console.log(testVar);
//   testVar = '再代入';
//   console.log(testVar);
//   var testVar = '再宣言';
//   console.log(testVar);
// 
//   let testLet = 'let';
//   console.log(testLet);
//   testLet = '再代入';
//   console.log(testLet);
//   // let testLet = '再宣言'; //再宣言できない
// 
//   const testConst = 'con'; //定数を作ることができる。
//   console.log(testConst);
//   // testConst = '再代入'; // 再代入できない
//   // const testConst = 'con2'; // 再宣言できない
// 
//   // ブラケット{}内でlet、constはそのブラケット{}内のみで変数が有効
//   if (true) {
//     var a = 1;
//     let b = 1;
//     const c = 1;
//     console.log(a);//1
//     console.log(b);//1
//     console.log(c);//1
//   }
//   console.log(a);//1
//   // console.log(b);//とれない
//   // console.log(c);//とれない
// 
//   const fn2 = (a, b) => {
//     return a - b;
//   }
// 
//   console.log(fn2(4,2));
// 
//   var fn = (a, b) => {
//     return a + b;
//   };
// 
//   console.log(fn(1,3));
// 
//   // const fun = (a, b) => a + b; a - b;　//省略した場合2つはダメ
// 
//   // thisのところは書く
//   window.count = 10;
// 
//   var Counter = function () {
//     this.count = 0;
//   };
// 
//   Counter.prototype.increment = function() {
//     setTimeout(() => {
//       self.count++;
//       console.log(self.count);
//     }, 1000);
//   };
// 
//   var counter = new Counter().increment();
//   // thisのところは書く
// 
//   class Cat {
//     constructor(name) {
//       this.name = name
//     }
//     meow() {
//       console.log( this.name + 'はミャオと鳴きました' );
//     }
//   }
// 
//   // Cat('mike');
//   // Cat.prototype.meow();
// 
//   // 継承extends
//   class Person {
//     constructor(name) {
//       this.name = name;
//     }
//     sayHello() {
//       console.log("Hello, I'm " + this.getName());   
//     }
//     getName() {
//       return this.name;
//     }
//   }
// 
//   class Teacher extends Person {
//     sayHello() {
//       console.log("Hi, I'm " + this.getName())
//     }
//   }
// 
//   const teacher = new Teacher('soarflat');
//   teacher.sayHello();
//   // 継承extends
// 
//   // 乗算
//   function multiply (a = 5) {
//   return a * a;
//   }
// 
//   console.log(multiply());
//   console.log(multiply(30));
// 
//   // 分割代入
//   // 使いやすそう
//   // const [aa,b,c,d] = [22,2333,242,33];
//   // console.log(aa, b, c, d);
// 
//   const obj2 = {aa:1,b:2,c:{d:3}};
//   const {aa, b, c, c: {d}} = obj2;
//   console.log(aa,b,c,d);
// 
//   const person = {
//     name: 'soarflat',
//     country: 'Japan'
//   };
//   const {name, country} = person;
// 
//   console.log(name); // => soarflat
//   console.log(country); // => Japan
//   // 分割代入
// 
//   function fullName (a,s) {
//     return a + s;
//   }
//   console.log(fullName({a:'asa',s:'kura'}));
// 
//   // バッククオート
//   const back = [1,23,3232];
//   console.log(`name is ${back}`)
//   console.log(`My
// 
// 
// 
// name
// is
// ${back}`);
//   // バッククオート
//   function func(a,...r) {
//     console.log(r);
//     console.log(r[0]);
//   }
//   func(1, 2, 3, 4, 5);
// 
//   function func2(x,y,z) {
//     console.log(x);
//     console.log(y);
//     console.log(z);
//   };
// 
//   var array23 = [1, 2, 3];
//   array23 = [4,...array23, 5, 6];
//   console.log(array23);
// 
//   const arr2 = [10,20,30];
//   func2(...arr2);
// 
//   var array = [7878,8899,89800];
//   console.log(array);
//   console.log(Math.max(array));
//   console.log(Math.max.apply(null, array));
// 
//   function timer(number) {
//     return new Promise(function(resolve, reject) { //Promiseを利用するにはPromiseをnewでインスタンスを作ります。
//       setTimeout(function() {
//         resolve(number * 2);//成功すればresolveを失敗すればrejectを呼び出す。
//       },1000);
//     });
//   }
// 
// timer(100)
//   .then(timer)//実装した関数を使う場合は呼び出した関数の戻り値であるPromiseのメソッドthenを呼び出すことで値を受け取れます。
//   .then(timer)
//   .then(timer)
//   .then(timer)
//   .then(function onFulfilled(value) {
//     console.log(value) // => 3200
//   });
// 
//   // Promise の状態に応じて、onFulfilled() または onRejected() が呼ばれます。
//   // onFulfilled
//   // Promise が成功したとき呼ばれるFunction。この関数は１つの引数、valueを持ちます。value に渡されるのは、Promise にラップされた値などです。
//   // onRejected Optional
//   // Promiseが失敗したとき呼ばれるFunction。この関数は１つの引数、reason を持ちます。reason は、失敗した理由などです。
//   // Promise の解決中に例外(エラー)が発生した場合も、 onRejected が呼ばれます。
// 
// 
//   var iterator = {};
//   iterator.next = function(){
//     var iteratorResult = { value: 42, done: false }; // イテレータリザルト
//     return iteratorResult;
//   };
//   console.log(iterator.next());
// 
//   var obj = {};
//   obj[Symbol.iterator] = function(){
//       var iterator = {};
//       var count = 1;
//       iterator.next = function(){
//           var iteratorResult = (count <= 10)
//               ? { value: count++,   done: false }
//               : { value: undefined, done: true };
//           return iteratorResult;
//       };
//       return iterator;
//   };
// 
//   var iterator = obj[Symbol.iterator]();
//   var iteratorResult;
//   while(true){
//     iteratorResult = iterator.next();
//     if(iteratorResult.done) break;
//     console.log(iteratorResult.value);
//   }
// 
//   function* iii(n) {
//     n++;
//     yield n; //停止の合図。
//     n *= 2;
//     yield n;
//     n = 0;
//     yield n;
//   }
//   var g = iii(10);
//   console.log( g.next() ); 
// }

function iterator() {
  var obj = {
    0o77: 42,
    1e2: 43,
    .456: 44,
    1e+5: 45,
    0123: "value"
  }
  console.log(obj);
  
  var objct = {
    [!true]: 45,
    [2+3]: 21,
    [{}]: 55,
    [function(){return "foo";}]:90
  }
  console.log(objct);
  
  var prop = 0;
  var ob = { prop };
  with({prop:1}) {
    var propObjTest = {prop};
  }
  console.log(propObjTest);
  
  var i = {
    metihod(){
      alert("!");
    },
    "my method"() {
      alert("!");
    },
    0() {
      alert("!");
    },
    [!true](){ alert("！"); }
  }
  // i.metihod();
  
  function add(a,b) {
    return new Promise(resolve => resolve(a + b));
  }
  
  (async function() {
    let n = 1 + (await add(2,3)) + 4;
    console.log(n);
  })();
  
  function shouldBeFail() {
    return Promise.reject(new Error('fail'));
  }
  
  (async function() {
    try{
      await shouldBeFail();
    }catch(e){
      console.error(e);
    }
    let t = await shouldBeFail().catch('cau');
    await shouldBeFail();
  })().catch(e => console.error(e));
  
  function someAsyncFn(n) {
    return new Promise(resolve => {
      setTimeout(()=>{
        // console.log(n);
        resolve(n+1);
      },1000)
    });
  }
  
  function someAsyncCond(n) {
    return new Promise(resolve => {
      resolve(n<10);
    });
  }
  
  (async function() {
    for (let i=0; await someAsyncCond(i); i++){
      await someAsyncFn(i);
    }
  })();
  
  function spawn() {
    return new Promise(function(resolve, reject) {
      var gen = genF.call(self);
      function step(nextF) {
        var next;
        try{
          next = nextF();
        }catch(e) {
          reject(e);
          return;
        }
        if(next.done) {
          resolve(next.value);
          return;
        }
        Promise.resolve(next.value).then(function(v) {
          step(function(){ return gen.next(v); })
        },function(e) {
          return gen.throw(e);
        })
      }
      step (function() {return gen.next(undefined);});
    })
  }
  
  async function fn() {
    return 42;
  }
  
  async function exec() {
    let result = await fn();
    console.log(result);
  }
  
  exec();
  
  var ab = new ArrayBuffer(1024);
  console.log(ab);

var init = {};  
  var iterator = {};
  iterator.next = function() {
    var result = {na:"asa", me:"kura", done:false};
    return result;
  }
  console.log(iterator.next());
}

function work() {
  var worker = new Worker('js/work.js');
  $(document).on('click', '#idBtnDoPost', function(){
    worker.addEventListener('message', function(e) {
      $('#idParamReceive').val(e.data);
    },false);
    worker.postMessage($("#idParamPost").val());
  });
  var obj = {name:'name', num:'080', pass:'Pass1234'};
  worker.postMessage(obj);
  worker.onmessage = function(e){
    console.log(e);
  }
  worker.addEventListener('error', (error)=>{
    console.log('Error');
  })
  
  const bufferView = new Uint8Array(3);
  console.log(bufferView);
}

function accordion() {
  $('.accordion_click').on('click', function() {
    $('.accordion_target').slideToggle();
  })
}

function globalFunc() {
  function callBack(callB) {
    console.log('callBack');
    callB();
  }
  function callBack2() {
    console.log('c2');
  }
  callBack(callBack2);
  function asyncFun() {
    setTimeout(function(){
      var data = getData(input);
      var err = data.getError();
      callback(err,data);
    },0);
  }
}

function initialize() {
  // es6();
  // iterator();
  work();
  accordion();
  globalFunc();
}

initialize();
