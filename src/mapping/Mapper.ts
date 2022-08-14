import Case from 'case';

export class Mapper {
  /**
   * If a property in the target object also exists (by the same name)
   * in the source object, copy the value from the source to the target.
   * Note: Assumes property names are camelCase.
   */
  static propertyMatch<Target, Source>(target: Target, source: Source): void {
    for (const prop in source) {
      if (Object.prototype.hasOwnProperty.call(target, Case.camel(prop))) {
        // Use any as it's easy to use string index.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (target as any)[Case.camel(prop)] = JSON.parse(JSON.stringify(source[prop]));
      }
    }
  }
}