import './news.css';
import { type NewsArticle } from '../../../types/news';
import { getElement } from '../../../utils/dom';

class News {
    public draw(data: readonly NewsArticle[]): void {
        const fragment = document.createDocumentFragment();
        const newsItemTemplate = getElement<HTMLTemplateElement>(document, '#newsItemTemp');

        data.slice(0, 10).forEach((item, index): void => {
            const newsClone = newsItemTemplate.content.cloneNode(true) as DocumentFragment;
            const newsItem = getElement<HTMLElement>(newsClone, '.news__item');
            const image = getElement<HTMLImageElement>(newsClone, '.news__meta-photo');

            if (index % 2 === 1) {
                newsItem.classList.add('alt');
            }

            if (item.urlToImage) {
                image.src = item.urlToImage;
            } else {
                image.hidden = true;
            }
            image.alt = item.title;

            getElement<HTMLElement>(newsClone, '.news__meta-author').textContent = item.author ?? item.source.name;
            getElement<HTMLElement>(newsClone, '.news__meta-date').textContent = this.formatDate(item.publishedAt);
            getElement<HTMLElement>(newsClone, '.news__description-title').textContent = item.title;
            getElement<HTMLElement>(newsClone, '.news__description-source').textContent = item.source.name;
            getElement<HTMLElement>(newsClone, '.news__description-content').textContent = item.description ?? '';

            const readMoreLink = getElement<HTMLAnchorElement>(newsClone, '.news__read-more a');
            readMoreLink.href = item.url;
            readMoreLink.target = '_blank';
            readMoreLink.rel = 'noopener noreferrer';
            fragment.append(newsClone);
        });

        getElement<HTMLElement>(document, '.news').replaceChildren(fragment);
    }

    private formatDate(value: string): string {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return 'Date unavailable';
        }

        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC',
        })
            .format(date)
            .replace(/\//g, '-');
    }
}

export default News;
