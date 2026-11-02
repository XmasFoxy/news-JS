import {
    type ApiOptions,
    type HttpMethod,
    type RequestOptions,
    type ResponseCallback,
    type ResponseGuard,
} from '../../types/api';
import { isApiErrorResponse } from '../../types/news';

class Loader {
    private readonly baseUrl: URL;
    private readonly options: Readonly<Partial<ApiOptions>>;

    public constructor(baseLink: string, options: Readonly<Partial<ApiOptions>>) {
        const normalizedBaseLink = baseLink.endsWith('/') ? baseLink : `${baseLink}/`;
        this.baseUrl = new URL(normalizedBaseLink);
        this.options = options;
    }

    public getResp<TResponse>(
        request: { endpoint: string; options?: RequestOptions },
        callback: ResponseCallback<TResponse>,
        isResponse: ResponseGuard<TResponse>
    ): void {
        void this.load('GET', request.endpoint, callback, isResponse, request.options ?? {});
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            throw new Error(`Request failed (${response.status}): ${response.statusText}`);
        }

        return response;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const url = new URL(endpoint, this.baseUrl);
        const query = new URLSearchParams();
        const urlOptions: Partial<ApiOptions> = { ...this.options, ...options };

        Object.entries(urlOptions).forEach(([key, value]) => {
            if (value) {
                query.set(key, value);
            }
        });

        url.search = query.toString();
        return url.toString();
    }

    private async load<TResponse>(
        method: HttpMethod,
        endpoint: string,
        callback: ResponseCallback<TResponse>,
        isResponse: ResponseGuard<TResponse>,
        options: RequestOptions
    ): Promise<void> {
        try {
            const response = this.errorHandler(await fetch(this.makeUrl(options, endpoint), { method }));
            const data: unknown = await response.json();

            if (isApiErrorResponse(data)) {
                throw new Error(data.message);
            }

            if (!isResponse(data)) {
                throw new Error(`The API returned an invalid response for "${endpoint}".`);
            }

            callback(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('The API request failed with an unknown error.', error);
            }
        }
    }
}

export default Loader;
