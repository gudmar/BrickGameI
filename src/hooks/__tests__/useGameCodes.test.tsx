import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { KeyReader } from '../../functions/KeyReader';
import { useGameCodes } from '../useGameCodes';

const TEST_ID = 'condeContainer';

const TestComponent = () => {
    const matchedCode = useGameCodes(['IDKFA', 'it is a good day to die', 'IDDQD']);
    return (
        <div data-testid={TEST_ID}>
            {matchedCode}
        </div>
    )
}

describe('Testing useGameCode', () => {
    afterEach(() => delete KeyReader.instance)
    it('Should not return new value if not full match', () => {
        render(<TestComponent/>)
        const container = screen.getByTestId(TEST_ID);
        const code = 'IDFK';
        code.split('').forEach((char) => fireEvent.keyDown(container, { key: char }));
        expect(container).toHaveTextContent('');
    });
    it('Should not return new value if wrong match', () => {
        render(<TestComponent/>)
        const container = screen.getByTestId(TEST_ID);
        const code = 'IDFDD';
        code.split('').forEach((char) => fireEvent.keyDown(container, { key: char }));
        expect(container).toHaveTextContent('');
    });
    it('Should return a value if full match', () => {
        render(<TestComponent/>)
        const container = screen.getByTestId(TEST_ID);
        const code = 'IDKFA';
        code.split('').forEach((char) => fireEvent.keyDown(container, { key: char }));
        expect(container).toHaveTextContent('IDKFA');
    });
    it('Should clear matched value after match and next char inputted', () => {
        render(<TestComponent/>)
        const container = screen.getByTestId(TEST_ID);
        const code = 'IDKFA';
        code.split('').forEach((char) => fireEvent.keyDown(container, { key: char }));
        expect(container).toHaveTextContent('IDKFA');
        fireEvent.keyDown(container, { key: 'j' })
        expect(container).toHaveTextContent('');
    })
})

