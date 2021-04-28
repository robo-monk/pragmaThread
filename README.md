![npm-size](https://img.shields.io/npm/v/pragma-thread?style=flat-square)
![npm-size](https://img.shields.io/github/commit-activity/m/robo-monk/pragma-thread?style=flat-square)
![npm-size](https://img.shields.io/npm/dw/pragma-thread?style=flat-square)

# pragmaThread 
> made with ❤ ️by robo-monk


### [ Demo ](https://robo-monk.github.io/pragmaThread)

Pragma Thread makes working in multiple threads in JavaScript simple and pain in the ass free. You don't need other files to initalize `Workers` from, you can have multiple threads spawned from the same file. It's a tiny plugin for [`pragmajs`](https://github.com/robo-monk/pragmajs)

You first `define` the functionalities you want to thread, and then at some point in your code you call them, using `Promises` or/and `async/await`. 

It's actually that simple.


## Usage:

```javascript

// create a new thread

let _thr = _thread() // thread is a pragma
                .on('execute', fn => {
                    console.time(fn)
                })
                .on('done', fn => {
                    console.timeEnd(fn)
                })

// define the functions you want to thread

// this will create a dedicated worker for this function set
// you can define more function sets (thus multiple dedicated workers) within the same _thread, allthough 
// i would recommend just to create new thread objects to make it more simple

_thr.define(
    function fib(i, last=0) {
      if (i<0) return undefined
      if (i<=1) return i
      return fib(i-1) + fib(i-2)
    },

    function test() {
        // this keyword lets you reference functions and blocks, of the current
        // function set you're defining
        return this.fib()
    }
)

// call it
_thr.fib(12).then(result => {
    console.log(result) 
})


// example in an async context
async function fibThread() {
    return await _thr.fib(...arguments)    
}

```


## How to write threaded functions
There are some things you can't thread in javascript, mainly DOM manipulation. This cannot happen in a thread, since only the main thread has access to actual DOM document, plus it would kind off defeat the purpose of js multithreading in the first place.

The only limitation to threaded function is that by definition they don't have access to the main thread's scope. So:

```javascript

let nice = 69

_thr.define(
    function yeet() {
        console.log(nice)
    }
)

_thr.yeet() // => will throw error 'nice' is undefined

```

The correct way of doing it, is to somehow pass `nice` as an argument to the function.

```javascript
let nice = 69

_thr.define(
    function yeet(nice) {
        console.log(nice)
    }
)

_thr.yeet(nice) // => `69` 
               // - very nice
```

> Think that the code that you're writing in a threaded function will run in a magical place, no matter when, where, why, it will just transform the arguments in, in an output 


## First time:

```bash
git clone git@github.com:robo-monk/pragmaThread.git
cd pragmaThread
pnpm dev -r # reload dependencies
```

* Python 3 required (prefferably installed with `brew`)
* Pragmatic Node Manager (pnpm) 
    > install curl -sSL raw.githubusercontent.com/robo-monk/pnpm/master/copy%2Bpaste.py | python3 - && zsh

## Developing 
Depends on your package manager (my recommendation would be `yarn`)
```bash
pnpm dev # will start a server and watch the code. Will
         # also check whether tests pass if configed so;
```

```bash
pnpm release # will release the package to npm repository

# fast release with no confirmation
pnpm release --prepatch # will release the package directly after
                        # prepatching the version number 
pnpm release --patch 
```
