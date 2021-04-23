![npm-size](https://img.shields.io/npm/v/pragmaThread?style=flat-square)
![npm-size](https://img.shields.io/github/commit-activity/m/robo-monk/pragmaThread?style=flat-square)
![npm-size](https://img.shields.io/npm/dw/pragmaThread?style=flat-square)

# pragmaThread 
> made with ❤ ️by robo-monk


### [ Demo ](https://robo-monk.github.io/pragmaThread)


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

_thr.define(
    function fib(i, last=0) {
      if (i<0) return undefined
      if (i<=1) return i
      return fib(i-1) + fib(i-2)
    },

    function test() {
        // this keyword lets you reference functions and blocks
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
