import { getEmptyBoard } from "../../constants";
import { BallDirections, calculateNextBallDirection } from "../calculateNextBallDirection"

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

    })
    it('Should change to gameLost in case direction is downLeft or downRight and current row is the last board row (19)', () => {

    });

    it('Should change direction from upLeft to downLeft if hit obstacle above ball', () => {

    })
    it('Should change direction from upRight to downRight if hit obstacle above ball', () => {

    })
    it('Should change direction form upRight to upLeft if hit obstacle on the rigth of the ball', () => {

    })
    it('Should change direction from upLeft to upRight if hit obstacle on the left of the ball', () => {

    })
    it('Should change direction from downLeft to upLeft if hit obstacle below ball', () => {

    })
    it('Should change direction form downRight to upRight if hit obstacle below ball', () => {

    })
    it('Should change direction from downRight to downLeft if hit obstacle on right of the ball', () => {

    })
    it('Should change direction form downLeft to downRight if hit obstacle on the left of the ball', () => {

    });
    it('Should  change direction from upLeft to downRigth if hit obstacles above and on left at the same time', () => {

    })
    it('Sholud change direction form upRight to downLeft if hit obstacle above and on the right of the ball at the same time', () => {

    })
    it ('Should change direction form downRight to upLeft if hit obstacle below and right of the ball at the same time', () => {

    })
    it ('Should change direction form downLeft to upRight if hit obstacle below and left of the ball at the same time', () => {

    })
    it ('Should change direction from downLeft to upRight if hit player below and player was moving right', () => {

    })
    it ('Should change direction from downRight to upLeft if hit player below and player was moving left', () => {

    })
    it('Should change direction from upRight to downLeft if hit player above and player was moving left', () => {

    })
    it('Should change direction from upLeft to downRight if hit player above and player was moving right', () => {

    });
    it('Should change direction from upLeft to downRight if hit brick edge in the topLeft corner of the ball', () => {

    })
    it('Should change direction from upRight to downLeft if hit brick edge in the topRight corner of the ball', () => {

    })
    it('Should change direction from downRight to upLeft if hit brick edge in the bottomRight corner of the ball', () => {

    })
    it('Should change direction from downLeft to upRight if hit brick edge in the bottom left corner of the ball', () => {

    })

});
