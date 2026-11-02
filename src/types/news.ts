export interface NewsSource {
    id: string;
    name: string;
    description: string;
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
