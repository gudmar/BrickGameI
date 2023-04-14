
* speed is too slow,

* Enter on existing game restarts the game, but is this an issue?

* Work on initial animations. Perhaps should switch backgrounds, to imitate movement, at the moment they are not to clear with toggling etc,

* Tank:
  - Implementing manual move
    - Implementing placing tank on a board (first PLAYER)
      - Implementing colision detection while plaing (no obstacles, as their position is known, just tanks and bullets)
        - Implementing Bullet class (just bits) for tests of tryPlace tank
  -> Try place should place without calculation when PLAYER tank is placed, as this is always after board reset
  -> Should not place tanks on ANY bullets, either player or enemy
  -> Should not place tanks on ANY other tank
  -> No need to check if placing a tank on background, as background position is well known,
  -> Tank placing will be in one of a few places (6 places). Every time start from a random place, and place in first possible position. If some posision not available, check another... If all positions not possible. wait untill next clock tick

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


