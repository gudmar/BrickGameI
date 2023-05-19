import { runFunctionTimes } from "../../../functions/runFunctionTimes";
import { directions, Variants } from "../../../types/types";
import { getEmptyBoard } from "../../constants";
import { GameCreator } from "../../GameCreator";
import { Bullet } from "../bullet";
import { Tank } from "../tank";
import { TankPlacePositionProvider } from "../tankCommander";
import { TankDecorator, TankVisitor } from "../tanks";

describe('Testing tank.shot', () => {

    const tankInstance = {} as TankVisitor;
    const visitedObject = {
        pawnLayer: getEmptyBoard(),
        background: getEmptyBoard(),
    } as GameCreator;

    beforeEach(() => {
        Tank.instances = [];
        Bullet.instances = [];
        visitedObject.pawnLayer = getEmptyBoard();
        visitedObject.background = getEmptyBoard();
    })
    afterEach(() => {
        Tank.instances = [];
        Bullet.instances = [];
        TankPlacePositionProvider.nrOfTankPlacedSinceGameStart = 0;
    })

    it('Should shot bullet from tank aiming up (not to border), return true', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 5, col: 5};
        enemyTank.direction = directions.UP;
        const outcome = enemyTank.shot(visitedObject);
        const bullet = Bullet.instances[0];
        expect(Bullet.instances.length).toBe(1);
        expect(bullet.cords).toEqual({col: 5, row: 3})
        expect(outcome).toBeTruthy();
    });
    it('Should  shot bullet from tank aiming left (not edge), return true', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 5, col: 5};
        enemyTank.direction = directions.LEFT;
        const outcome = enemyTank.shot(visitedObject);
        const bullet = Bullet.instances[0];
        expect(Bullet.instances.length).toBe(1);
        expect(bullet.cords).toEqual({col: 3, row: 5})
        expect(outcome).toBeTruthy();
    })
    it('Shoud shot bullet from tank aiming right (not edge), return true', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 5, col: 5};
        enemyTank.direction = directions.RIGHT;
        const outcome = enemyTank.shot(visitedObject);
        const bullet = Bullet.instances[0];
        expect(Bullet.instances.length).toBe(1);
        expect(bullet.cords).toEqual({col: 7, row: 5})
        expect(outcome).toBeTruthy();
    })
    it('Should shot bullet from tank aiming down (not edge), return true', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 5, col: 5};
        enemyTank.direction = directions.DOWN;
        const outcome = enemyTank.shot(visitedObject);
        const bullet = Bullet.instances[0];
        expect(Bullet.instances.length).toBe(1);
        expect(bullet.cords).toEqual({col: 5, row: 7})
        expect(outcome).toBeTruthy();
    })

    it('Should NOT shot bullet from tank aiming up (edge case), return false', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 1, col: 5};
        enemyTank.direction = directions.UP;
        const outcome = enemyTank.shot(visitedObject);
        expect(Bullet.instances.length).toBe(0);
        expect(outcome).toBeFalsy();
    });
    it('Should  shot bullet from tank aiming left (not edge), return false', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 5, col: 1};
        enemyTank.direction = directions.LEFT;
        const outcome = enemyTank.shot(visitedObject);
        expect(Bullet.instances.length).toBe(0);
        expect(outcome).toBeFalsy();
    })
    it('Shoud shot bullet from tank aiming right (not edge), return false', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 5, col: 8};
        enemyTank.direction = directions.RIGHT;
        const outcome = enemyTank.shot(visitedObject);
        expect(Bullet.instances.length).toBe(0);
        expect(outcome).toBeFalsy();
    })
    it('Should shot bullet from tank aiming down (not edge), return false', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 18, col: 5};
        enemyTank.direction = directions.DOWN;
        const outcome = enemyTank.shot(visitedObject);
        expect(Bullet.instances.length).toBe(0);
        expect(outcome).toBeFalsy();
    })

    it('Should not fire more than 1 bullet at the time if enemy tank, should return false', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const playerTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.PLAYER)!;
        playerTank.cords = {row: 14, col: 5};
        playerTank.direction = directions.UP;
        const action = () => {    
            playerTank.shot(visitedObject);
            Bullet.moveAllBullets(tankInstance, visitedObject);
        }
        runFunctionTimes(action, 8)
        expect(Bullet.instances.length).toBe(4);
    })
    it('Should empty enemyBullets field when bullet hits wall', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const visitedObjectWithObstacle = {
            pawnLayer: getEmptyBoard(),
            background: getEmptyBoard(),
        } as GameCreator;
        visitedObjectWithObstacle.background[2] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.PLAYER)!;
        enemyTank.cords = {row: 5, col: 5};
        enemyTank.direction = directions.UP;
        enemyTank.shot(visitedObjectWithObstacle);
        const action = () => {Bullet.moveAllBullets(tankInstance, visitedObjectWithObstacle);}
        runFunctionTimes(action, 3)
        expect(Bullet.instances.length).toBe(0);
        expect(enemyTank.nrOfBulletsShot).toBe(0);
    })
    it('Should empty enemyBullets field when bullet hits enemy tank', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.PLAYER)!;
        enemyTank.cords = {row: 5, col: 8};
        enemyTank.direction = directions.UP;
        enemyTank.shot(visitedObject);
        const action = () => {Bullet.moveAllBullets(tankInstance, visitedObject);}
        runFunctionTimes(action, 2)
        expect(Bullet.instances.length).toBe(0);
        expect(enemyTank.nrOfBulletsShot).toBe(0);        
    })
    it('Should empty enemyBullets field when bullet hits player tank', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 10, col: 4};
        enemyTank.direction = directions.DOWN;
        enemyTank.shot(visitedObject);
        const action = () => {Bullet.moveAllBullets(tankInstance, visitedObject);}
        runFunctionTimes(action, 2)
        expect(Bullet.instances.length).toBe(0);
        expect(enemyTank.nrOfBulletsShot).toBe(0);                
    })
    it('Should empty enemyBullets field when bullet reaches end of the board', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 5, col: 5};
        enemyTank.direction = directions.UP;
        enemyTank.shot(visitedObject);
        const action = () => {Bullet.moveAllBullets(tankInstance, visitedObject);}
        runFunctionTimes(action, 4)
        expect(Bullet.instances.length).toBe(0);
        expect(enemyTank.nrOfBulletsShot).toBe(0);   
    })

    it('Should not produce more then 4 bullets at the time when player tank', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.ENEMY)!;
        enemyTank.cords = {row: 5, col: 5};
        enemyTank.direction = directions.UP;
        const outcome = enemyTank.shot(visitedObject);
        Bullet.moveAllBullets(tankInstance, visitedObject);
        const outcome2 = enemyTank.shot(visitedObject);
        const bullet = Bullet.instances[0];
        expect(Bullet.instances.length).toBe(1);
        expect(bullet.cords).toEqual({col: 5, row: 2})
        expect(outcome).toBeTruthy();
        expect(outcome2).toBeFalsy();
    })

    it('Should destroy brick when bullet is created on wall brick', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const visitedObjectWithObstacle = {
            pawnLayer: getEmptyBoard(),
            background: getEmptyBoard(),
        } as GameCreator;
        visitedObjectWithObstacle.background[3] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
        const enemyTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.PLAYER)!;
        enemyTank.cords = {row: 5, col: 5};
        enemyTank.direction = directions.UP;
        enemyTank.shot(visitedObjectWithObstacle);
        expect(Bullet.instances.length).toBe(0);
        expect(enemyTank.nrOfBulletsShot).toBe(0);
        expect(visitedObjectWithObstacle.background[3]).toEqual([1, 1, 1, 1, 1, 0, 1, 1, 1]);
    })

    it('Should destroy oponent tank, when bullet is created on it', () => {
        const tanks = new TankDecorator() as GameCreator;
        tanks.startGame();
        const playerTank: Tank = Tank.instances.find((instance) => instance.variant === Variants.PLAYER)!;
        playerTank.cords = {row: 3, col: 8};
        playerTank.direction = directions.UP;
        playerTank.shot(visitedObject);
        const nrOfPlacedTanks = Tank.instances.filter(({ isPlacedOnBoard }) => isPlacedOnBoard === true).length;
        expect(Bullet.instances.length).toBe(0);
        expect(playerTank.nrOfBulletsShot).toBe(0);
        expect(nrOfPlacedTanks).toBe(3)

    })
    

})