import AppLoader from './appLoader';
import { ApiEndpoint, type RequestOptions, type ResponseCallback } from '../../types/api';
import { type ArticlesResponse, type SourcesResponse, isArticlesResponse, isSourcesResponse } from '../../types/news';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback,
            isSourcesResponse
        );
    }

    public getNews(event: MouseEvent, callback: ResponseCallback<ArticlesResponse>): void {
        const eventTarget = event.target;
        const newsContainer = event.currentTarget;

        if (!(eventTarget instanceof Element) || !(newsContainer instanceof HTMLElement)) {
            return;
        }

        const sourceButton = eventTarget.closest<HTMLButtonElement>('.source__item');
        if (!sourceButton || !newsContainer.contains(sourceButton)) {
            return;
        }

        const sourceId = sourceButton.dataset.sourceId;
        if (!sourceId) {
            throw new Error('The selected news source is missing its source ID.');
        }

        if (newsContainer.dataset.source !== sourceId) {
            newsContainer.dataset.source = sourceId;
            super.getResp(
                {
                    endpoint: ApiEndpoint.Everything,
                    options: { sources: sourceId } satisfies RequestOptions,
                },
                callback,
                isArticlesResponse
            );
        }
    }
}

export default AppController;
