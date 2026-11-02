export interface NewsSource {
    id: string;
    name: string;
    description: string | null;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface NewsArticle {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: 'ok';
    sources: NewsSource[];
}

export interface ArticlesResponse {
    status: 'ok';
    totalResults: number;
    articles: NewsArticle[];
}

export interface ApiErrorResponse {
    status: 'error';
    code?: string;
    message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isNullableString(value: unknown): value is string | null {
    return typeof value === 'string' || value === null;
}

function isNewsSource(value: unknown): value is NewsSource {
    return (
        isRecord(value) &&
        typeof value.id === 'string' &&
        typeof value.name === 'string' &&
        isNullableString(value.description) &&
        typeof value.url === 'string' &&
        typeof value.category === 'string' &&
        typeof value.language === 'string' &&
        typeof value.country === 'string'
    );
}

function isNewsArticle(value: unknown): value is NewsArticle {
    if (!isRecord(value) || !isRecord(value.source)) {
        return false;
    }

    return (
        (typeof value.source.id === 'string' || value.source.id === null) &&
        typeof value.source.name === 'string' &&
        isNullableString(value.author) &&
        typeof value.title === 'string' &&
        isNullableString(value.description) &&
        typeof value.url === 'string' &&
        isNullableString(value.urlToImage) &&
        typeof value.publishedAt === 'string' &&
        isNullableString(value.content)
    );
}

export function isSourcesResponse(value: unknown): value is SourcesResponse {
    return (
        isRecord(value) && value.status === 'ok' && Array.isArray(value.sources) && value.sources.every(isNewsSource)
    );
}

export function isArticlesResponse(value: unknown): value is ArticlesResponse {
    return (
        isRecord(value) &&
        value.status === 'ok' &&
        typeof value.totalResults === 'number' &&
        Array.isArray(value.articles) &&
        value.articles.every(isNewsArticle)
    );
}

export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
    return isRecord(value) && value.status === 'error' && typeof value.message === 'string';
}
