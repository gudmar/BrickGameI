
* speed is too slow,

* Enter on existing game restarts the game, but is this an issue?

* Work on initial animations. Perhaps should switch backgrounds, to imitate movement, at the moment they are not to clear with toggling etc,

* Snake
  - Bricks are placed on background of level,
  - Too long tail: level up, restart snake
  - No after animation
  - After snake game lost and restat, points do not reset to 0 - the same in TETRIS
  - Change direstion works in snake like colision

* Maze:
  - When game won, and enter pressed on pawn on, old pawn does not diappear
  
TO ADD NEW GAME:
1) Create GameIntroCloasure, a class transforimng GameIntro that takes a background as constructor arg, to a class that returns GameIntro instnace but takes noting,
2) Create a background for GameIntroCloasure,
3) Create a jugde class, that takes string events and handles points management,
4) Create a nextStateCalculator function, extending NextStateCalculator and implementing GameCreatorinterface. This class holds game specific state, and operates on GameCreator instance changing speed, level, pawnLayer,
5) Create a GameDecorator class, that binds nextCalculatorState, judge, afterGameAnimation and beforeGameAnimation, and returns decorated class

+ 6) In cartridgeLibrary, In cartridgesOrder add entry (THIS SHOULD BE automated)
7) In cartridgeLibrary add entry
+ 8) In constants/cartridgeLibrary add entry to cartridges
9) Add codesDescription in gameCodes, 
10) add to gameCodes in gameCodes