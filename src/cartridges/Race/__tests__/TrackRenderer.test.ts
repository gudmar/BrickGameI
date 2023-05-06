import { CAR_PERIOD } from "../constants"

describe('Testing track renderer', () => {
    describe('Rendering empty board correctly', () => {
        it('Should render 00 game phase 0 empty track bit correctly', () => {

        })
        it('Should render 00 game phase 1 empty track bit correctly', () => {

        })
        it('Should render 00 game phase 2 empty track bit correctly', () => {

        })
        it('Should render 00 game phase 4 empty track bit correctly', () => {

        })
        it('Should render 00 game phase 5 empty track bit correctly', () => {

        })
        it('Should render 00 game phase 6 empty track bit correctly', () => {

        })
        it('Should render 00 game phase 8 empty track bit correctly', () => {

        })
        it('Should render 00 game phase 10 empty track bit correctly', () => {

        })
        it('Should render 00 game phase 13 empty track bit correctly', () => {

        })

    })
    describe('Rendering bits', () => {
        it('Should render 00 correctly', () => {

        })
        it('Should render 01 correctly', () => {
    
        })
        it('Should render 10 correctly', () => {
    
        })
        it('Should render 10 correctly if game phase is 2', () => {

        })
    })
    describe('Rendering board NOTE: sides of track move slower, once per 2 ticks', () => {
        it('Should render initial board 00 00 01 with phase 0 correctly', () => {

        })
        it('Should render initial board 00 00 10 with phase 1 correctly', () => {

        })
        it('Should render initial board 00 00 10 with phase 2 correctly', () => {

        })
        it(`Should  render initial board 00 00 10 with pahse ${CAR_PERIOD} correctly`, () => {

        })
        it(`Should render board 00 01 10 with phase ${CAR_PERIOD - 1} correctly (switch start index back to 0)`, () => {

        })
    })
})