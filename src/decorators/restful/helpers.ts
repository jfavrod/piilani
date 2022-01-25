import { IncomingMessage } from 'http'

import {
    // fromBodyMetadataKey,
    fromPathMetadataKey,
    MessageBody,
    ParsedPath,
    Parameter,
} from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getArgs = (parameters: Parameter[], pathParamLocations: number[], path: string, body: MessageBody): any[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const returnArgs: any[] = []
    const pathParts = splitPath(path)
    const pathParams = parameters.filter((param) => param.mapping === fromPathMetadataKey)

    // eslint-disable-next-line no-console
    console.log('body unused', body)

    pathParamLocations.forEach((paramLocation, idx) => {
        returnArgs[pathParams[idx].index] = pathParts[paramLocation]
    })

    return returnArgs
}

/**
 * Parse the body from an IncomingMessage HTTP request.
 * @returns The body as either a JSON.parse object or a string.
 * Rejects on error, returning the error.
 */
export const getBody = (req: IncomingMessage): Promise<Record<string, unknown> | string> => {
    return new Promise((res,rej) => {
        let data = ''

        req.on('data', (dt) => {
            data += JSON.stringify(dt)
        })

        req.on('end', () => {
            if (data) {
                try {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const obj: Record<string, unknown> = JSON.parse(data)
                    if (obj) {
                        res(obj)
                    }
                    else {
                        res(data)
                    }
                } catch (err) {
                    rej(err)
                }
            }
            else {
                res('')
            }
        })
    })
}

export const parsePath = (path: string): ParsedPath  => {
    const pathParamLocations: number[] = []
    const pathParamPattern = /{\w+}/
    const pathParts = splitPath(path)
    let pathPattern = /^/

    pathParts.forEach((part, index) => {
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        if (!part.match(pathParamPattern)) {
            pathPattern = new RegExp(pathPattern.source + '/' + part)
        } else {
            pathPattern = new RegExp(pathPattern.source + '/' + /\w+/.source)
            pathParamLocations.push(index)
        }
    })

    return {
        pathPattern,
        pathParamLocations,
    }
}

export const getRegExpForPath = (path: string): RegExp => {
    const pathParamPattern = /\/{\w+}/g
    const pathParamCount = path.match(pathParamPattern)?.length

    // console.log(path.match(pathParamPattern));

    let pattern = new RegExp(path.replace(pathParamPattern, ''))

    if (pathParamCount) {
        for (let i = 0; i < pathParamCount; i++) {
            pattern = new RegExp(pattern.source + /\/\w+/.source)
        }
    }

    return pattern
}

export const getRegExpForPathParams = (path: string): RegExp => {
    const pathParamPattern = /\/{\w+}/g
    const pathParamCount = path.match(pathParamPattern)?.length

    let pattern = new RegExp(path.replace(pathParamPattern, ''))

    if (pathParamCount) {
        for (let i = 0; i < pathParamCount; i++) {
            pattern = new RegExp(pattern.source + /\/\w+/.source)
        }
    }

    return pattern
}

/** Make sure there's a leading slash and remove any trailing slash. */
export const normalizePath = (path: string): string => (
    path.replace(/^\/?/, '/').replace(/\/$/, '')
)

/**
 * Example in: /my/route/{param1}/{param2}
 * Example out: [ 'my', 'route', '{param1}', '{param2}' ]
 */
export const splitPath = (path: string): string[] => {
    const pathSplit = path.split('/')
    // Remove the empty string that represents the leading slash.
    pathSplit.splice(0, 1)
    return pathSplit
}
