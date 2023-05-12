import { getRandom } from "../../functions/getRandom";
import { GameCreator } from "../GameCreator";
import { CAR_PERIOD, INITIAL_PROBABILITY_LEVEL_CHANGES } from "./constants";
import { renderTrack } from "./TrackRenderer";
import { gameEvents } from "./Judge"

export enum Sites {LEFT, RIGHT}

export class TrackGenerator{

    site: Sites;
    distance: number;
    lastBlueprint: number[][];
    gamePhase;
    testRandomValue?: number;
    visitedObject: GameCreator;
    trackMoveTick: number;

    constructor({
        testRandomValue,
        visitedObject,
    }: {
        testRandomValue?: number,
        visitedObject: GameCreator
    }){
        this.visitedObject = visitedObject;
        this.headTail = testRandomValue;
        this.site = this.getInitialSite();
        this.gamePhase = 0;
        this.trackMoveTick = 0;
        this.lastBlueprint = this.getInitialBlueprint();
        this.distance = 0;
    }

    reset() {
        this.gamePhase = 0;
        this.lastBlueprint = this.getInitialBlueprint();
        this.distance = 0;
    }

    get headTail() { return this.testRandomValue !== undefined ? this.testRandomValue : getRandom(0, 1)}
    set headTail(val: number|undefined) { this.testRandomValue = val}

    shouldCountPoints() {
        const NO_CARS_START_AREA_LENGTH = 20
        const CAR_LENGTH = 4;
        const BLAK_LENGHT = NO_CARS_START_AREA_LENGTH + CAR_LENGTH
        const offesetGamePhase = (this.gamePhase - BLAK_LENGHT)
        const isCarPassed = offesetGamePhase % 10 === 0 && offesetGamePhase >= 0;
        return isCarPassed;
    }

    updateTrackIfNeeded() {
        const shouldUpdate = this.gamePhase % CAR_PERIOD === 0 && this.gamePhase !== 0;
        const [, middle, last] = this.lastBlueprint;
        if (this.shouldCountPoints()) this.informCarOvertaken(middle)
        if (!shouldUpdate) return;
        const nextTrackBit = this.getNextBlueprintBit();
        
        this.lastBlueprint = [middle, last, nextTrackBit]
    }

    informCarOvertaken(nextTrackBit: number[]){
        const isCarOvertaken = nextTrackBit.some((bit: number) => bit === 1)
        if (isCarOvertaken) this.visitedObject.judge.inform(this.visitedObject, gameEvents.TAKE_OVER)
    }

    shouldSiteChange() {
        const {level} = this.visitedObject;
        const randomValue = getRandom(0, INITIAL_PROBABILITY_LEVEL_CHANGES - level);
        return randomValue === 0;
    }

    changeSiteIfNeeded(){
        const shouldSwitchSide = this.shouldSiteChange();
        if (shouldSwitchSide) {
            this.site = this.site === Sites.RIGHT ? Sites.LEFT : Sites.RIGHT;
        }
    }

    getInitialBlueprint() {
        const result = this.site === Sites.RIGHT ? [
            [0, 0],[0, 0],[0, 1]
        ] : [
            [0, 0],[0, 0],[1, 0]
        ]        
        return result;
    }

    getInitialSite() {
        return this.headTail === 0 ? Sites.LEFT : Sites.RIGHT
    }

    getNextBlueprintBit() {
        this.changeSiteIfNeeded();
        return this.site === Sites.LEFT ? [1, 0] : [0, 1]
    }

    toggleSite() {
        this.site = this.site === Sites.LEFT ? Sites.RIGHT : Sites.LEFT;
    }

    generateBlueprint() {
        this.updateTrackIfNeeded();
        return this.lastBlueprint;
    }
    next() {
        const blueprint = this.generateBlueprint();
        const nextTrakcView = renderTrack(blueprint, this.gamePhase, this.trackMoveTick);
        this.gamePhase++;
        return nextTrakcView;
    }

    moveTrack({acceleration} = {acceleration: false}) {
        const blueprint = this.lastBlueprint;
        const slowFactor = acceleration === true ? 1 : 3;
        const movedTrack = renderTrack(blueprint, this.gamePhase - 1, Math.floor(this.trackMoveTick / slowFactor));
        this.trackMoveTick++;
        return movedTrack;
    }
}
