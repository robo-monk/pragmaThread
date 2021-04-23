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


_e('#main-thread').listenTo('click', () => {
    _e("#result").html(fib(42))
})

_e('#threaded').listenTo('click', () => {
    thr.fib(42).then(resp => {
        // console.timeEnd('fibonacci')
        _e("#result").html(resp)
        console.log(resp)
    })
})
