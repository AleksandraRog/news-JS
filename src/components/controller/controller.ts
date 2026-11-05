import AppLoader from './appLoader';
import Article from './article';
import LoaderResponse from './loaderResponse';
import { RequestType } from './requestType';
import Source from './source';

class AppController extends AppLoader {
    getSources(callback: (data?: LoaderResponse<Source>) => void) {
        super.getResp<Source>(RequestType.Sources, {}, callback);
    }

    getNews(e: Event, callback: (data?: LoaderResponse<Article>) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<Article>(
                        RequestType.News,
                        {
                            sources: sourceId,
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
