/**
 * @packageDocumentation
 * @module Errors
 */

export default class BuildError extends Error {
    public readonly name = 'BuildError';

    constructor(mesg?: string) {
        super(mesg);
    }
}
