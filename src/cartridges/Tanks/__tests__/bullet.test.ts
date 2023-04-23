import { directions, Variants } from "../../../types/types";
import { getEmptyBoard } from "../../constants";
import { GameCreator } from "../../GameCreator";
import { Bullet } from "../bullet";
import { Tank } from "../tank";
import { TankDecorator } from "../tanks";

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
    describe('Player bullet', () => {
        beforeEach(() => {
            visitedObject.background = board;
            Bullet.instances = [];
            Tank.instances = [];
            board = getEmptyBoard();
        })
        it('Should create player bullet that moves in its direction', () => {
            const playerBullet = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 19},
                direction: directions.UP,
                hitCallback: () => {}
            })
            console.log(visitedObject)
            const {col: startCol, row: startRow} = playerBullet.cords;
            runFunctionTimes(playerBullet.move.bind(playerBullet, visitedObject), 3)
            const {col: endCol, row: endRow} = playerBullet.cords;
            expect(startCol).toBe(9);
            expect(startRow).toBe(19);
            expect(endCol).toBe(9);
            expect(endRow).toBe(16);
        });
        it('Should create multiple bullets and keep track of them', () => {
            //eslint-disable-next-line
            const bullet1 = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 19},
                direction: directions.UP,
                hitCallback: () => {}
            })
            Bullet.moveAllBullets(visitedObject);
            //eslint-disable-next-line
            const bullet2 = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 19},
                direction: directions.UP,
                hitCallback: () => {}
            })
            runFunctionTimes(() => {
                Bullet.moveAllBullets(visitedObject);
            }, 2);
            //eslint-disable-next-line
            const bullet3 = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 19},
                direction: directions.UP,
                hitCallback: () => {}
            })
            runFunctionTimes(() => {
                Bullet.moveAllBullets(visitedObject);
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
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyed).toBeTruthy();
        })  
        it('Should destroy board brick when hits it', () => {
            var shouldBeDestroyed = false;
            visitedObject.background[5] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            //eslint-disable-next-line
            const playerBullet = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 0, row: 0},
                direction: directions.DOWN,
                hitCallback: () => {shouldBeDestroyed = true}
            })
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 6)
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyed).toBeTruthy();
            expect(visitedObject.background[5][0]).toBe(0)
        })  
        it('Should destroy (unplace) enemy tank', () => {
            var shouldBeDestroyed = false;
            const tanks = new TankDecorator() as GameCreator;
            tanks.startGame();
            //eslint-disable-next-line
            const playerBullet = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 5},
                direction: directions.UP,
                hitCallback: () => {shouldBeDestroyed = true}
            })
            expect(Tank.instances.length).toBe(4);
            const notPlacedTanksBefore = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 5)
            const notPlacedTanksAfter = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyed).toBeTruthy();
            expect(notPlacedTanksBefore).toBe(0);
            expect(notPlacedTanksAfter).toBe(1);
        })
        it('Should not destroy tank but destroy bullet of the same type when hits one', () => {
            var shouldBeDestroyed = false;
            const tanks = new TankDecorator() as GameCreator;
            tanks.startGame();
            //eslint-disable-next-line
            const playerBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 5},
                direction: directions.UP,
                hitCallback: () => {shouldBeDestroyed = true}
            })
            expect(Tank.instances.length).toBe(4);
            const notPlacedTanksBefore = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 5)
            const notPlacedTanksAfter = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyed).toBeTruthy();
            expect(notPlacedTanksBefore).toBe(0);
            expect(notPlacedTanksAfter).toBe(0);
        })
    })

    describe('Enemy bullet tests', () => {
        beforeEach(() => {
            visitedObject.background = board;
            Bullet.instances = [];
            Tank.instances = [];
            console.log('SECOND DESCRIBE', Bullet.instances)
            board = getEmptyBoard();
        })
        it('Should create enemy bullet and move it in its direction', () => {
            const playerBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 3},
                direction: directions.DOWN,
                hitCallback: () => {}
            })
            const {col: startCol, row: startRow} = playerBullet.cords;
            runFunctionTimes(playerBullet.move.bind(playerBullet, visitedObject), 3)
            const {col: endCol, row: endRow} = playerBullet.cords;
            expect(startCol).toBe(9);
            expect(startRow).toBe(3);
            expect(endCol).toBe(9);
            expect(endRow).toBe(6);
        })
        it('Should destroy enemy bullet when it hits end of board', () => {
            const playerBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 3},
                direction: directions.UP,
                hitCallback: () => {}
            })
            runFunctionTimes(playerBullet.move.bind(playerBullet, visitedObject), 4)
            expect(Bullet.instances.length).toBe(0);
            
        })
        it('Should destroy enemy bullet when it hits enemy tank, but leave tank not harmed', () => {
            var shouldBeDestroyed = false;
            const tanks = new TankDecorator() as GameCreator;
            tanks.startGame();
            //eslint-disable-next-line
            const playerBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 5},
                direction: directions.UP,
                hitCallback: () => {shouldBeDestroyed = true}
            })
            expect(Tank.instances.length).toBe(4);
            const notPlacedTanksBefore = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 5)
            const notPlacedTanksAfter = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyed).toBeTruthy();
            expect(notPlacedTanksBefore).toBe(0);
            expect(notPlacedTanksAfter).toBe(0);
        })
        it('Should destroy enemy bullet when reaches wall, should destroy walls brick', () => {
            var shouldBeDestroyed = false;
            visitedObject.background[5] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            //eslint-disable-next-line
            const playerBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 0, row: 0},
                direction: directions.DOWN,
                hitCallback: () => {shouldBeDestroyed = true}
            })
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 6)
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyed).toBeTruthy();
            expect(visitedObject.background[5][0]).toBe(0)
        })
        it('Should destroy player tank and bullet when reaches player tank', () => {
            var shouldBeDestroyed = false;
            const tanks = new TankDecorator() as GameCreator;
            tanks.startGame();
            //eslint-disable-next-line
            const enemyBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 14},
                direction: directions.DOWN,
                hitCallback: () => {shouldBeDestroyed = true}
            })
            expect(Tank.instances.length).toBe(4);
            const notPlacedTanksBefore = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            const notPlacedTanksAfter = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 5)
            const checkIfPlayerTankUplaced = () => {
                const playerTank = Tank.instances.find(tank => tank.variant === Variants.PLAYER);
                const isUnplaced = playerTank!.isPlacedOnBoard === false
                return isUnplaced;
            }
            const isPlayerTankUnplaced = checkIfPlayerTankUplaced();
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyed).toBeTruthy();
            expect(notPlacedTanksBefore).toBe(0);
            expect(notPlacedTanksAfter).toBe(0);
            expect(isPlayerTankUnplaced).toBeTruthy();
        })
        it('Should not destroy enemy tank if enemy bulet hits it', () => {
            var shouldBeDestroyed = false;
            const tanks = new TankDecorator() as GameCreator;
            tanks.startGame();
            const notPlacedTanksAfter = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            //eslint-disable-next-line
            const enemyBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 5},
                direction: directions.UP,
                hitCallback: () => {shouldBeDestroyed = true}
            })
            expect(Tank.instances.length).toBe(4);
            const notPlacedTanksBefore = Tank.instances.filter((tank) => tank.isPlacedOnBoard === false).length
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 5)
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyed).toBeTruthy();
            expect(notPlacedTanksBefore).toBe(0);
            expect(notPlacedTanksAfter).toBe(0);
        })
        it('Should not destroy any of bullets, when enemy bullets meet', () => {
            var shouldBeDestroyedA = false;
            var shouldBeDestroyedB = false;
            const enemyBulletA = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 5},
                direction: directions.DOWN,
                hitCallback: () => {shouldBeDestroyedA = true}
            })
            const enemyBulletB = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 7},
                direction: directions.UP,
                hitCallback: () => {shouldBeDestroyedB = true}
            })
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 3)
            const { row: rowA } = enemyBulletA.cords;
            const { row: rowB } = enemyBulletB.cords;
            expect(Bullet.instances.length).toBe(2);
            expect(rowA).toBe(8);
            expect(rowB).toBe(4);
            expect(shouldBeDestroyedA && shouldBeDestroyedB).toBeFalsy();
        })
        it('Should destroy both: oponent and player bullet when bullets meet (meet on the same field case: 0 0 1 0 1 0)', () => {
            var shouldBeDestroyedA = false;
            var shouldBeDestroyedB = false;
            //eslint-disable-next-line
            const enemyBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 5},
                direction: directions.DOWN,
                hitCallback: () => {shouldBeDestroyedA = true}
            })
            //eslint-disable-next-line
            const playerBullet = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 7},
                direction: directions.UP,
                hitCallback: () => {shouldBeDestroyedB = true}
            })
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 2)
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyedA && shouldBeDestroyedB).toBeTruthy();
        })
        
        it('Should destroy both: oponent and player bullet when bullets meet (not meet case: both bullets on neighbouring fields, and in next frame they would be on neighbours one after another 0 0 1 1 0 0)', () => {
            var shouldBeDestroyedA = false;
            var shouldBeDestroyedB = false;
            //eslint-disable-next-line
            const enemyBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 5},
                direction: directions.DOWN,
                hitCallback: () => {shouldBeDestroyedA = true}
            })
            //eslint-disable-next-line
            const playerBullet = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 9, row: 8},
                direction: directions.UP,
                hitCallback: () => {shouldBeDestroyedB = true}
            })
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 2)
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyedA && shouldBeDestroyedB).toBeTruthy();
        })
        it('Should destroy both: oponent and player bullet when bullets met in 90 deg', () => {
            var shouldBeDestroyedA = false;
            var shouldBeDestroyedB = false;
            //eslint-disable-next-line
            const enemyBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 9, row: 5},
                direction: directions.DOWN,
                hitCallback: () => {shouldBeDestroyedA = true}
            })
            //eslint-disable-next-line
            const playerBullet = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 8, row: 6},
                direction: directions.RIGHT,
                hitCallback: () => {shouldBeDestroyedB = true}
            })
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 2)
            expect(Bullet.instances.length).toBe(0);
            expect(shouldBeDestroyedA && shouldBeDestroyedB).toBeTruthy();
        })
        it('Should not destroy any of bullets when bullets are on neighbouring bricks, but they are 90 deg', () => {
            var shouldBeDestroyedA = false;
            var shouldBeDestroyedB = false;
            //eslint-disable-next-line
            const enemyBullet = new Bullet({
                variant: Variants.ENEMY,
                startCords: {col: 7, row: 5},
                direction: directions.DOWN,
                hitCallback: () => {shouldBeDestroyedA = true}
            })
            //eslint-disable-next-line
            const playerBullet = new Bullet({
                variant: Variants.PLAYER,
                startCords: {col: 5, row: 6},
                direction: directions.RIGHT,
                hitCallback: () => {shouldBeDestroyedB = true}
            })
            runFunctionTimes(() => Bullet.moveAllBullets(visitedObject), 4)
            expect(Bullet.instances.length).toBe(2);
            expect(shouldBeDestroyedA && shouldBeDestroyedB).toBeFalsy();
        })
        it('Should not be possible for 2 bullets from enemy tank to exist at the same time', ()=>{

        })
    })
})