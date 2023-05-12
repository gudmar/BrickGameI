import { AbstractJudge } from "../AbstractJudge";
import { GameCreator } from "../GameCreator";

class Judge extends AbstractJudge{}

class VisitedObject {
    level = 1;
    score = 0;
    increaseLevel(){
        this.level++
    }
    reset(){ this.level = 1; this.score = 0}
}

describe('Testing AbstractJudge, increaseLevelIfSHould', () => {
    it('Should not switch level if given points below threshold', () => {
        const visitedObject = (new VisitedObject() as unknown) as GameCreator;
        const judge = new Judge();
        judge.increaseLevelIfShould({
            visitedObject,
            pointsThreshold: 1000,
            lastPointGain: 100,
        })
        expect(visitedObject.level).toBe(1);
    })
    it('Should switch level if given points after change is equal to threshold', () => {
        const visitedObject = (new VisitedObject() as unknown) as GameCreator;
        visitedObject.score = 1000;
        const judge = new Judge();
        judge.increaseLevelIfShould({
            visitedObject,
            pointsThreshold: 1000,
            lastPointGain: 100,
        })
        expect(visitedObject.level).toBe(2);
    })
    it('Should not switch level if given points many times above threshold, but last gain did not make modulo exceed threshold', () => {
        const visitedObject = (new VisitedObject() as unknown) as GameCreator;
        visitedObject.score = 9100;
        const judge = new Judge();
        judge.increaseLevelIfShould({
            visitedObject,
            pointsThreshold: 1000,
            lastPointGain: 100,
        })
        expect(visitedObject.level).toBe(1);
    })
    it('Should switch level if given points many times above threshold and last gain made modulo equal threshold', () => {
        const visitedObject = (new VisitedObject() as unknown) as GameCreator;
        visitedObject.score = 5000;
        const judge = new Judge();
        judge.increaseLevelIfShould({
            visitedObject,
            pointsThreshold: 1000,
            lastPointGain: 100,
        })
        expect(visitedObject.level).toBe(2);
    })
    it('Should switch level if given points many times above threshold and last gain made modulo greated then threshold', () => {
        const visitedObject = (new VisitedObject() as unknown) as GameCreator;
        visitedObject.score = 5050;
        const judge = new Judge();
        judge.increaseLevelIfShould({
            visitedObject,
            pointsThreshold: 1000,
            lastPointGain: 100,
        })
        expect(visitedObject.level).toBe(2);
    })
})