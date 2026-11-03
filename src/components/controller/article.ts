import Source from './source';

interface Article {
    urlToImage: string;
    author: string;
    source: Source;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}

export default Article;
