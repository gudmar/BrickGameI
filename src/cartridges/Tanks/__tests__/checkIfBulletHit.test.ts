import { directions, Variants } from "../../../types/types"
import { Bullet } from "../bullet"
import { checkIfBulletHit } from "../checkIfBulletHit"
import { Tank } from "../tank"

const enemyDownTank = {
    variant: Variants.ENEMY,
    direction: directions.DOWN,
} as Tank;

const playerDownTank = {
    variant: Variants.PLAYER,
    direction: directions.DOWN,
} as Tank;

const playerLeftTank = {
    variant: Variants.PLAYER,
    direction: directions.LEFT,
} as Tank;

const playerRightTank = {
    variant: Variants.PLAYER,
    direction: directions.RIGHT,
} as Tank;

const playerUpTank = {
    variant: Variants.PLAYER,
    direction: directions.UP,
} as Tank;

const enemyRightTank = {
    variant: Variants.ENEMY,
    direction: directions.RIGHT,
} as Tank;

const enemyUpTank = {
    variant: Variants.ENEMY,
    direction: directions.UP,
} as Tank;

const enemyLeftTank = {
    variant: Variants.ENEMY,
    direction: directions.LEFT,
} as Tank;


describe('Testing checkIfBulletHit', () => {
    it('Should return false if bullets are of the same type', () => {
        const bulletA = new Bullet({
            sourceTank: enemyDownTank,
            startCords: {col: 5, row: 5},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: enemyDownTank,
            startCords: {col: 5, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeFalsy();
    })
    it('Should return true if bullets are of different type and cords are the same', () => {
        const bulletA = new Bullet({
            sourceTank: enemyDownTank,
            startCords: {col: 5, row: 5},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerDownTank,
            startCords: {col: 5, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeTruthy();
    })
    it('Should return false if bullets are of different type but cords are different', () => {
        const bulletA = new Bullet({
            sourceTank: enemyDownTank,
            startCords: {col: 1, row: 5},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerDownTank,
            startCords: {col: 5, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeFalsy();
    })
    it('Should return true if bullet A is in RIGHT, bullet B is LEFT and they are just one after another', () => {
        const bulletA = new Bullet({
            sourceTank: enemyRightTank,
            startCords: {col: 6, row: 5},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerLeftTank,
            startCords: {col: 5, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeTruthy();
    })
    it('Should return false if bullet A is in RIGHT, bullet B is LEFT and they are just one BEFORE another', () => {
        const bulletA = new Bullet({
            sourceTank: enemyRightTank,
            startCords: {col: 4, row: 5},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerLeftTank,
            startCords: {col: 5, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeFalsy();
    })

    it('Should return true if bullet A is in LEFT, bullet B is RIGHT and they are just one after another', () => {
        const bulletA = new Bullet({
            sourceTank: enemyLeftTank,
            startCords: {col: 6, row: 5},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerRightTank,
            startCords: {col: 7, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeTruthy();
    })
    it('Should return true if bullet A is in UP, bullet B is DOWN and they are just one after another', () => {
        const bulletA = new Bullet({
            sourceTank: enemyDownTank,
            startCords: {col: 6, row: 5},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerUpTank,
            startCords: {col: 6, row: 4},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeTruthy();
    })
    it('Should return true if bullet A is in DOWN, bullet B is UP and they are just one after another', () => {
        const bulletA = new Bullet({
            sourceTank: enemyUpTank,
            startCords: {col: 6, row: 4},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerDownTank,
            startCords: {col: 6, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeTruthy();
    })
    it('Should return true if bullet A is in UP, bullet B is LEFT and they are just one after another', () => {
        const bulletA = new Bullet({
            sourceTank: enemyUpTank,
            startCords: {col: 6, row: 4},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerLeftTank,
            startCords: {col: 6, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeFalsy();
    })
    it('Should return false in case A is DOWN B UP and one after another but columns are different', () => {
        const bulletA = new Bullet({
            sourceTank: enemyUpTank,
            startCords: {col: 6, row: 4},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerDownTank,
            startCords: {col: 7, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeFalsy();
    })
    it('Should return false in case B is DOWN A UP and one after another, but columns are different', () => {
        const bulletA = new Bullet({
            sourceTank: enemyDownTank,
            startCords: {col: 5, row: 5},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerUpTank,
            startCords: {col: 6, row: 4},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeFalsy();   
    })
    it('Shold return false in case A is RIGHT B is LEFT and one after another, but rows do not match', () => {
        const bulletA = new Bullet({
            sourceTank: enemyLeftTank,
            startCords: {col: 6, row: 4},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerRightTank,
            startCords: {col: 7, row: 5},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeFalsy();
    })
    it('Should return false in case A is LEFT B is RIGHT and one after another, but rows do not match', () => {
        const bulletA = new Bullet({
            sourceTank: enemyLeftTank,
            startCords: {col: 6, row: 5},
            hitCallback: ()=>{}
        })
        const bulletB = new Bullet({
            sourceTank: playerRightTank,
            startCords: {col: 7, row: 4},
            hitCallback: ()=>{}
        })
        const result = checkIfBulletHit(bulletA, bulletB);
        expect(result).toBeFalsy();
    })
})