import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { KeyReader } from '../../functions/KeyReader';
import { keys, useKeyboard } from '../useKeyboard';

const A_PRESSED = 'A pressed';
const CTRL_B_PRESSED = 'CTRL _ B pressed'
const LABEL_1_ID = "label_1"
const LABEL_2_ID = "label_2";
const LABEL_3_ID = "label_3";
const LABEL_4_ID = "label_4";

const BUTTON_LOCK_AA = 'Button lock A - A';
const BUTTON_LOCK_AB = 'Button lock A - B';
const BUTTON_LOCK_CTRL_BA = 'Button lock CTRL B - A';
const BUTTON_LOCK_CTRL_BB = 'Button lock CTRL B - B';
const BUTTON_UNLOCK_AA = 'Button unlock A - A';
const BUTTON_UNLOCK_AB = 'Button unlock A - B';
const BUTTON_UNLOCK_CTRL_BA = 'Button unlock CTRL B - A';
const BUTTON_UNLOCK_CTRL_BB = 'Button unlock CTRL B - B';


const ComponentA = () => {
    const [isA, setA] = useState(false);
    const [isB, setB] = useState(false);
    const label1fill = () => {setA(true); return {}}
    const label2fill = () => {setB(true); return {}}
    const {lock: lockA, unlock: unlockA} = useKeyboard({
        key: keys.A,
        callback: label1fill,
    })
    const {lock: lockB, unlock: unlockB} = useKeyboard({
        key: keys.B,
        modifier: keys.CTRL,
        callback: label2fill,
    })

    return (<>
        <div data-testid={LABEL_1_ID}>{isA ? A_PRESSED : ''}</div>
        <div data-testid={LABEL_2_ID}>{isB ? CTRL_B_PRESSED: ''}</div>
        <button onClick={lockA}>{BUTTON_LOCK_AA}</button>
        <button onClick={lockB}>{BUTTON_LOCK_CTRL_BA}</button>
        <button onClick={unlockA}>{BUTTON_UNLOCK_AA}</button>
        <button onClick={unlockB}>{BUTTON_UNLOCK_CTRL_BA}</button>
    </>)
}

const ComponentB = () => {
    const [isA, setA] = useState(false);
    const [isB, setB] = useState(false);
    const label1fill = () => {setA(true); return {}}
    const label2fill = () => {setB(true); return {}}
    const {lock: lockA, unlock: unlockA} = useKeyboard({
        key: keys.A,
        callback: label1fill,
    })
    const {lock: lockB, unlock: unlockB} = useKeyboard({
        key: keys.B,
        modifier: keys.CTRL,
        callback: label2fill,
    })

    return (<>
        <div data-testid={LABEL_3_ID}>{isA ? A_PRESSED : ''}</div>
        <div data-testid={LABEL_4_ID}>{isB ? CTRL_B_PRESSED : ''}</div>
        <button onClick={lockA}>{BUTTON_LOCK_AB}</button>
        <button onClick={lockB}>{BUTTON_LOCK_CTRL_BB}</button>
        <button onClick={unlockA}>{BUTTON_UNLOCK_AB}</button>
        <button onClick={unlockB}>{BUTTON_UNLOCK_CTRL_BB}</button>
    </>)
}

const Components = () => {
    return (
        <>
            <ComponentA/>
            <ComponentB/>
        </>
    )
}

describe('Testing useKeyboard', () => {
    afterEach(() => delete KeyReader.instance)
    it('Should trigger functions related to A button in component a and component b when a pressed, containers related to ctrl_b should not be touched', () => {
        render(<Components/>);
        const label1Container = screen.getByTestId(LABEL_1_ID);
        const label2Container = screen.getByTestId(LABEL_2_ID);
        const label3Container = screen.getByTestId(LABEL_3_ID);
        const label4Container = screen.getByTestId(LABEL_4_ID);
        expect(label1Container).toHaveTextContent('');
        expect(label2Container).toHaveTextContent('');
        expect(label3Container).toHaveTextContent('');
        expect(label4Container).toHaveTextContent('');
        fireEvent.keyDown(label1Container, {key: 'a'})
        expect(label1Container).toHaveTextContent(A_PRESSED);
        expect(label2Container).toHaveTextContent('');
        expect(label3Container).toHaveTextContent(A_PRESSED);
        expect(label4Container).toHaveTextContent('');
    })
    it('Should trigger only functions related to B button, leaving A not touched', () => {
        render(<Components/>);
        const label1Container = screen.getByTestId(LABEL_1_ID);
        const label2Container = screen.getByTestId(LABEL_2_ID);
        const label3Container = screen.getByTestId(LABEL_3_ID);
        const label4Container = screen.getByTestId(LABEL_4_ID);
        expect(label1Container).toHaveTextContent('');
        expect(label2Container).toHaveTextContent('');
        expect(label3Container).toHaveTextContent('');
        expect(label4Container).toHaveTextContent('');
        fireEvent.keyDown(label1Container, {key: 'b', ctrlKey: true})
        expect(label1Container).toHaveTextContent('');
        expect(label2Container).toHaveTextContent(CTRL_B_PRESSED);
        expect(label3Container).toHaveTextContent('');
        expect(label4Container).toHaveTextContent(CTRL_B_PRESSED);
    })
    it.only('Should pause and resume setting an a character', () => {
        render(<Components/>)
        const label1Container = screen.getByTestId(LABEL_1_ID);
        const lockAEvent = screen.getByText(BUTTON_LOCK_AA);
        const unlockAEvent = screen.getByText(BUTTON_UNLOCK_AA);
        expect(label1Container).toHaveTextContent('');
        act(() => lockAEvent.click());
        fireEvent.keyDown(label1Container, {key: 'a'});
        expect(label1Container).toHaveTextContent('');
        act(() => unlockAEvent.click());
        fireEvent.keyDown(label1Container, {key: 'a'})
        expect(label1Container).toHaveTextContent(A_PRESSED);
    })
    it.only('Should pause and resume setting a b character, while setting a should work all the time', () => {
        render(<Components/>)
        const labelAContainer = screen.getByTestId(LABEL_1_ID);
        const labelBContainer = screen.getByTestId(LABEL_2_ID);
        const lockBEvent = screen.getByText(BUTTON_LOCK_CTRL_BA);
        const unlockBEvent = screen.getByText(BUTTON_UNLOCK_CTRL_BA);
        expect(labelAContainer).toHaveTextContent('');
        expect(labelBContainer).toHaveTextContent('');
        act(() => lockBEvent.click());
        fireEvent.keyDown(labelAContainer, {key: 'a'});
        fireEvent.keyDown(labelAContainer, {key: 'b', ctrlKey: true});
        expect(labelBContainer).toHaveTextContent('');
        expect(labelAContainer).toHaveTextContent(A_PRESSED);
        act(() => unlockBEvent.click());
        fireEvent.keyDown(labelBContainer, {key: 'b', ctrlKey: true})
        expect(labelBContainer).toHaveTextContent(CTRL_B_PRESSED);
    })

})
