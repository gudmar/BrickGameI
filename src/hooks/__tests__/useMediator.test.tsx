import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useMediator } from "../useMediator";

const SET_1 = "set 1";
const SET_2 = "set 2";
const SET_3 = "set 3";
const SET_4 = "set 4";
const SET_5 = "set 5";
const SET_6 = "set 6";

const BUTTON_1 = 'Button 1';
const BUTTON_2 = 'Button 2';
const BUTTON_3 = 'Button 3';
const BUTTON_4 = 'Button 4';
const BUTTON_5 = 'Button 5';
const BUTTON_6 = 'Button 6';


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

// ==========================================================

const ComponentC = () => {
    const [val1, val2, val3] = useMediator([
        { eventType: SET_1, initialValue: 0 },
        { eventType: SET_2, initialValue: 0 },
        { eventType: SET_3, initialValue: 0 },
    ])
    const emit = useMediator();
    const onClick1 = () => {emit(SET_4, 1)}
    const onClick2 = () => {emit(SET_5, 2)}
    const onClick3 = () => {emit(SET_6, 3)}

    return (
        <div>
            <span data-testid="val1">{val1}</span>
            <span data-testid="val2">{val2}</span>
            <span data-testid="val3">{val3}</span>
            <button data-testid='b1' onClick = {onClick1}>BUTTON_1</button>
            <button data-testid='b2' onClick = {onClick2}>BUTTON_2</button>
            <button data-testid='b3' onClick = {onClick3}>BUTTON_3</button>
        </div>
    )
}

const ComponentD = () => {
    const [val4, val5, val6] = useMediator([
        { eventType: SET_4, initialValue: 0 },
        { eventType: SET_5, initialValue: 0 },
        { eventType: SET_6, initialValue: 0 },
    ])
    const emit = useMediator();
    const onClick1 = () => {emit(SET_1, 1)}
    const onClick2 = () => {emit(SET_2, 2)}
    const onClick3 = () => {emit(SET_3, 3)}

    return (
        <div>
            <span data-testid="val4">{val4}</span>
            <span data-testid="val5">{val5}</span>
            <span data-testid="val6">{val6}</span>
            <button data-testid='b4' onClick = {onClick1}>BUTTON_4</button>
            <button data-testid='b5' onClick = {onClick2}>BUTTON_5</button>
            <button data-testid='b6' onClick = {onClick3}>BUTTON_6</button>
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
const Wrapper2 = () => {
    return (
        <>
            <ComponentC />
            <ComponentD />
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

    it('Should make component A change component B and component B change component A', () => {
        render(<Wrapper2/>);
        const button1 = screen.getByTestId('b1');
        const button2 = screen.getByTestId('b2');
        const button3 = screen.getByTestId('b3');
        const button4 = screen.getByTestId('b4');
        const button5 = screen.getByTestId('b5');
        const button6 = screen.getByTestId('b6');
        const span1 = screen.getByTestId('val1');
        const span2 = screen.getByTestId('val2');
        const span3 = screen.getByTestId('val3');
        const span4 = screen.getByTestId('val4');
        const span5 = screen.getByTestId('val5');
        const span6 = screen.getByTestId('val6');

        fireEvent.click(button1);
        expect(span4).toHaveTextContent('1');
        expect(span5).toHaveTextContent('0');
        expect(span6).toHaveTextContent('0');
        fireEvent.click(button2);
        expect(span4).toHaveTextContent('1');
        expect(span5).toHaveTextContent('2');
        expect(span6).toHaveTextContent('0');
        fireEvent.click(button3);
        expect(span4).toHaveTextContent('1');
        expect(span5).toHaveTextContent('2');
        expect(span6).toHaveTextContent('3');

        fireEvent.click(button4);
        expect(span4).toHaveTextContent('1');
        expect(span5).toHaveTextContent('2');
        expect(span6).toHaveTextContent('3');
        expect(span1).toHaveTextContent('1');
        expect(span2).toHaveTextContent('0');
        expect(span3).toHaveTextContent('0');

        fireEvent.click(button5);
        expect(span4).toHaveTextContent('1');
        expect(span5).toHaveTextContent('2');
        expect(span6).toHaveTextContent('3');
        expect(span1).toHaveTextContent('1');
        expect(span2).toHaveTextContent('2');
        expect(span3).toHaveTextContent('0');

        fireEvent.click(button6);
        expect(span4).toHaveTextContent('1');
        expect(span5).toHaveTextContent('2');
        expect(span6).toHaveTextContent('3');
        expect(span1).toHaveTextContent('1');
        expect(span2).toHaveTextContent('2');
        expect(span3).toHaveTextContent('3');

    })

})
