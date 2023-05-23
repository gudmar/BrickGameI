import { useState } from "react";
import { CARTRIDGE_ORDER } from "../../constants/cartridgeLibrary";

export const useSetCartridge = () => {
    const [currentGame, setCurrentGame] = useState(CARTRIDGE_ORDER[1]);
    const [isGameSelectionAllowed, setIsGameSelectionAllowed]: [boolean, (val:boolean)=>void] = useState(false);
    const switchCartridgeIndex = (getNextIndexFunction: (currentIndex:number) => number) => {
        if (!isGameSelectionAllowed) return{};
        const findCurrentCartridgeIndex = () => CARTRIDGE_ORDER.findIndex((storedCartridge) => storedCartridge === currentGame)
        const setNextCartridge = () => {
          const currentIndex = findCurrentCartridgeIndex();
          const nextIndex =  getNextIndexFunction(currentIndex);
          setCurrentGame(CARTRIDGE_ORDER[nextIndex])
        }
        setNextCartridge()    
      }
      
    const cartridgeUp = () => {
        const getNextIndex = (currentIndex: number) => currentIndex + 1 >= CARTRIDGE_ORDER.length ? 0 : currentIndex + 1;
        switchCartridgeIndex(getNextIndex)
      }
      const cartridgeDown = () => {
        const getNextIndex = (currentIndex: number) => currentIndex - 1 < 0 ? CARTRIDGE_ORDER.length - 1: currentIndex - 1;
        switchCartridgeIndex(getNextIndex)
      }
    return ({
        cartridgeDown,
        cartridgeUp,
        currentGame,
        isGameSelectionAllowed,
        setIsGameSelectionAllowed,
    })
}

export interface CartridgeProviderType {
  cartridgeDown: () => void,
  cartridgeUp: () => void,
  currentGame: string,
  isGameSelectionAllowed: boolean,
  setIsGameSelectionAllowed: () => void,
}
