import './sources.css';
import { type NewsSource } from '../../../types/news';
import { getElement } from '../../../utils/dom';

class Sources {
    public draw(data: readonly NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemplate = getElement<HTMLTemplateElement>(document, '#sourceItemTemp');

        data.forEach((item): void => {
            const sourceClone = sourceItemTemplate.content.cloneNode(true) as DocumentFragment;

            getElement<HTMLButtonElement>(sourceClone, '.source__item').dataset.sourceId = item.id;
            getElement<HTMLElement>(sourceClone, '.source__item-name').textContent = item.name;

            fragment.append(sourceClone);
        });

        getElement<HTMLElement>(document, '.sources').replaceChildren(fragment);
    }
}

export default Sources;
