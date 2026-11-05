import LoaderOptions from './loaderOptions';
import LoaderResponse from './loaderResponse';
import { RequestType } from './requestType';

class Loader {
    constructor(
        public baseLink: string,
        public options: LoaderOptions
    ) {}

    public getResp<T>(
        endpoint: RequestType,
        options?: LoaderOptions,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load<T>('GET', endpoint, callback, options);
    }

    private static errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: LoaderOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: (data: LoaderResponse<T>) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(Loader.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
