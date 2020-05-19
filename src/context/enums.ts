/**
 * @packageDocumentation
 * @module Context
 */

export enum DBDriver {
    pg = 'pg',
}

export enum LogDriver {
    WINSTON = 'winston',
}

export enum Env {
    dev = 'dev',
    'non-prod' = 'non-prod',
    prod = 'prod',
}
