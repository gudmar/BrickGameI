# Brick game state
* BrickGame
    - CurrentGame [Tetris / Snake]
    * Menu 
        - ShouldDislplay
    * Game (Tetris / Snake)
        - Clock
        - Speed
        - Level
        - Paused
        - Score
        - Level
        - Speed
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
            - Coordinances
            - ToSwallow
            - Direction

    * Skin (color) // gray, blue, green
    * Should display about // can use Message component
    * Message (shouldDisplay, messageContent)