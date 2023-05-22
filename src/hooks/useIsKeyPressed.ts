import { useState } from "react"
import { KEY_UP } from "../functions/KeyReader";
import { useKeyboard } from "./useKeyboard";
import styles from './styles.module.css';

export const useIsKeyPressed = (key: string) => {
    const [isPressed, setIsPressed] = useState(false);
    useKeyboard({key, callback: () => setIsPressed(true)})
    useKeyboard({key, modifier: KEY_UP, callback: () => setIsPressed(false)});
    return isPressed;
}

export const useGetKeyPressedMarkClass = (key: string) => {
    const isPressed = useIsKeyPressed(key);
    return isPressed ? styles.edgePressed : '';
}
