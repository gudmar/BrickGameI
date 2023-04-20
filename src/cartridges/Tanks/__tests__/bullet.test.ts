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
            const bullet1 = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 19},
                direction: directions.UP,
                hitCallback: () => {}
            })
            bullet1.move(visitedObject);
            const bullet2 = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 19},
                direction: directions.UP,
                hitCallback: () => {}
            })
            runFunctionTimes(() => {
                bullet1.move(visitedObject);
                bullet2.move(visitedObject);    
            }, 2);
            const bullet3 = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 19},
                direction: directions.UP,
                hitCallback: () => {}
            })
            runFunctionTimes(() => {
                bullet1.move(visitedObject);
                bullet2.move(visitedObject);
                bullet3.move(visitedObject);
            }, 2);
            const {col: b1Col, row: b1Row} = Bullet.instances[0].cords;
            const {col: b2Col, row: b2Row} = Bullet.instances[1].cords;
            const {col: b3Col, row: b3Row} = Bullet.instances[2].cords;
            expect(b1Col === b2Col && b1Col === b3Col).toBeTruthy();
            expect(b3Row).toBe(17);
            expect(b2Row).toBe(15);
            expect(b1Row).toBe(14);
        })
        it('Should destroy bullet when it hits end of board', () => {
            var shouldBeDestroyed = false;
            const playerBullet = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 0, row: 0},
                direction: directions.RIGHT,
                hitCallback: () => {shouldBeDestroyed = true}
            })
            runFunctionTimes(playerBullet.move.bind(playerBullet, visitedObject), 10)
            // const {col: endCol, row: endRow} = playerBullet.cords;
            console.log('CORDS ', playerBullet.cords)
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyed).toBeTruthy();
            // expect(playerBullet).toBeUndefined();
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