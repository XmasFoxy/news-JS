import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { getElement } from '../../utils/dom';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = getElement<HTMLElement>(document, '.sources');
        sources.addEventListener('click', (event: MouseEvent): void => {
            this.controller.getNews(event, (data): void => this.view.drawNews(data));
        });
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
