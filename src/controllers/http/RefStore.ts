export class RefStore {
  private static refs: Map<string, unknown> = new Map();

  public static addRef(key: string, ref: unknown) {
    RefStore.refs.set(key, ref);
  }

  public static getRef(key: string): unknown | undefined {
    return RefStore.refs.get(key);
  }
}
