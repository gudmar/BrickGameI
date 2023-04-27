import { runFunctionTimes } from "../../../functions/runFunctionTimes";
import { directions, Variants } from "../../../types/types";
import { getEmptyBoard } from "../../constants";
import { GameCreator } from "../../GameCreator";
import { Bullet } from "../bullet";
import { Tank } from "../tank"
import { TankDecorator } from "../tanks";

const preparePlayerTank = () => {
    const enemyTankInTheWay = Tank.instances.find(tank => tank.cords.row > 15 && tank.cords.col > 5 && tank.variant === Variants.ENEMY);
    if (enemyTankInTheWay) enemyTankInTheWay!.isPlacedOnBoard = false;
    const playerTank = Tank.instances.find(instance => instance.variant === Variants.PLAYER);
    playerTank!.cords = {col: 8, row: 18};
    playerTank!.direction = directions.LEFT;
    return playerTank;
}
const prepareEnemyTank = () => {
    const enemyTanks = Tank.instances.filter(instance => instance.variant === Variants.ENEMY);
    enemyTanks.forEach(tank => tank.isPlacedOnBoard = false);
    const tankForTests = enemyTanks[0];
    tankForTests.cords = {col: 1, row: 18};
    tankForTests.isPlacedOnBoard = true;
    tankForTests.direction = directions.RIGHT;
    return tankForTests;
}

describe('Testing score in Tanks', () => {
    let visitedObjectMock: any;
    beforeEach(() => {
        Tank.instances = [];
        Bullet.instances = [];
        visitedObjectMock = {
            score: 0,
            background: getEmptyBoard(),
            pawnLayer: getEmptyBoard(),
        }
        visitedObjectMock.background[5] = [1, 1, 1, 1, 1, 1, 1, 0, 1, 0];
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
    })
    it('Should add 100 points when enemy tank destroyed', () => {
        const playerTank = preparePlayerTank();
        prepareEnemyTank();
        playerTank!.shot(visitedObjectMock);
        runFunctionTimes(() => Bullet.moveAllBullets(visitedObjectMock), 9);
        expect(visitedObjectMock.score).toBe(100);
    })
    it('Should add 50 points when enemy bullet hit by player bullet', () => {
        const playerTank = preparePlayerTank();
        const enemyTank = prepareEnemyTank();
        playerTank!.shot(visitedObjectMock);
        enemyTank!.shot(visitedObjectMock);
        runFunctionTimes(() => Bullet.moveAllBullets(visitedObjectMock), 9);
        expect(visitedObjectMock.score).toBe(50);
    })
    it('Should add 10 points when player bullet hits brick', () => {
        const playerTank = preparePlayerTank();
        playerTank!.direction = directions.UP;
        playerTank!.shot(visitedObjectMock);
        runFunctionTimes(() => Bullet.moveAllBullets(visitedObjectMock), 19);
        expect(visitedObjectMock.score).toBe(10);
    })
    it('SHould not add points when enemy bullet hits wall', () => {
        const enemyTank = prepareEnemyTank();
        enemyTank!.shot(visitedObjectMock);
        runFunctionTimes(() => Bullet.moveAllBullets(visitedObjectMock), 19);
        expect(visitedObjectMock.score).toBe(0);
    }) 
    it('Should not add points when enemy bullet hits player tank', () => {
        preparePlayerTank();
        const enemyTank = prepareEnemyTank();
        enemyTank!.shot(visitedObjectMock);
        runFunctionTimes(() => Bullet.moveAllBullets(visitedObjectMock), 9);
        expect(visitedObjectMock.score).toBe(0);
    })
    it('Should not add points when enemy bullet hits enemy tank', () => {
        const playerTank = preparePlayerTank();
        const enemyTank = prepareEnemyTank();
        playerTank!.variant = Variants.ENEMY
        enemyTank!.shot(visitedObjectMock);
        runFunctionTimes(() => Bullet.moveAllBullets(visitedObjectMock), 9);
        expect(visitedObjectMock.score).toBe(0);
    })
    it('Should not add points when enemy bullet hits enemy bullet', () => {
        const playerTank = preparePlayerTank();
        const enemyTank = prepareEnemyTank();
        playerTank!.variant = Variants.ENEMY
        enemyTank!.shot(visitedObjectMock);
        playerTank!.shot(visitedObjectMock);
        runFunctionTimes(() => Bullet.moveAllBullets(visitedObjectMock), 9);
        expect(visitedObjectMock.score).toBe(0);
    })
})