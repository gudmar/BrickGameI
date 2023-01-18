# Structure of the DOM elements / components

- BrickGame
    - Navigation / control
        - Games
            - Tetris
            - Snake
        - Speed (some number box component)
        - Level (Some number box component)
        - Skin (Optionsl, changes color of device housing)
        - About (When clicked, info about project and be appears)

    - Device
        - Game
            - * GameManager (might be a hook, deliveres a brick layout)
                Moving object
                Stale object (related to level / object to swallow by snake)
                
            - Display
                - ScoreBar
                    - Score / (in normal game highest score, here can be 0 by default)
                    - NextFigure / NrOfLifes (fixed height)
                        - NextFigure
                        - NrOfLifes
                    - LevelScore
                - Dojo (game area)
                    - Row
                        - Brick
            -DisplayGrid (Generic component for displaying brick elements)
                ( content[rows, columns] )

        - KeyPad
            - RoundButton (size action label) (generic)
            - Arrows (zscx if not normal arrows)
                Up
                Down
                Right
                Left
                Rotate
            - GameActions
                - Reset (r)
                - Pause (p)
            - (optional) Sticker (some brick game 2 in 1 or some 90' style sticker component)
    - Dialog (Some generic component to display messages)
