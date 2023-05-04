
* speed is too slow,

* Enter on existing game restarts the game, but is this an issue?

* Work on initial animations. Perhaps should switch backgrounds, to imitate movement, at the moment they are not to clear with toggling etc,

* Tank:

************
getRotatedDirection.test
rotation of tank when placing
********
  + Move player tank with keyboard,
  + Move oponent tanks with auto
  + Shot player tank
  + Make bullet destroy oponent tank
  + Make oponent shot
  + Make oponent bullet destroy player (not other oponent) tank
  + Make points count
  + Make level increase
  + Make codes work
  + Enemy tanks should not appear each clock tick, but once per a few
  + Fix speed: onSpeed move should be faster, not onSpeed events should be slower
  + Tanks should appear in random positions, not starting from the same list index
  + Enemy tanks should be randomly rotated when appear
  + Player default position shoud be available for enemy tanks, but palyer default
  + Player default position moved more to center
  - Animation in case player tank destroyed
    - Bullet tank hit turns on animation, but
    - Animation does not happen untill game re-initialized,
    - Tank does not leave animation state,
    - Animation looks like it could not launch
  

TESTS:
  - Problem that initially enemy tank was placed staticly, now randomly, and tests are not written with thought that tanks will be placed dynamicly. Solution to tank.currentTank = ENEMY_TANK

* Maze:
  - When game won, and enter pressed on pawn on, old pawn does not diappear


All:
  - Games switched with arrows appear in strange directon
  
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

