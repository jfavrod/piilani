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
    code: number;
    data?: any;
    error: boolean;
    message?: string;
}
