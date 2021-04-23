import { Pragma } from 'pragmajs'
import { _worker } from "./index"

export class Thread extends Pragma {
    constructor(maxWorkers=4) {
        super()
        this.fnMap = new Map()
        this._maxWorkers = maxWorkers
    }

    run(fn) {
        let fnWorker = this.fnMap.get(fn)
        console.log(fnWorker)
        return fnWorker.execute(fn)
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

            this[fn] = () => {
                return this.run(fn)
            }
        }

        return this
    }
}