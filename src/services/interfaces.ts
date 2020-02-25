/** An Identity and Access Management (IAM) service interface */
export interface IIAMService {
    /**
     * The resources who's access is controlled by this service
     * (e.g. "AWS" resources such as s3, RDS, etc.).
     */
    resources: string;
    getAccessToken(): any;
}

export interface IServiceResponse {
    /**
     * A response code; usually follows HTTP response code conventions.
     * E.g. 200 OK, 400 Bad Request, 500 Internal Server Error.
     */
    code: number;
    data?: any;
    error: boolean;
    message?: string;
}
