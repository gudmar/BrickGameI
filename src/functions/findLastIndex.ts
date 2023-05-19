export const findLastIndex = (array: any, callback: (item:any, index: number) => boolean):number => {
    const length = array.length;
    let index = length - 1;
    while(!callback(array[index], index) && index >= 0) {
        index -= 1;
    }
    return index;
}
