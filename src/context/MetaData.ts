export default class MetaData<T> {
    public ref: T | null = null;
    public store: {[key: string]: any} = {}

    private refs: Map<string, T> = new Map();

    public addRef(key: string, ref: T) {
        this.refs.set(key, ref);
    }

    public getRef(name: string): T | undefined {
        return this.refs.get(name);
    }
}
