/* eslint-disable no-shadow */

export enum DBDriver {
    pg = 'pg',
}

export enum LogDriver {
    winston = 'winston',
}

export enum Env {
    dev = 'dev',
    'non-prod' = 'non-prod',
    prod = 'prod',
}
