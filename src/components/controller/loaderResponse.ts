interface LoaderResponse<T> {
    [key: string]: T[] | undefined;
}

export default LoaderResponse;
