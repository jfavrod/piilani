export class RefStore {
  private static refs: Map<string, unknown> = new Map();

  public static addRef<T>(key: string, ref: T) {
    RefStore.refs.set(key, ref);
  }

  public static getRef<T>(key: string): T | undefined {
    return RefStore.refs.get(key) as T | undefined;
  }
}
