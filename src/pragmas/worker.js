import { data } from "jquery"
import { Pragma } from "pragmajs"


let messageScript = `
function respond(key, data) {
    postMessage({
        key,
        data
    })
}

onmessage = async (_data) => {
    let data = _data.data

    let key = data.key

    if (!_data.isTrusted) respond(key, 500)
    let fn = fns.get(data.name)
    if (!fn) respond(key, 404)

    let result = await fn(...data.args)
    respond(key, result)
}
`

function createWorker(code) {
    const blob = new Blob([code.toString()], { type: 'application/javascript' })
    return new Worker(URL.createObjectURL(blob))
}

export class PragmaWorker extends Pragma {
    constructor(...blocks) {
        super()

        this._blocks = new Map()
        this._executes = 0
        this.addBlocks(...blocks)
        this.createEvents('message', 'error')
    }

    execute(name, ...args) {
        let key = this._executes // unique id
        this.worker.postMessage({ key, name, args })

        this._executes += 1

        return new Promise((resolve, reject) => {
            this.on('message', data => {
                if (data.key !== key) return 
                resolve(data.data)
                return listener => listener.selfDestruct() // remove listener
            })
        })
    }

    addBlocks(...blocks) {
        for (let block of blocks) {
            if (!block.name) {
                console.error('could not add withoout a name', block)
                continue
            }

            this._blocks.set(block.name, block)
        }

        this.spawnWorker()
    }

    spawnWorker() {
        let script = "const fns = new Map(Object.entries({"
            for (let [name, fn] of this._blocks) {
                script += `${name}: ${fn.toString()},`
            }

        script += "}));" + messageScript

        this.worker = createWorker(script)
        this.worker.onmessage = data => { 
            if (!data.isTrusted) return console.error('data not trusted')
            this.triggerEvent('message', data.data)
        }
        // this.worker.onerror = jayson => { this.triggerEvent('error', JSON.parse(jayson))}

        return this.workeer
    }

}