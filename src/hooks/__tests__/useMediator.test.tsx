import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useMediator } from "../useMediator";

const SET_1 = "set 1";
const SET_2 = "set 2";
const SET_3 = "set 3";
const BUTTON_1 = 'Button 1';
const BUTTON_2 = 'Button 2';
const BUTTON_3 = 'Button 3';

const ComponentA = () => {
    const emit = useMediator();
    const onClick1 = () => {emit(SET_1, 1)}
    const onClick2 = () => {emit(SET_2, 2)}
    const onClick3 = () => {emit(SET_3, 3)}
    return (
        <>
            <button data-testid='b1' onClick = {onClick1}>BUTTON_1</button>
            <button data-testid='b2' onClick = {onClick2}>BUTTON_2</button>
            <button data-testid='b3' onClick = {onClick3}>BUTTON_3</button>
        </>
    )
}

const ComponentB = () => {
    const [val1, val2, val3] = useMediator([
        { eventType: SET_1, initialValue: 0 },
        { eventType: SET_2, initialValue: 0 },
        { eventType: SET_3, initialValue: 0 },
    ])
    return (
        <div>
            <span data-testid="val1">{val1}</span>
            <span data-testid="val2">{val2}</span>
            <span data-testid="val3">{val3}</span>
        </div>
    )
}

const Wrapper = () => {
    return (
        <>
            <ComponentA />
            <ComponentB />
        </>
    )
}

describe('Testing useMediator with React testing library', () => {
    it('Should render ComponentA with 3 buttons', () => {
        render(<Wrapper/>);
        const button1 = screen.getByTestId('b1');
        const button2 = screen.getByTestId('b2');
        const button3 = screen.getByTestId('b3');
        expect(button1).toBeInTheDocument();
        expect(button2).toBeInTheDocument();
        expect(button3).toBeInTheDocument();
    })
    it('Should render ComponentB with 3 spanns with text 0', () => {
        render(<Wrapper/>);
        const span1 = screen.getByTestId('val1');
        const span2 = screen.getByTestId('val2');
        const span3 = screen.getByTestId('val3');
        expect(span1).toHaveTextContent('0');
        expect(span2.textContent).toEqual('0');
        expect(span3).toHaveTextContent('0');
    })
    it('Should change componentB when buttons clicked', () => {
        render(<Wrapper/>);
        const button1 = screen.getByTestId('b1');
        const button2 = screen.getByTestId('b2');
        const button3 = screen.getByTestId('b3');
        const span1 = screen.getByTestId('val1');
        const span2 = screen.getByTestId('val2');
        const span3 = screen.getByTestId('val3');
        fireEvent.click(button1);
        expect(span1).toHaveTextContent('1');
        expect(span2).toHaveTextContent('0');
        expect(span3).toHaveTextContent('0');
        fireEvent.click(button2);
        expect(span1).toHaveTextContent('1');
        expect(span2).toHaveTextContent('2');
        expect(span3).toHaveTextContent('0');
        fireEvent.click(button3);
        expect(span1).toHaveTextContent('1');
        expect(span2).toHaveTextContent('2');
        expect(span3).toHaveTextContent('3');


    })
})
