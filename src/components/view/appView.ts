import Article from '../controller/article';
import LoaderResponse from '../controller/loaderResponse';
import Source from '../controller/source';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    public static drawNews(data: LoaderResponse<Article> | null) {
        const values = data?.articles ? data?.articles : [];
        News.draw(values);
    }

    public static drawSources(data: LoaderResponse<Source> | null) {
        const values = data?.sources ? data?.sources : [];
        Sources.draw(values);
    }
}

export default AppView;
