import React, { createContext, useContext } from 'react';
import { useSetCartridge } from '../components/BrickGame/useSetCartridge';

const CartridgeContext = createContext(null as any);

export const CartridgeContextProvider = ({children}: {children: React.ReactNode}) => {
    const cartridgeController = useSetCartridge();
    // CartridgeContext = createContext(cartridgeController)
    return (
        <CartridgeContext.Provider value={cartridgeController}>
            {children}
        </CartridgeContext.Provider>
    )
}

export const useCartridgeController = () => {
    const cartridgeContext = useContext(CartridgeContext)
    if (!cartridgeContext) throw new Error('useCartridgeContext has to be used within CartridgeContextProvider');
    return {...cartridgeContext};
}
