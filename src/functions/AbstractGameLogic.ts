type NextFigureFieldContent = [number[], number[], number[] ,number[]];

interface GameLogicArgs {
    score: number,
    level: number,
    speed: number,
    // nextFigureFieldContent: [number[], number[], number[] ,number[]],
    nextFigureFieldContent: number[][]
    brickCoordinantes: number[][],
}

interface KeyPress {
    up: number,
    down: number,
    right: number,
    left: number,
}

const arrayOfElements  = <T>(length: number, element: T) => Array(length).fill(element);

export abstract class GameLogic {
    protected score: number = 0;
    protected level: number = 0;
    protected speed: number = 0;
    protected nextFigureFieldContent = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    protected paused: boolean = false;
    protected brickCoordinantes: number[][] = arrayOfElements<number[]>(20, arrayOfElements<number>(10, 0));

    init({ score, level, speed, nextFigureFieldContent, brickCoordinantes }: GameLogicArgs) {
        this.score = score;
        this.level = level;
        this.speed = speed;
        this.nextFigureFieldContent = nextFigureFieldContent;
        this.brickCoordinantes = brickCoordinantes;
    }

    setPaused(value: boolean): void {
        this.paused = value;
    }

    abstract getNextStateTick(clockValue: number):GameLogicArgs;

    abstract getNextStateKeyPress(keyPresses: KeyPress):GameLogicArgs;


}
