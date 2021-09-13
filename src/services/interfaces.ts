export interface ICache {
    exists(key: string): boolean;
    existsAsync(key: string): Promise<boolean>;
    get(key: string): any;
    getAsync(key: string): Promise<any>;
    set(key: string, entity: any): void;
    setAsync(key: string, entity: any): Promise<void>;
}

/** An Identity and Access Management (IAM) service interface */
export interface IIAMService {
    /**
     * The resources who's access is controlled by this service
     * (e.g. "AWS" resources such as s3, RDS, etc.).
     */
    resources: string;
    /** Get a token to access some resource. */
    getAccessToken(...params: any): any;
    /** Use to require authentication to some resource (e.g. an endpoint). */
    requireAuthentication(...params: any): any;
}
