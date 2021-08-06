# Homework 2 - Set! - Project Specification

<p>
  <img src="screenshots/spec-intro-view.png" width="60%" alt="Set! Game board">
</p>

This assignment continues what we've been learning in Module 1 (HTML/CSS) and applies what you are
learning in Module 2 (JavaScript, DOM, and Animations). As a longer assignment, it will be worth
more points than HW1 and consists of two submissions:
1. Milestone Submission (5 points)
2. Final Submission (30 points)

To accept and submit for both submissions you will:
1. Click "Accept HW" button for the Milestone assignment
2. Clone this `hw2-set-<username>` repo in your local cse154 directory (NOT within another git repository)
3. Add/commit/push your work when ready to submit for Milestone checkpoint
4. Click "Turn in HW" button for Milestone assignment
5. Click "Accept HW" button for Set assignment
6. *Continue working on the same repository from the Milestone*
7. Add/commit/push your work when ready to submit for Final submission
8. Click "Turn in HW" button for Final submission assignment

## Milestone Requirements (CSS)
The Milestone will be due early in the first week of the assignment. This will give you an opportunity to get early feedback on your work, particularly relating to CSS. Although you are welcome to develop more than is required for this milestone, any additional work turned in will not be graded until the final assignment is turned in.

### Part A: Main Menu Appearance
* The [main menu view](#user-content-main-menu-view) should be stylistically complete as described later in the spec. This part of the Milestone will require starting your `set.css` file. Your solution does not need to respond to user inputs for the Milestone.

### Part B: Single Card Appearance
* For this part, you should successfully display a card in `milestone.html` (see below screenshot). Note this file is *only meant for testing purposes with the Milestone*. The styles for cards are described later in the spec, but the required styles for the Milestone are also repeated here:
  * Create a single card in the given `section`.
  * The card should be a `div` element that is `220px` wide and `95px` tall with a
    solid black border of `0.35em` width and a border radius of `1em`.
  * The card should have `5px` of top and bottom margin.
  * This test card should have 3 images of the striped green oval pattern (see the rest of the spec for explanations on Set card attributes).
  * The images in the card should be centered vertically on the card with their distribution across the horizontal axis set to `space-evenly` (see screenshots later in spec).
  * Each shape image should have a height of `85%` relative to the card.
  * When a user hovers over a card, the mouse cursor should change to a pointer icon (*hint*:
    there is a single CSS property to accomplish this).

<p>
  <img src="screenshots/milestone-output.png" width="40%" alt="Milestone card">
</p>

Your Milestone submission will be worth 5 points and will be graded on Internal Correctness
and External Correctness (with an emphasis on External Correctness). **You may not use any Late Days
on Milestone submissions**. Use your feedback on the Milestone when completing the rest of the
assignment. Any Milestone submissions after the Milestone deadline will not be
eligible for credit.

The rest of the spec discusses the Set game as well as the complete requirements for the assignment.

## Assignment Overview
In this assignment you will use JS to add functionality to a basic webpage and
use responsive CSS to layout two different views for the webpage. Specifically,
you will implement a web-based version of the Set card game, providing features
to generate new games for a user and to keep track of how many correct Sets a player has found.
You will also implement a basic timer for the user to keep track of how quickly it takes
them to solve a given game. You can find a video demonstrating expected behavior for
different cases on the [homework
page](https://courses.cs.washington.edu/courses/cse154/19sp/homework/homework.html) of the course website.

### Rules of Set
This assignment is inspired by the classic SET! Card game. A game consists of a
board of cards (you will implement boards having 9 and 12 cards). Each card
has one of three options for 4 different attributes:


| Attribute | **Options**  | | |
|-------|---------|---------|----------|
| STYLE | solid   | outline | striped  |
| COLOR | green   | purple  | red      |
| SHAPE | diamond | oval    | squiggle |
| COUNT | 1       | 2       | 3        |



The goal of the game is to find as many "Sets" of 3 cards such that for each
attribute, all cards share the attribute or no cards share the attribute.
For example, the following three cards build a Set because none share style,
color, or shape attributes and they all share the count attribute.

<p>
  <img src="screenshots/set-example.png" width="40%" alt="Example of something that is a set">
</p>


However, the following three cards do not form a Set since the color attribute does not follow
the "all or none" requirement (purple is shared by the first and third
card, but not the second).

<p>
  <img src="screenshots/not-set-example.png" width="40%" alt="Example of something that is not a Set">
</p>

### Learning Objectives
* Practice following CSE 154 assignment specifications, and more broadly, webpage
specifications given visual and text-based artifacts as a design basis.
* Continue practice with responsive CSS layout techniques with flex layout.
* Apply what we’ve been learning about DOM manipulation and event handling in
JavaScript to respond to user interaction on a webpage.
* Understand the difference between simple animation techniques in JavaScript to
implement a game timer and delayed behavior.
* Practice writing modular code using JavaScript functions.
* Practice documenting your JavaScript code with JSDoc.

### Starter Files and Final Deliverables
In this HW2 repository you will find the following starter files:

| File/folders&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    | Repository files to stay unchanged |
|----------------|------------------------------|
| `set.html`     |  Provided HTML linking to your `set.css` and `set.js` files |
| `img`          | A folder with 27 classic set cards, each named with the convention: *STYLE-SHAPE-COLOR.png* (replacing STYLE, SHAPE, COLOR with a value for that attribute as listed in "Rules of Set" section) |
| `screenshots`  | A folder of screenshots for this `README.md` |
| `milestone.html` | A starter file for testing styles related to cards. This file will only be graded on the Milestone.

With the exception of `milestone.html`, which will not be graded with the final turn in,
your repository should be submitted with these (**unchanged**) starter files as
well as the following files you are to implement:

| File      | Repository files you will implement and turn in |
|-----------|------------------------------|
| `set.css` | Stylesheet for set.html (also required for Milestone) |
| `set.js`  | JS file for managing game UI and behavior |

Your final solution will be graded only on `set.css` and `set.js` - any changes you
make to `set.html` or the card images folder will not be eligible for full credit.

## External Requirements
Your webpage should match the overall appearance of the provided screenshots and
it **must** match the appearance specified in this document. We do not expect you
to produce a pixel-perfect page that exactly matches the expected output image.
However, your page should follow the specific style guidelines specified in this
document and match the look, layout, and behavior shown here as closely as possible.
Any properties unspecified in this spec or visually discernible in screenshots
should be left to the default values for the respective page element (e.g the
font size of the `h1` element on the page).

### Appearance Details
#### Overall page layout
* The main element should be horizontally centered, taking up `80%`
of the body width (the body width/margin/padding should not be changed).
* The main heading text "Set!" should be horizontally centered on the page.
* Any text on the page should have Helvetica font, falling back to Verdana if the
client does not have Helvetica, defaulting to sans-serif font if neither fonts
are available on the client. **Note**: `button` and `select` dropdowns do not
inherit font styles from their parents, so you will need to set these
explicitly with the rest of the page text (check the inspector to
confirm they have the correct font).

#### Main Menu vs. Game View
There are two views in the game, representing the "Main Menu" view (elements of
the `#menu-view` section) and the "Game" view (elements of the `#game-view` section).
When the page loads, only the Main Menu view should be visible. The provided HTML
gives the `#menu-view` a "hidden" class. You are to use this class to hide/show
elements using CSS and JS appropriately (hint: focus on hiding/displaying as few
HTML elements as possible by applying the class to parent elements where
appropriate). Both views span the width of their parent (which is centered on the page).

#### Main Menu View
![Main Menu View](screenshots/menu-view.png)

* The purple box above represents the first article in the `#menu-view` section -
the background color is `#6F77ED` and it has a `5pt solid black` border with a border radius of `0.35em`.
* Other than the dropdown and Start button, all text in the purple box is `white`.
* All elements are horizontally-centered in the Menu View as shown above.
* All `h2` elements have underlined text with a font size of `16pt`, but all other
text in the Menu View has a font size of `12pt`.
* The Start button and dropdown have white backgrounds with a `2pt` solid black border.
* The Start button has a fixed width of `100px`, `10px` of margin on the top, and `8px` of
padding between the inner text and border.
* There is `20px` of spacing between the bottom border of the Start button and the
bottom border of the purple box.
* No other margin or padding should be overridden from the defaults.
* **Note**: the default options for both the timing dropdown and the difficulty
radio buttons are set in the provided HTML document.
* **Note**: The rendering of the `select` element is particularly different between
  brower/operating systems. Refer to the expected screenshots on your system, but if you are missing
  the "up/down" arrows don't worry about this.

#### Game View
*Note: After you implement the CSS for the .hidden class correctly, the `#game-view` should be
hidden. But it will be easier to work on the CSS for the Game View before using JS to switch views.
To do so, we recommend temporarily hiding the `#menu-view` in your CSS, and since the
HTML comes with the `.hidden` class added to `#game-view`, commenting out the `.hidden` ruleset in
your CSS so that the `#menu-view` is hidden and `#game-view` is shown. Eventually, you’ll want to
toggle these views using using JS as detailed later.*

![Game View](screenshots/game-view-timed.png)


##### Details Bar
* When the Game View is visible, there should be a black "details" bar with a board of cards underneath.
* The details bar includes a "Back to Main" button, a set counter, a timer, and a "Refresh Board"
button. All four elements should be centered vertically in this bar with their horizontal distribution
set to `space-evenly`.
* The top corners of the bar should be rounded with a border radius of `0.5em`.
* Aside from the buttons which have `black` font, text in the details bar should be `white`.
* As with the Start button, both buttons should have a `white` background with `8px` of
padding between the text and their borders (which should be the same as the Start button). These buttons
should also have `12pt` font.
* Any other text in this bar has a font size of `14pt`.

##### Board
* You should use flex positioning where appropriate to layout the board and cards (do not use float
  or absolute positioning in this assignment).
* The `#game` has a black border on the left, right, and bottom with a `5pt` width.
* The cards of the `#game` element should be horizontally distributed using `space-evenly`.
* There should be `20px` of padding on all sides of the `#game` board (this spacing will be fixed
  on the top/bottom but there may be extra spacing visible on the left/right depending on how
  cards fit for a particular screen width).
* Each card should have `5px` of top and bottom margin.
* The cards should wrap naturally in the board as screen sizes adjust (hint: with appropriate flex properties,
  you don’t need to define any rows or columns).
* Whereas the screenshot above gives an example of a board width that only fits 3 cards per row, the
  screenshot at the top of this HW specification gives an example of the layout when the board is
  wide enough to fit 4 cards per row.
* **Note**: If the screen gets wide enough, the last row may have fewer cards than the earlier
  rows (you do not need to ensure all rows have the same number of cards in this case).

##### Cards
* Each card should be a `div` element that is `220px` wide and `95px` tall with a
  solid black border of `0.35em` width and a border radius of `1em`.
* Cards will have 1, 2, or 3 shape images (multiple images in the same card must be identical).
* The images in the card should be centered vertically on the card with their distribution across the horizontal axis set to `space-evenly`.
* Each shape image should have a height of `85%` relative to the card.
* When a user hovers over a card, the mouse cursor should change to a pointer icon (*hint*:
  there is a single CSS property to accomplish this).
* When a card is considered "selected" during a game (see details in next section), it should have
    a `#636363` shadow shifted `6px` right and `6px` down:

<img src="screenshots/card-three-ovals-shadowed.png" width="40%" alt="Card Example">

### Behavior Details
#### Starting a Game
Whenever the "Start" button is clicked, a new game will be started and:
* The current set count should be 0.
* A timer should be started depending on the currently-selected option in the dropdown. If
  "Unlimited" is selected, the game timer should start at 0 seconds and increment each second.
  Otherwise, the game timer should start with the number of seconds determined by the selected
  option and decrement each second (never going below 0 seconds).
* The Main Menu view should be hidden.
* The Game View should be displayed (after the first two steps so that the initial game information
  is shown correctly when the view changes).
* A new randomly-generated board of cards is generated, where each of the 4 attributes of a card
  are randomly-chosen (recall each attribute has 3 options) in Standard difficulty. The only
  difference in the randomness of cards in Easy difficulty is that the "style" attribute
  should always be fixed to "solid".
* The generated board should never have duplicate cards (cards that share all 4 attributes).
  During this step, you should not create more than 12 card DOM elements.
  * *Hint for card generation*: Since the provided card images only represent 3 attributes (style,
    shape, and color), you’ll want to make sure you add COUNT occurrences of the appropriate *STYLE-SHAPE-COLOR.png* image to the card `div`.
  * *Hint for keeping track of unique cards*: you can give your cards an ID with the 4 attributes
    in the form: *STYLE-SHAPE-COLOR-COUNT*. Focus on generating these attribute combinations one
    at a time, creating a new card only when there is not a card already on the board with the
    same attribute string). But make sure you never have duplicate IDs between the cards on the board.

**Note about difficulty and generated cards**: In both Easy (9 card) and Standard (12 card)
difficulties, there are 4 attributes (style, color, shape, and count) and 3 possible options
for any attribute (e.g. red, green, or purple options for the color attribute). For Standard
difficulty, each card should have a randomly-selected value for each of the 4 attributes. For
Easy difficulty, the "style" attribute should be fixed to "solid". To avoid redundancy in your
program and allow for flexibility if users later want to change the images and attributes, we
suggest using 4 arrays as module-global constants, one for each attribute type (style, color,
shape, count) - since count is an integer, you may alternatively use a different datatype to represent it as a constant. Remember that a module-global symbol is any that is in the module pattern but
defined outside of the local scope of functions within the module pattern (in general, you
should limit the number of module-global variables).

**Note about the game timer format**: When updating during the Game View, the timer format in `#time`
 must stay in proper MM:SS format (for example, if there are 8 seconds left in timed mode, the timer
 should display 00:08. If there are instead 600 seconds, the timer should display 10:00). You do
 not need to handle the case when 60 or more minutes have passed (which overflows this format).

#### Game Play (Choosing Sets)
Once the game has been initialized, a user can click on cards to find a Set. Clicking on a card
should toggle its selected state (all cards are initially unselected). When three cards are
selected on the board, there are two possible cases you should handle:

**Case 1**: Selected three cards create a Set
* Number of sets found should be incremented (the set counter should be updated by one in `#details`)
* A message "SET!" should appear in each card before being replaced by a new card after 1 second.
* Any replacement card must not be identical to another card currently on the board.
  * *Hint*: Write a function to check whether the randomly-selected attribute values for a new card
  already correspond to a card on the board. This functionality will be needed in both the initial
  board-generation, as well as replacing a card. When replacing the card, use this function to
  re-generate random attributes for a replacement card until you find a unique combination and then
  create the DOM element for the new card with those attributes.
* When replacing cards in a found Set, the position of other cards should remain unchanged.

**Case 2**: Selected three cards do not create a Set
* A message "Not a Set :(" should appear in each card for 1 second before re-displaying the previous
  card images (you should not create any new image elements in this case).
* If the game is in timed mode, 15 seconds should be deducted from the timer as a penalty to finding
  an incorrect Set, otherwise 15 seconds should be added to the timer. We will give solutions a 1 second leeway for when the game clock updates with an applied penalty.

**Both Cases**:
* Any text displayed on the cards should be bold with a font size of `16pt`. This
  text should be centered horizontally in the card.

Below is an example of the message displayed when an incorrect Set is selected:

<img src="screenshots/game-view-not-set.png" width="60%" alt="Not a Set display example">

For both cases, the three selected cards should be lose the "selected" appearance just prior to the appropriate 1-second message displaying (refer to provided video demo).

#### Refreshing the Board
When the "Refresh Board" button is clicked:
* All cards on the board should be replaced with a new collection of cards, following the same
rules for generating a board outlined in "Starting a Game".

#### Ending the Game
A game ends when the user clicks the "Back to Main" button or when they run out of time in timed
mode. In both cases, the game timer should be cleared and not started again until a new game is
started by the user (when the "Start" button is clicked again).

If the game ends due to running out of time:
* The current view should remain on the Game View until the "Back to Main" button is clicked.
* Any cards currently selected should appear unselected.
* To ensure a user cannot continue playing until a new game is started, nothing should happen when a
user clicks on a card.
* The "Refresh Board" button should also be disabled until it is re-enabled if a user starts a new
game later.

When the "Back to Main" button is clicked:
* The current view should be switched from the Game View to the Menu View having the same selected
options for mode and difficulty as the previous game.

## Development Strategies
Since the board of cards will be populated using JavaScript after switching views, there are a few
different strategies you can take for getting started. When starting your JavaScript, you may a)
find it easier to implement the behavior for switching between Menu View and Game View, or b)
easier to focus on populating the board with cards first (which will require adding CSS properties
for card styles). If you’re unsure where to start, the following strategies suggest an approach
for implementing the Game View after writing the CSS for Menu View.

1. Write the CSS for the Menu View.
2.  Write the initial CSS for the Game View (the details bar and the board border). Hint: Use CSS
to hide the `#menu-view` and show the `#game-view` in this step while you’re working on the
Game View appearance.
3. Write a JS function to create the following Set card and append it to the board in the
Game View (containing a single image, `striped-oval-red.png`):

  <p>
    <img width="40%" src="screenshots/card-one-oval.png" alt="striped-oval-red.png image example">
  </p>

  a) What HTML elements might you identify in this card? The card DOM element you create in the JS
  function should be built using HTML DOM elements.  
  b) Once you have the DOM object created for the card, write CSS (in your set.css file) to apply
  styles to this card.   
  c) Now try adding 3 of the oval images in the card (using JS). Does your CSS need to change to
  get the following?

  <p>
    <img width="40%" src="screenshots/card-three-ovals.png" alt="three striped-oval-red.png image example">
  </p>

  Once you have a function that creates the card DOM object and appends it to the game board in Game
  View and you have CSS to style the card as specified, extend your JS to append 12 cards on the
  board. Once you have 12 card objects within the board, move on to Step 4.
<ol start="4">
  <li>
    Implement CSS to achieve card layout on the board as specified in Appearance for Game View.
  </li>
  <li>
    Modify your JS to randomly-generate the 12 cards on the board (remember you must not have any
    card on the board sharing 4 attribute values). During this step, you should not create more than
    12 card DOM elements (hint: you can give your cards an ID with the 4 attributes in the form:
    *STYLE-SHAPE-COLOR-COUNT*. Focus on generating these attribute combinations one at a time,
    creating a new card only when there’s not a card already on the board with the same attribute string).
  </li>
  <li>
    Finish JS to initialize a game starting at the Menu View, using the default options for the
    difficulty and timer mode.
  </li>
  <li>
    Implement Easy Difficulty (9 cards on the board, all of which have the "solid"
    style)
  </li>
  <li>Implement the game timer requirement for timed and untimed modes.</li>
  <li>Implement card-selection and Set-checking features (remember to add CSS for selected cards).</li>
  <li>Implement "Refresh Board" feature (hint: use the same functionality you use when generating the board initially).</li>
  <li>Test your code for different edge cases, review the spec, and have fun!</li>
</ol>

**Debugging Tools**
We strongly recommend that you use the Chrome DevTools on this
assignment, or use the similar tool built into other browsers. This tool shows syntax errors in your
JavaScript code. As we've demonstrated in class, you can use it as a debugger, set breakpoints, type expressions on the
Console, and watch variables' values. This is an essential tool for efficient JavaScript programming.

Our JSLint tool can help you find common JavaScript bugs. Since this is your first JavaScript
assignment, you will probably encounter tricky bugs. If so, paste your code into JSLint to look for
possible errors or warnings. For full credit, your JavaScript code must pass the provided JSLint
tool with no errors reported ("Warnings" are okay.)

## Internal Requirements
For full credit, your page must not only match the external requirements listed above, you must also
demonstrate that you understand what it means to write code following a set of programming standards.
This includes the following requirements:

* All of your work must be your original work (other than the starter HTML and provided image files)
* You may not collaborate with any other students or cite other sources on this assignment.
* Express all stylistic information on the page using CSS defined in `set.css`.
* Use context selectors to avoid needing to apply classes and ids to large numbers of elements.
* There should be never be any DOM elements on the page sharing the same ID.
* All images in cards should be given an appropriate alt tag.
* You should not have any unnecessary interval/delays running on your page at any time (make sure
  you understand the difference between an interval and delay)
* Your `.js` file must be in the module pattern and run in strict mode by putting ``"use strict";`
  within your file (inside your module pattern).
* Do not use any global variables, and minimize the use of module-global variables. Do not ever
  store DOM element objects, such as those returned by the `document.getElementById` function, as
  global variables.
  * *Note*: Our solution has a module-global variable for the game timer, number of seconds in a
  current game, and number of cards managed for the current game.
* If a particular literal value is used frequently, declare it as a module-global "constant"
IN_UPPER_CASE and use the constant in your code. Our solution has an array for each attribute, a
path to the images folder, and two constants for the number of cards associated with each difficulty.
* You may not use any CSS/JS frameworks for this assignment.
* Your page must use valid CSS3 and JS and successfully pass both the
  [W3C CSS3 validator](https://jigsaw.w3.org/css-validator/) and
  [CSE 154 JSLint](https://oxford.cs.washington.edu/cse154/jslint/) with no errors.
* Your CSS and JS should also maintain good code quality by following the
  [Code Quality Guide](https://courses.cs.washington.edu/courses/cse154/codequalityguide/_site/) posted on the
  class web site. We also expect you to implement relevant feedback from previous assignments.
* Format your CSS, and JS to be as readable as possible, similarly to the examples from class:
  * Place a comment header in each file with your name, section, a brief description of the assignment,
    and the files contents (examples have been given on previous assignments).
  * Properly use whitespace and indent your CSS and JS code as shown in class and in the CSE
    154 code quality guide.
  * To keep line lengths manageable, do not place more than one block element on the same line or
    begin a block element past the 100th character on a line.
  * Use JSDoc to properly document all of your JS functions with `@param` and `@returns` where necessary.
* Do not include any files in your final repository other than those outlined in
  "Starter Files and Final Deliverables".

## Extra Late Day Challenge
When playing Set, it can be hard to know whether a Set exists on the board before deciding to try
a new collection of cards. But each time you reset a board you are more likely to quickly find a
new Set! For an extra late day, you can improve the Set game by:
* Adding a check when the "Refresh Board" button is clicked to see whether a valid set exists on the board
* If the button is clicked when a valid Set exists on the board, a 15 second penalty should be
  applied to the timer (-15 seconds in timed mode, +15 seconds in unlimited time mode) and an alert
  message "(15 second penalty) there were Sets left on the board!" should appear.

**Hint**: One possible way to check for a unique set of cards on the board uses the following pseudocode:

```
for every card A on the board:
    for every other card B on the board:
        for every other card C on the board:
            if isSet(A, B, C) return true
return false
```

## Grading
At publication time the grading rubric for this assignment has not been finalized. However past
assignments similar to this have been graded in the following three areas with the following
approximate percentage of the points allocated to each:

* External Correctness: 45-55%
* Internal Correctness: 30-40% (depending on above)
* Code Quality and Documentation: 15%

## Academic Integrity
As with any CS homework assignment, you may not place your solution to a publicly-accessible web
site, neither during nor after the school quarter is over. Doing so is considered a violation of our
course [academic integrity](https://courses.cs.washington.edu/courses/cse154/19sp/syllabus/syllabus.html#academic-conduct)
policy. As a reminder: This page page states:

  The Paul G Allen School has an entire page on
  [Academic Misconduct](https://www.cs.washington.edu/academics/misconduct) within the context of
  Computer Science, and the University of Washington has an entire page on how
  [Academic Misconduct](https://www.washington.edu/cssc/for-students/academic-misconduct/) is
  handled on their
  [Community Standards and Student Conduct](https://www.washington.edu/cssc/) Page. Please acquaint
  yourself with both of those pages, and in particular how academic misconduct will be reported to
  the University.
