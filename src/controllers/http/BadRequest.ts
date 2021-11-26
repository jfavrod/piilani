import Response from "./Response"

export default class BadRequest extends Response {
    private readonly _data?: Object;

    public constructor(obj?: Object) {
        super();
        this._data = obj;
    }

    public get data(): Object | undefined {
        return this._data;
    }
}
