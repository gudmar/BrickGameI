import { render, screen } from "@testing-library/react";
// import { Clock as OriginalClock } from "../../functions/Clock";
import { Clock } from "../../functions/Clock";
import { useTimer } from "../useClock"
jest.mock('../../functions/Clock');


const addEventListenerMock = jest.fn();
addEventListenerMock.mockImplementation((onTick) => {
    for(let i = 0; i < 10; i++) {
        onTick(i);
        
    }
    return (()=>{})
})

Clock.prototype.addEventListener = (onTick) => {
    for(let i = 0; i < 101; i++) {
        onTick(i);
        
    }
    return (()=>{})
};

Clock.mockImplementation(() => {
    return {
        addEventListener: addEventListenerMock,
    }
})

const TestTime = () => {
    const time_1 = useTimer(1);
    const time_10 = useTimer(10);
    return (
        <>
            <div data-testid="time_1">{time_1}</div>
            <div data-testid="time_10">{time_10}</div>
        </>
    )

}

describe('Testing useClock and if it really divides time', () => {
    it('Should return 10 in case speed is 10 and should return 1 in case speed is 1 and there are 100 ticks', () => {
        render(<TestTime />);
        const time1 = screen.getByTestId('time_1');
        const time2 = screen.getByTestId('time_10');
        expect(time2).toHaveTextContent('10');
        expect(time1).toHaveTextContent('1');
    })
})