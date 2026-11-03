import Article from '../controller/article';
import AppController from '../controller/controller';
import LoaderAnswer from '../controller/loaderAnswer';
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
                this.controller.getNews(e, (data?: LoaderAnswer<Article>) => AppView.drawNews(data ?? null))
            );
        this.controller.getSources((data?: LoaderAnswer<Source>) => AppView.drawSources(data ?? null));
    }
}

export default App;
