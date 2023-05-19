export const sumArrayElements = (arr: any[] ) => {
    if (!areArraysSameLength(arr)) return -1;
    return arr.reduce((acc: number, item: number | number[]) => {
        let element = item;
        if (typeof element !== "number") {element = sumArrayElements(element)}
        if (typeof element === 'number') acc = element + acc;
        return acc;
    }, 0)
}

const areArraysSameLength = (arr:any[]) => {
    if (arr.every(item => typeof item === 'number')) return true;
    if (!Array.isArray(arr) || arr.length === 0) return false;
    if (arr.length === 1) return true;
    if (arr.some(item => !Array.isArray(item))) return false;
    return arr.every((item) => item.length === arr[0].length )
}
