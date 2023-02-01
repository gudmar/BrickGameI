import { TestCartridge } from '../cartridges/test'

const cartridgeLibrary = {
    test: {
        logicHandler: TestCartridge,
        description: 'Test display',
        show: true,
    },
}

export const useCartridge = () => {
    return cartridgeLibrary;
}
