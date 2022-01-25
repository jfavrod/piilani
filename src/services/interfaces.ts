export interface ICache {
    exists(key: string): boolean;
    existsAsync(key: string): Promise<boolean>;
    get(key: string): unknown;
    getAsync(key: string): Promise<unknown>;
    set(key: string, entity: unknown): void;
    setAsync(key: string, entity: unknown): Promise<void>;
}

/** An Identity and Access Management (IAM) service interface */
export interface IIAMService {
    /**
     * The resources who's access is controlled by this service
     * (e.g. "AWS" resources such as s3, RDS, etc.).
     */
    resources: string;
    /** Get a token to access some resource. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAccessToken(...params: any): unknown;
    /** Use to require authentication to some resource (e.g. an endpoint). */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requireAuthentication(...params: any): unknown;
}
