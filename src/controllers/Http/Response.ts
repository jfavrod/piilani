export default class Response {
    private _resCode: number = -1;

    public constructor() {}

    public get resCode(): number {
        return this._resCode;
    }
}
