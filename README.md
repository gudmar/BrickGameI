# BrickGame

An after-hour game. Created just for fun of it. Unfortunately these are not my most effective hours, and this was a code quality trade off.

### Goal

* Creation of a game similar to `Brick games` from the '90s,

### Assumptions
* Logic with its memory enclosed in classes, to make it independent from frameworks,
* React used only for presentation purposes (this indicated doubling of state, that is already enclosed in classes)
* Classes responsible for modyfying game state,
* Main clock: a singleton for controlling all time events
* Observer pattern used to communicate clock with all places using it,
* React hooks as adapters between state managing classes and rest of application,
* Observer pattern with singleton used for keyboard controll
