# BrickGame

An after-hour game. Created just for fun of it. Unfortunately these are not my most effective hours, and this was a code quality trade off.

### Goals
* Creation of a game similar to `Brick games` from the '90s,
* Experiment with react, decouple logic from presentation layer,
* Make logic independet from presentation layer

### Features

* Emulation of LCD used for such games creation (colors of display, bricks on, bricks off)
* Emulation of score font
* Possiblity to use it with keyboard
* Possiblity to use it with mouse
* Sound (not very similar, more like polyphone sounds like in Nokia 3510)
* Possibility to change melody
* Setting level,
* Setting speed,
* Pause game
* Game codes for: stopping time, higher score, going through the wals etc

### Games:
* Tetris
* Snake
* Tanks
* Tennis
* Labirynt
* Race
  

### Assumptions
* Logic with its memory enclosed in classes, to make it independent from frameworks,
* React used only for presentation purposes (this indicated doubling of state, that is already enclosed in classes)
* Classes responsible for modyfying game state,
* Main clock: a singleton for controlling all time events
* Observer pattern used to communicate clock with all places using it,
* React hooks as adapters between state managing classes and rest of application,
* Observer pattern with singleton used for keyboard controll
