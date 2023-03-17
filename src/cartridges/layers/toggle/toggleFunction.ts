export const xor = (currentBrick: number, layerBrick: number) => {
    const and = currentBrick && layerBrick;
    const or = currentBrick || layerBrick;
    if (and) return 0;
    if (or) return 1;
    return 0;
}

export const and = (currentBrick: number, layerBrick: number) => {
    if (!currentBrick || !layerBrick) return 0
    return 1;
}

export const or = (currentBrick: number, layerBrick: number) => {
    if (!currentBrick && !layerBrick) return 0
    return 1;
}

export const spiral = (currentBrick: number, layerBrick: number) => {
    // 0 0 => 0 
    // 0 1 => 1
    // 1 0 => 1
    // 1 1 => 0
}

export const toggle = (currentBrick: number, layerBrick: number) => {
    return xor(currentBrick, layerBrick)
    // console.log(currentBrick, layerBrick)
    // // const and = currentBrick && layerBrick;
    // const or = currentBrick || layerBrick;
    // // if (and) return 0;
    // if (or) return 1;
    // return 0;
}
    