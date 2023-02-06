# Brick game state
* BrickGame
    - CurrentGame [Tetris / Snake]
    * Menu 
        - ShouldDislplay //onHover so not needed
    * Game (Tetris / Snake)
        - Clock
        - Speed
        - Level
        - Paused
        - Score
        - Level
        - NextContent (next block in tetris / nr of lifes)
        * Display
            * ScoreBarr
            * Dojo
                * NextLayout
                    - Rows
                    - Columns
        * Tetris
            - NextFigure
            - CurrentFigure
            - Board
            - FigureOrientation
            - FigurePosition
            - NextDirection
        * Snake
            - Coordinances (current length)
            - ToSwallow
            - Direction
            - NrOfLifes (displayed in next figure)

    * Skin (color) // gray, blue, green
    * Should display about // can use Message component
    * Message (shouldDisplay, messageContent)

BrickGame
    <!-- -(s) Games (received on creation from Game component, only Game has all the games) || NOT NEEDED due to the cartridges/allCartridges that provides all games, and NAME property in each game, telling the name of the game -->
    -(s) currentGame (tetris / snake / demo*)
    -(s) level
    -(s) speed
    -(h) setGames(gameName: string[]) passed to Game component
    -(h) setSpeed
    -(h) setLevel
    -(h) setGame
    -(h) setAvailableGames
    Navigation(speed, level, currentGameName, setSpeed, setLevel, setGame)
    Console(level, speed, currentGame, setSpeed, setLevel)
        -(s) paused
        (-(s) sound)
        (-(s) onOff)
        -(h) setPause({on: boolean})
        (-(h) setSound({on: boolean}))
        (-(h) setOn({on: boolean}))
        Kyepad(setPause, setSound, setOn)
            -(h) up
            -(h) down
            -(h) right
            -(h) left // connected to the mediator keypad pattern
        Game(level, speed, currentGameName, 
        <!-- Game will be taken over by Display -->
        setAvailableGameNames(handler that tells navigation what games are available))
            -(hardcoded) arrayOfAvaiableGames
            -(s) clockTicks (clock set by useClock hook)
            -(s) bricksCoordinates (delivered by useGame)
            -(s) nextFigureFieldContent (delivered by useGame)
            -(s) score

            Display(
                speed, 
                level, 
                currentGame,
                 <!-- score, nextFigureFieldContent   Not needed, as will be managed internaly by the Display comopnent-->
                )

            <I> CurrentGame (an interface)
                -(m) init(initLevel, initSpeed, initClockValue) => {
                    score:0, 
                    level, 
                    speed, 
                    nextFigureFieldContent, / nextFigure
                    bricksCoordinantes / brickMap
                }
                -(m) setPaused(value) // just set state to paused or not paused

                -(m) getNextStateTick(clockValue) => {
                    score,
                    level, 
                    speed, 
                    nextFigureFieldContent, 
                    bricksCoordinantes
                } // next tick !== next move, ticks are divided according to current speed

                -(m) getNextStateKeyPress({
                    up: number, 
                    down: number, 
                    left: number, 
                    right: number // of presses
                }) => {
                    score,
                    leel,
                    speed,
                    nextFigureFieldContent,
                    brickCoordinantes
                }
            <C> Tetris (class) //should implement currentGame
                (-hardcoded) figures
                (-hardcoded) getInitialCords(level) => staleBricksCoords
                STATE:
                    -(s) staleBrickesCoordinantes
                    -(s) current figure
                    -(s) figure orientation
                    -(s) figure coordinantes
                    -(s) currentClock
                    -(s) level
                    -(s) speed
                    -(s) score
                    -(s) paused
                    -(s) isAnimating
                -(m) shouldDoNextMove(speed, currentClock) => boolean
                -(m) getNextStateTick(clockValue) {
                    if (isAnimating) {
                        do some animations / in tetris current figure may blink
                    }
                    ... () // some regular stuff
                    if (shouldDoNextMove(speed, clockValue)) {
                        ...
                    }
                }





*-startState
