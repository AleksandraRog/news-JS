import Article from '../controller/article';
import LoaderAnswer from '../controller/loaderAnswer';
import Source from '../controller/source';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    public static drawNews(data: LoaderAnswer<Article> | null) {
        const values = data?.articles ? data?.articles : [];
        News.draw(values);
    }

    public static drawSources(data: LoaderAnswer<Source> | null) {
        const values = data?.sources ? data?.sources : [];
        Sources.draw(values);
    }
}

export default AppView;
