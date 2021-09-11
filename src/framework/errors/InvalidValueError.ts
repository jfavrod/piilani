/**
 * @packageDocumentation
 * @module Errors
 */

/**
 * Used when an actual value does not match expected expectations
 * (falling out of bounds, wrong type, etc.).
 */
export default class InvalidValueError extends Error {
    public readonly name = 'InvalidValueError';

    public constructor(mesg?: string) {
        super(mesg);
    }
}
