### useCartridges ###
* Provide current game state (score, brickMap, level ...)
* Take as an arg current game name that is set in BrickGame component
* Cartridges mapping in useCartridges
* Animation is one of cartridges,

### Animations.ts ###
* Most top level
* `ScheaduleProps` defines sequence of animations
* Each animation in the sequence, that is an object deriving from GameLogic, each sequence uses AnimatorSequencersApplier,
* Each animation consistis of a set of paralel animation sequences,

### AnimatorSequencersApplier ###
* AnimatorSequencer takes background and sequencer configurations
* combines AnimationSequencers
* sequencerConfigurations is an array of arrays, that describes animation *threads* that should be applied in **paralel**, animations in 
paralel do not have to have the same number of repetitions, each
animaiton thread is stareted from scratch after it finishes
* Uses `AnimationSequencer`

### AnimationSequencer ###
* based on configuration `{ repetitions, animators }`
