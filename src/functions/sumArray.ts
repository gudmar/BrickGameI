
export const sumArray = (arr:number[]) => {
    const result = arr.reduce((sum, item) => {
        sum = sum + item;
        return sum;
    }, 0)
    return result;
}
