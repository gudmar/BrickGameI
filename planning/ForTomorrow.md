
* speed is too slow,

Code cleaning needed badly:

GameCreator:
  - state calculators need state cloasure, they are not static classes, no point in not implementing constructor and keeping whole state in GameCreator,
  This approach polutes GameCreator, and because gaceCalculator is switched 
  dynamicly it is hard to clean after it. 
  All calculator specific state should be kept in calculator,

  - Delete state from GameCreator, as there is too much of it,

  - On GameCreator start all 3 calculator instances should be created, but not started, some 'Start' method should start calculator, and stop sould remove old one, because calulators may interfere with one another,

  
