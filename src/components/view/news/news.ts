import './news.css';

import Article from '../../controller/article';

class News {
    public static draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item: Article, idx: number) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                newsClone?.querySelector<HTMLDivElement>('.news__item')?.classList.add('alt');
            }

            newsClone
                .querySelector<HTMLDivElement>('.news__meta-photo')
                ?.style?.setProperty('backgroundImage', `url(${item.urlToImage || 'img/news_placeholder.jpg'})`);

            const applyTextContent = (element: HTMLElement | null | undefined, text: string) => {
                if (element) {
                    element.textContent = text;
                }
            };

            applyTextContent(
                newsClone.querySelector<HTMLLIElement>('.news__meta-author'),
                item.author || item.source.name
            );
            applyTextContent(
                newsClone.querySelector<HTMLLIElement>('.news__meta-date'),
                item.publishedAt.slice(0, 10).split('-').reverse().join('-')
            );

            applyTextContent(newsClone?.querySelector<HTMLHeadingElement>('.news__description-title'), item.title);
            applyTextContent(
                newsClone?.querySelector<HTMLHeadingElement>('.news__description-source'),
                item.source.name
            );
            applyTextContent(
                newsClone?.querySelector<HTMLParagraphElement>('.news__description-content'),
                item.description
            );
            newsClone?.querySelector<HTMLAnchorElement>('.news__read-more a')?.setAttribute('href', item.url);

            if (newsClone) fragment.append(newsClone);
        });

        document.querySelector<HTMLDivElement>('.news')?.replaceChildren();
        document.querySelector<HTMLDivElement>('.news')?.appendChild(fragment);
    }
}

export default News;
