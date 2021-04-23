let _thread = pragmaThread._thread

console.log(_thread)

console.log(pragmaThread)
let _p = pragmaThread.pragmajs._p
let _e = pragmaThread.pragmajs._e

function fib(i, last = 0) {
    if (i < 0) return undefined
    if (i <= 1) return i
    return fib(i - 1) + fib(i - 2)
}

let thr = _thread()
                .define(fib)


let display = _p().as(_e('#display'))
                .define(
                    function clear() {
                        this.html(' ')
                        return this
                    },
                    function show(msg) {
                        this.html(msg)
                        return this
                    }

                )

_e('#main-thread').listenTo('click', () => {
    display.show("running fibonacci(42) in main-thread...")

    setTimeout(() => {
        let start = performance.now()
        let res = fib(42)

        display.show(`[${performance.now() - start}ms] result from main: ` + res)
    }, 50)
})

_e('#threaded').listenTo('click', () => {
    display.show("running fibonacci(42) threaded...")
    setTimeout(() => {

        let start = performance.now()
        thr.fib(42).then(resp => {
            // console.timeEnd('fibonacci')
            display.show(`[${performance.now() - start }ms] result from thread: ` + resp)
            console.log(resp)
        })
    }, 50)
})
