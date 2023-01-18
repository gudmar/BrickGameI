# Brickgame backlog
------------------------
### Before
*   Implement Page layout in html and css (prove of concept, css reusable in real project)
*   Implement console layout in html and css (prove of concept, css reusable in real project)
*   Make component breack-down structure (components with: props, states, JSX structure, passing elements to children, components should mout, no logic, create hooks stubs here)
*   Write tests with react-testing-library
*   Implement Clock with TDD
*   Implement Keypad with TDD
*   Implement screen
    *   Implement Display:
        *   Implement brick
        *   Implement display
        *   Implement a testing host component that will change displayed concent:
            *   Single point
            *   Single point when more pixels light
            *   Move a figure when arrows pressed
            *   Move a figure on clock and arrows
    *   Implement side-screen
        *   Speed
        *   Level
        *   Next component
        *   Score
*   Make page look ready
    *   Implement css look on page
    *   Implement css on console
*   Implement Game component
    This is a component handling screen and passing to it displayed structure in an array prop
    useEffect on clock change
    Game has speed, level, score, when score reaches a threshold, level / speed could be recalculated and passed to clock if needed
*   Implement Tetris
    Tetris itsself is not a component. It is just a class that:
    *   Deliveres initial state for screen
    *   Holds current state
    *   Calculates next state on nextState call
*   Implement Snake
    *   Snake is the similar to Tetris, implements the same interface, holds current state, deliveres next state,
    *   Logic different to Tetris
    *   At this point Tetris and Snake should be made to derive from the same abstract class
*   Implement routes
    *   useHref seems a good choice to put to Game component to change the game (strategy)
    *   Link navigation menu to routes
*   Implement error boundries

------------------------

## Navigation

* Navigation menu

* Internal routing

## Layout

* Implementation of whole page layout

* Implementation of the console it slef (look, buttons)

## Handling errors

* Errors for particural game

* Errors for whole application

## Game

* Clock

* Keypad 

## Display

* Implement display
    * Implement single brick

## Internal communication 

## Tetris game

## Snake game