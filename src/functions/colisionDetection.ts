
const throwIfDifferentDimentions = (layerA: number[][], layerB: number[][]) => {
    const widthA = layerA[0].length;
    const widthB = layerB[0].length;
    const heightA = layerA[0].length;
    const heightB = layerB[0].length;
    if (widthA !== widthB || heightA !== heightB)
        throw new Error('checkIfLayerOverlap: Compared layers have different sizes')
}

const findColisionInRow = (rowA: number[], rowB: number[]) => {
    return rowA.find((itemA, index) => itemA === rowB[index] && itemA === 1)
}

export const checkIfLayersOverlap = (layerA: number[][], layerB: number[][]) => {
    throwIfDifferentDimentions(layerA, layerB)
    const isCoision = layerA.find((rowA, index) => findColisionInRow(rowA, layerB[index]));
    return isCoision || false;
}