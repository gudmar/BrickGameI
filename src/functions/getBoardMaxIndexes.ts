export const getBoardMaxIndexes = (visitedObject:any) => {
    const maxWidthIndex = visitedObject.pawnLayer[0].length;
    const maxHeightIndex = visitedObject.pawnLayer.length;
    return {
        maxWidthIndex, maxHeightIndex,
    }
}
