import { Thread } from "./thread"
import { PragmaWorker } from "./worker"

export function _thread() {
    return new Thread(...arguments)
}

export function _worker() {
    return new PragmaWorker(...arguments)
}