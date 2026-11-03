import './sources.css';

import Source from '../../controller/source';

class Sources {
    public static draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone: DocumentFragment = sourceItemTemp?.content.cloneNode(true) as DocumentFragment;

            ((element: HTMLSpanElement | null | undefined) => element && (element.textContent = item.name))(
                sourceClone?.querySelector<HTMLSpanElement>('.source__item-name')
            );
            sourceClone?.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
