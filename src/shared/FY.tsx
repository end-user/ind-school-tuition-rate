export default class FY {
    private readonly _fy: number

    constructor(fy: number) {
        this._fy = fy
    }

    private trim(n: number) {
        return n.toString().slice(2)
    }

    previous() {
        return this.trim(this._fy - 1)
    }

    this() {
        return this.trim(this._fy)
    }

    thisFull() {
        return this._fy
    }

    next() {
        return this.trim(this._fy + 1)
    }
}
