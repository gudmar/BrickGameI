const getSingleColumn = (arr:any[][], index:number) => arr.map(row => row[index]);

const getColumns = (arr: any[][]) => {
    const rowLength = arr[0].length;
    if (rowLength === 0) return [[]];
    const columns = []
    for(let columnIndex = 0; columnIndex < rowLength; columnIndex++){
        columns.push(getSingleColumn(arr, columnIndex));
    }
    return columns;
}

const rotateOnceRight = (arr: any[][]) => getColumns(arr).map(column => column.reverse())

const getTranslatedNrOfRotations = (nrOfRotations:number) => {
    if (nrOfRotations > 0) return nrOfRotations % 4;
    return 4 + (nrOfRotations % 4);
}

export const rotateArray = (arr: any[][], nrOfRotations: number) => {
    let result = arr;
    for(let rotation = 0; rotation < getTranslatedNrOfRotations(nrOfRotations); rotation++) {
        result = rotateOnceRight(result);
    }
    return result;
}
