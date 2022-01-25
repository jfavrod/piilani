/**
 * @packageDocumentation
 * @module Errors
 */

/**
 * Used when a requested method or operation is not implemented.
 */
export default class NotImplementedError extends Error {
    public readonly name = 'NotImplementedError'

    public constructor(mesg?: string) {
        super(mesg)
    }
}
