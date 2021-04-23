// const pragmaThread = require("../dist/pragmaThread.umd.js")
import { _thread } from "../src/index"
class Worker {
    constructor(stringUrl) {
        this.url = stringUrl;
        this.onmessage = () => { };
    }

    postMessage(msg) {
        this.onmessage(msg);
    }
}
window.Worker = Worker
window.URL.createObjectURL = function () { };

describe('does this work?', () => {
    test("*snap* yes", () => {
        expect(69).not.toBe(420)
    })
})

describe('simple thread', () => {
    let t = _thread()

    t.define(
        function test() {
            return 1
        }
    )
})
