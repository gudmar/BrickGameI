export const sumArrayElements = (arr: any[] ) => {
    return arr.reduce((acc: number, item: number | number[]) => {
        let element = item;
        // if (Array.isArray(element)) {element = sumArrayElements(element)}
        if (typeof element !== "number") {element = sumArrayElements(element)}
        if (typeof element === 'number') acc = element + acc;
        return acc;
    }, 0)
}
