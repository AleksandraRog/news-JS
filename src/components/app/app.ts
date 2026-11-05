import Article from '../controller/article';
import AppController from '../controller/controller';
import LoaderResponse from '../controller/loaderResponse';
import Source from '../controller/source';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    constructor() {
        this.controller = new AppController();
    }

    public start() {
        document
            .querySelector<HTMLDivElement>('.sources')
            ?.addEventListener('click', (e) =>
                this.controller.getNews(e, (data?: LoaderResponse<Article>) => AppView.drawNews(data ?? null))
            );
        this.controller.getSources((data?: LoaderResponse<Source>) => AppView.drawSources(data ?? null));
    }
}

export default App;
