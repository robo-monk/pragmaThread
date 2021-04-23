let _thread = pragmaThread._thread

console.log(_thread)

let thr = _thread()
                .define(function test() { return 420 })
                .run('test').then(resp => {
                    console.log(resp)
                })
                
console.log(thr)