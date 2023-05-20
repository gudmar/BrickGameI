import { BallDirections } from "../../../types/types";
import { getEmptyBoard } from "../../constants";
import { calculateNextBallDirection } from "../calculateNextBallDirection"

describe('Testing calculateNextBallDirection for Tennis', () => {
    it('Should not change direction if no brick or side wall hit', () => {
        const directions = [
            BallDirections.upLeft, BallDirections.upRight, BallDirections.downLeft, BallDirections.downRight
        ]
        const results = directions.map((direction: BallDirections) => (calculateNextBallDirection(
            {
                currentDirection:direction,
                ballCords: {col: 5, row: 5},
                background: getEmptyBoard(),
                playerPosition: 3,
            }
        )));
        results.forEach((result, index) => expect(result).toBe(directions[index]))
    })
    it('Should change to gameLost in case direction is upRight or upLeft and current row is 0', () => {
        const directions = [BallDirections.upLeft, BallDirections.upRight];
        const results = directions.map((direction: BallDirections) => (
            calculateNextBallDirection({
                currentDirection: direction,
                ballCords: {col: 2, row: 0},
                background: getEmptyBoard(),
                playerPosition: 5
            })
        ))
        results.forEach((result) => expect(result).toBe(BallDirections.gameLost))
    })
    it('Should change to gameLost in case direction is downLeft or downRight and current row is the last board row (19)', () => {
        const directions = [BallDirections.downLeft, BallDirections.downRight];
        const results = directions.map((direction: BallDirections) => (
            calculateNextBallDirection({
                currentDirection: direction,
                ballCords: {col: 2, row: 19},
                background: getEmptyBoard(),
                playerPosition: 5
            })
        ))
        results.forEach((result) => expect(result).toBe(BallDirections.gameLost))
    });

    it('Should change direction from upLeft to downLeft if hit obstacle above ball', () => {
        const bg = getEmptyBoard();
        bg[4][5] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upLeft,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.downLeft);
    })
    it('Should change direction from upRight to downRight if hit obstacle above ball', () => {
        const bg = getEmptyBoard();
        bg[4][5] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upRight,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.downRight);
    })
    it('Should change direction form upRight to upLeft if hit obstacle on the rigth of the ball', () => {
        const bg = getEmptyBoard();
        bg[5][6] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upRight,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.upLeft);
    })
    it('Should change direction from upLeft to upRight if hit obstacle on the left of the ball', () => {
        const bg = getEmptyBoard();
        bg[5][4] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upLeft,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.upRight);
    })
    it('Should change direction from downLeft to upLeft if hit obstacle below ball', () => {
        const bg = getEmptyBoard();
        bg[6][5] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downLeft,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.upLeft);
    })
    it('Should change direction form downRight to upRight if hit obstacle below ball', () => {
        const bg = getEmptyBoard();
        bg[6][5] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downRight,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.upRight);
    })
    it('Should change direction from downRight to downLeft if hit obstacle on right of the ball', () => {
        const bg = getEmptyBoard();
        bg[5][6] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downRight,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.downLeft);
    })
    it('Should change direction form downLeft to downRight if hit obstacle on the left of the ball', () => {
        const bg = getEmptyBoard();
        bg[5][4] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downLeft,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.downRight);
    });
    it('Should  change direction from upLeft to downRigth if hit obstacles above and on left at the same time', () => {
        const bg = getEmptyBoard();
        bg[4][5] = 1;
        bg[5][4] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upLeft,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.downRight);
    })
    it('Sholud change direction form upRight to downLeft if hit obstacle above and on the right of the ball at the same time', () => {
        const bg = getEmptyBoard();
        bg[4][5] = 1;
        bg[5][6] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upRight,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.downLeft);
    })
    it ('Should change direction form downRight to upLeft if hit obstacle below and right of the ball at the same time', () => {
        const bg = getEmptyBoard();
        bg[6][5] = 1;
        bg[5][6] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downRight,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.upLeft);
    })
    it ('Should change direction form downLeft to upRight if hit obstacle below and left of the ball at the same time', () => {
        const bg = getEmptyBoard();
        bg[6][5] = 1;
        bg[5][4] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downLeft,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 5,
        })
        expect(result).toBe(BallDirections.upRight);
    })

    describe('Testing ball directoin change when player moves', () => {
        it ('Should change direction from downLeft to upRight if hit player below and player was moving right', () => {
            const bg = getEmptyBoard();
    
            const result = calculateNextBallDirection({
                currentDirection: BallDirections.downLeft,
                ballCords: {row:18, col:5},
                background: bg,
                playerPosition: 4,
                isPlayerMovingLeft: false,
                isPlayerMovingRight: true,
            })
            expect(result).toBe(BallDirections.upRight);
        })
        it('Should change direction from downLeft to upLeft if OBSTACLE was hit below and player was moving right', () => {
            const bg = getEmptyBoard();
            bg[6][5] = 1;
            const result = calculateNextBallDirection({
                currentDirection: BallDirections.downLeft,
                ballCords: {row:5, col:5},
                background: bg,
                playerPosition: 4,
                isPlayerMovingLeft: false,
                isPlayerMovingRight: true,
            })
            expect(result).toBe(BallDirections.upLeft);
            
        })
    
        it ('Should change direction from downRight to upLeft if hit player below and player was moving left', () => {
            const bg = getEmptyBoard();
    
            const result = calculateNextBallDirection({
                currentDirection: BallDirections.downRight,
                ballCords: {row:18, col:5},
                background: bg,
                playerPosition: 4,
                isPlayerMovingLeft: true,
                isPlayerMovingRight: false,
            })
            expect(result).toBe(BallDirections.upLeft);
        })
        it ('Should change direction from downRight to upRight if hit player below and player was moving right', () => {
            const bg = getEmptyBoard();
    
            const result = calculateNextBallDirection({
                currentDirection: BallDirections.downRight,
                ballCords: {row:18, col:5},
                background: bg,
                playerPosition: 4,
                isPlayerMovingLeft: false,
                isPlayerMovingRight: true,
            })
            expect(result).toBe(BallDirections.upRight);
        })
    
        it('Should change direction from upRight to downLeft if hit player above and player was moving left', () => {
            const bg = getEmptyBoard();
    
            const result = calculateNextBallDirection({
                currentDirection: BallDirections.upRight,
                ballCords: {row:1, col:5},
                background: bg,
                playerPosition: 4,
                isPlayerMovingLeft: true,
                isPlayerMovingRight: false,
            })
            expect(result).toBe(BallDirections.downLeft);
        })
        it('Should change direction from upLeft to downRight if hit player above and player was moving right', () => {
            const bg = getEmptyBoard();
    
            const result = calculateNextBallDirection({
                currentDirection: BallDirections.upLeft,
                ballCords: {row:1, col:5},
                background: bg,
                playerPosition: 4,
                isPlayerMovingLeft: false,
                isPlayerMovingRight: true,
            })
            expect(result).toBe(BallDirections.downRight);
        });    
    })

    it('Should change direction from upLeft to downRight if hit brick edge in the topLeft corner of the ball', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upLeft,
            ballCords: {row:1, col:5},
            background: bg,
            playerPosition: 1, // 1, 2, 3, 4
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downRight);
    })
    it('Should change direction from upRight to downLeft if hit brick edge in the topRight corner of the ball', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upRight,
            ballCords: {row:1, col:5},
            background: bg,
            playerPosition: 6,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downLeft);
    })
    it('Should change direction from downRight to upLeft if hit brick edge in the bottomRight corner of the ball', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downRight,
            ballCords: {row:18, col:3},
            background: bg,
            playerPosition: 4,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upLeft);
    })
    it('Should change direction from downLeft to upRight if hit brick edge in the bottom left corner of the ball', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downLeft,
            ballCords: {row:18, col:5},
            background: bg,
            playerPosition: 1,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upRight);
    })
    it('Should not change direction if ball is in 1 row goes upRight and passes right bottom edge of not moving player', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upRight,
            ballCords: {row:1, col:5},
            background: bg,
            playerPosition: 1, // 1, 2, 3, 4
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upRight);
    })
    it('Should not change direction if ball is in 1 row goes upLeft and passes left bottom edge of not moving player', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upLeft,
            ballCords: {row:1, col:3},
            background: bg,
            playerPosition: 4, // 1, 2, 3, 4
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upLeft);
    })
    it('Should not change direction if ball is in 18 row goes downRight and passes right top edge of not moving player', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downRight,
            ballCords: {row:1, col:5},
            background: bg,
            playerPosition: 1, // 1, 2, 3, 4
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downRight);
    })
    it('Should not change direction if ball is in 18 row goes downLeft and passes left top edge of not moving player', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downLeft,
            ballCords: {row:1, col:3},
            background: bg,
            playerPosition: 4,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downLeft);
    })


    it('Should change direction from downLeft to upRight if ball was in bottom left corner (row 18 col 0) and player was present', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downLeft,
            ballCords: {row:18, col:0},
            background: bg,
            playerPosition: 0,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upRight);
    })
    it('Should change direction from downLeft to upRight if ball was in bottom left corner (row 18 col 0) and player touched with its edge', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downLeft,
            ballCords: {row:18, col:0},
            background: bg,
            playerPosition: 1,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upRight);
    })
    it('Should change direction from downLeft to downRight if ball was in bottom right corner (row 18 col 9) and player was NOT present', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downLeft,
            ballCords: {row:18, col:0},
            background: bg,
            playerPosition: 4,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downRight);
    })

    it('Should change direction from downRight to upLeft if ball was in bottom left corner (row 18, col 0) and player was present', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downRight,
            ballCords: {row:18, col:9},
            background: bg,
            playerPosition: 6,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upLeft);

    })
    it('Should change direction from downRight to upLeft if ball was in bottom left corner (row 18, col 0) and player was in col 5 (occupying 5, 6, 7, 8)', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downRight,
            ballCords: {row:18, col:9},
            background: bg,
            playerPosition: 5,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upLeft);

    })
    it('Should change direction form upRigth to downLeft if ball was in upRight corner and player was present', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upRight,
            ballCords: {row:1, col:9},
            background: bg,
            playerPosition: 6,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downLeft);
    })
    it('Should change direction form upRigth to downLeft if ball was in upRight corner and player was in col 5, 6, 7, 8,', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upRight,
            ballCords: {row:1, col:9},
            background: bg,
            playerPosition: 5,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downLeft);
    })

    it('Should change direction from upLfet to downRight if ball was in left up corner and player was present', () => {
        const bg = getEmptyBoard();

        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upLeft,
            ballCords: {row:1, col:0},
            background: bg,
            playerPosition: 0,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downRight);
    })
    it('Should change direction from upLfet to downRight if ball was in left up corner and player was in 1 column', () => {
        const bg = getEmptyBoard();
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upLeft,
            ballCords: {row:1, col:0},
            background: bg,
            playerPosition: 1,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downRight);
    })
    it('Should change direction form upLeft to downRight if obstacle is in upper left corner of the ball', () => {
        const bg = getEmptyBoard();
        bg[4][4] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upLeft,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 1,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downRight);
    })
    it('Should change direction from upRight to downLeft if obstacle is in upper right corner of the ball', () => {
        const bg = getEmptyBoard();
        bg[4][6] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.upRight,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 1,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.downLeft);
    })
    it('Should change direction from downLeft to upRight if obstacle is in lower left corner of the ball', () => {
        const bg = getEmptyBoard();
        bg[6][4] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downLeft,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 1,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upRight);
    })
    it('Should change direction from downRight to upLeft if obstacle is in lower right corner of the ball', () => {
        const bg = getEmptyBoard();
        bg[6][6] = 1;
        const result = calculateNextBallDirection({
            currentDirection: BallDirections.downRight,
            ballCords: {row:5, col:5},
            background: bg,
            playerPosition: 1,
            isPlayerMovingLeft: false,
            isPlayerMovingRight: false,
        })
        expect(result).toBe(BallDirections.upLeft);
    })

});
