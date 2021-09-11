/**
 * @packageDocumentation
 * @module Errors
 */

export default class BuildError extends Error {
    public readonly name = 'BuildError';

    public constructor(mesg?: string) {
        super(mesg);
    }
}
