* GameCreator needs implementatoin of key handler methods (from useCartridge). Those have to be passed to nextStateCalculator
* GameCreator implemented as an adapter betwee nextStateCalculator,
taking previous game state and returning new, and the display,
* MazeMover is a perfect class that is an example how to decorate GameCreator to inject logic into it,
* PawnMover will be logic, has to be implemented
* MazeMover will be set as cartridge,

