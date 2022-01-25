export default class ConfigError extends Error {
  public readonly name = 'ConfigError';

  public constructor(mesg?: string) {
    super(mesg);
  }
}
