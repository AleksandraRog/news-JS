import './sources.css';

import Source from '../../controller/source';

class Sources {
    private static sourceList: Source[] = [];

    public static draw(data: Source[]) {
        const main = document.querySelector<HTMLElement>('main');
        const sources = document.querySelector<HTMLDivElement>('.sources');
        console.log(main, sources);
        this.sourceList = data;
        if (main && sources) {
            const filterLayout: HTMLUListElement = this.filterLayout(data);
            sources?.before(filterLayout);
            this.renderSources(data);
        }
    }

    private static filterLayout(sourses: Source[]): HTMLUListElement {
        const filterContainer = document.createElement('ul');
        filterContainer.className = 'filter-container';
        const allFilterItem = document.createElement('li');
        allFilterItem.className = 'filter-item active filter';
        allFilterItem.textContent = 'All';
        allFilterItem.addEventListener('click', () => {
            filterContainer.querySelector('.filter-item.filter')?.classList.remove('filter');
            allFilterItem.classList.add('filter');
            this.filterByLetter('');
        });
        filterContainer.appendChild(allFilterItem);
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const activeLetters = sourses.map((item) => item.name[0].toUpperCase());
        for (let i = 0; i < alphabet.length; i++) {
            const letter = alphabet[i];
            const filterItem = document.createElement('li');
            filterItem.className = 'filter-item';
            if (activeLetters.includes(letter)) {
                filterItem.classList.add('active');
            }
            filterItem.textContent = letter;
            filterItem.addEventListener('click', () => {
                console.log(letter);
                filterContainer.querySelector('.filter-item.filter')?.classList.remove('filter');
                filterItem.classList.add('filter');
                this.filterByLetter(letter);
            });
            filterContainer.appendChild(filterItem);
        }
        return filterContainer;
    }

    private static filterByLetter(letter: string): void {
        if (letter === '') {
            this.renderSources(this.sourceList);
            return;
        }
        const filteredSources = this.sourceList.filter((item: Source) => item.name[0].toUpperCase() === letter);
        console.log(filteredSources);
        this.renderSources(filteredSources);
    }

    public static renderSources(data: Source[]) {
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

        document.querySelector('.sources')?.replaceChildren(fragment);
    }
}

export default Sources;
