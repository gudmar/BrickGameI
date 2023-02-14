export const xor = (currentBrick: number, layerBrick: number) => {
    const and = currentBrick && layerBrick;
    const or = currentBrick || layerBrick;
    if (and) return 0;
    if (or) return 1;
    return 0;
}

export const toggle = (currentBrick: number, layerBrick: number) => {
    const and = currentBrick && layerBrick;
    const or = currentBrick || layerBrick;
    if (and) return 0;
    if (or) return 1;
    return 0;
}
    