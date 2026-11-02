export function getElement<TElement extends Element>(parent: ParentNode, selector: string): TElement {
    const element = parent.querySelector<TElement>(selector);
    if (!element) {
        throw new Error(`Required element "${selector}" was not found.`);
    }

    return element;
}
