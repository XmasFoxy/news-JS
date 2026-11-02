export enum ApiEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export interface ApiOptions {
    apiKey: string;
    sources?: string;
}

export type RequestOptions = Partial<Pick<ApiOptions, 'sources'>>;
export type HttpMethod = 'GET';
export type ResponseCallback<TResponse> = (response: TResponse) => void;
export type ResponseGuard<TResponse> = (response: unknown) => response is TResponse;
