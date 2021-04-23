import { Pragma } from 'pragmajs'
import { _worker } from "./index"

export class Thread extends Pragma {
    constructor(maxWorkers=4) {
        super()
        this.fnMap = new Map()
        this._maxWorkers = maxWorkers
    }

    run(fn, ...args) {
        let fnWorker = this.fnMap.get(fn)
        return fnWorker.execute(fn, ...args)
    }

    getAvalaibleWorker(fn) {
        if (this._workers > this._maxWorkers) return console.error('max amount of workers reached')
        return _worker(fn)
    }

    createFn(fn) {
        this.fnMap.set(fn.name, this.getAvalaibleWorker(fn))
    }

    define(...fns) {
        for (let fn of fns) {
            this.createFn(fn)

            let self = this
            this[fn.name] = function() {
                return self.run(fn.name, ...arguments)
            }

        }

        return this
    }
}