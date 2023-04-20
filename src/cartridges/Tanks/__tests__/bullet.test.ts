import { directions, Variants } from "../../../types/types";
import { getEmptyBoard } from "../../constants";
import { GameCreator } from "../../GameCreator";
import { Bullet } from "../bullet";
import { Tank } from "../tank";

const runFunctionTimes = (func: () => any, times:number) => {
    const runner = (func: () => any, iteration:number) => {
        if (iteration < times) {
            runner(func, iteration + 1);
            func();
        }
    }
    runner(func, 0);
}

describe('Bullet tests', () => {
    let board = getEmptyBoard();
    const visitedObject: GameCreator = {} as GameCreator;
    afterEach(() => {
        board = getEmptyBoard();
        Tank.instances = [];
        Bullet.instances = [];
    })
    describe('Player bullet', () => {
        it('Should create player bullet that moves in its direction', () => {
            const playerBullet = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 19},
                direction: directions.UP,
                hitCallback: () => {}
            })
            const {col: startCol, row: startRow} = playerBullet.cords;
            runFunctionTimes(playerBullet.move.bind(playerBullet, visitedObject), 3)
            const {col: endCol, row: endRow} = playerBullet.cords;
            expect(startCol).toBe(9);
            expect(startRow).toBe(19);
            expect(endCol).toBe(9);
            expect(endRow).toBe(16);
        });
        it('Should create multiple bullets and keep track of them', () => {

        })
        it('Should destroy bullet when it hits end of board', () => {

        })  
        it('Should destroy board brick when hits it', () => {

        })  
        it('Should destroy (unplace) enemy tank', () => {

        })
        it('Should not destroy bullet of the same type when hits one', () => {

        })
    })
    describe('Enemy bullet tests', () => {
        it('Should create enemy bullet and move it in its direction', () => {

        })
        it('Should destroy enemy bullet when it hits end of board', () => {

        })
        it('Should destroy enemy bullet when it hits enemy tank, but leave tank not harmed', () => {

        })
        it('Should destroy enemy bullet when reaches wall, but leave wall untached', () => {

        })
        it('Should destroy player tank and bullet when reaches player tank', () => {

        })
        it('Should not destroy any of bullets, when enemy bullets meet', () => {

        })
        it('Should destroy both: oponent and player bullet when bullets meet (meet on the same field case: 0 0 1 0 1 0)', () => {

        })
        it('Should destroy both: oponent and player bullet when bullets meet (not meet case: both bullets on neighbouring fields, and in next frame they would be on neighbours one after another 0 0 1 1 0 0)', () => {

        })
        it('Should destroy both: oponent and player bullet when bullets met in 90 deg', () => {

        })
        it('Should not destroy any of bullets when bullets are on neighbouring bricks, but they are 90 deg', () => {

        })
        it('Should not be possible for 2 bullets from enemy tank to exist at the same time', ()=>{

        })
    })
})