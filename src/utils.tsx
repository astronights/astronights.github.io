const range = (start: number, stop: number, count: number) => {
    const step = (stop - start) / (count - 1);
    return Array.from(
        { length: (stop - start) / step + 1 },
        (_, index) => start + index * step
    );
}

export default range;