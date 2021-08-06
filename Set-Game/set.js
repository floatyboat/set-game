// Name: Spencer Boat
// Date: 4/25/19
// Section: CSE 154 AN
//
// This is the JS to implement the Set game and change between the #menu-view and #game-view.
//

(function() {
  "use strict";

  const MIN = 60;
  const SEC = 1000;
  const COUNT = [1, 2, 3];
  const STYLE = ["solid", "outline", "striped"];
  const COLOR = ["green", "purple", "red"];
  const SHAPE = ["diamond", "oval", "squiggle"];
  let timer = null;
  let seconds = 0;

  window.addEventListener("load", init);
  /**
   *  Called when the page is loaded. Makes the Start button respond to a click event
   */
  function init() {
    id("start").addEventListener("click", startGame);
  }

  /**
   *  Starts the game. Hides menu and shows game.Makes all buttons work and cards clickable.
   *  Calls functions to start timer and generate a random aboard of set cards.
   */
  function startGame() {
    id("start").removeEventListener("click", startGame);
    id("refresh").addEventListener("click", refresh);
    id("main-btn").addEventListener("click", backMain);
    let count = id("set-count");
    count.innerText = "0";
    clock();
    id("game-view").classList.remove("hidden");
    id("menu-view").classList.add("hidden");
    board();
  }

  /**
   *  Starts the timer based on what time setting the user chose. Stops timer and
   *  calls function to end the game when time is out.
   */
  function clock() {
    let time = id("time");
    let minutes = 0;
    seconds = 0;
    if(unlimited()) {
      timer = setInterval(() => {
        seconds++;
        if(seconds >= MIN) {
          minutes++;
          seconds-= MIN;
        }
        displayTime(time, minutes);
      }, SEC);
    } else {
      let timeVal = parseInt(id("menu-view").querySelector("select").value);
      minutes = Math.floor(timeVal / MIN);
      displayTime(time, minutes);
      timer = setInterval(() => {
        seconds--;
        if((minutes + seconds) < 0) {
          seconds = 0;
          displayTime(time, 0);
          endGame();
        } else if(seconds < 0) {
          minutes--;
          seconds = MIN + seconds;
        }
        displayTime(time, minutes);
      }, SEC);
    }
  }

  /**
   *  Displays time calculated by the clock() function in correct format.
   *  @param {object} time The DOM element time that represents the game clock in set.html
   *  @param {integer} minutes The amount of minutes to be displayed on the game clock
   */
  function displayTime(time, minutes) {
    if(seconds >= 10) {
      time.innerText = minutes + ":" + seconds;
    } else {
      time.innerText = minutes + ":0" + seconds;
    }
  }

  /**
   *  Called when the user selects 3 cards that are not a set. Assesses a 15 second penalty to
   *  Game clock
   */
  function timePenalty() {
    if(unlimited()) {
      seconds+= 15;
    } else {
      seconds-= 15;
    }
  }

  /**
   *  Tells if unlimited time was selected or not for the game clockm and penalties.
   *  @returns {boolean} true if unlimited time was selected. False otherwise
   */
  function unlimited() {
    let timeSet = id("menu-view").querySelector("select").value;
    return timeSet === "none";
  }

  /**
   *  Tells if easy difficulty was selected for card generation.
   *  @returns {boolean} true if easy difficulty was selected. False otherwise.
   */
  function easy() {
    let diff = id("menu-view").querySelector("input[name='diff']:checked").value;
    return diff === "easy";
  }

  /**
   *  Generates a full board of unique set cards depending on which difficulty was selected.
   */
  function board() {
    let cardNum = 0;
    if(easy()) {
      cardNum = 9;
    } else {
      cardNum = 12;
    }
    for(let i = 1; i <= cardNum; i++) {
      let cardID = picPicker();
      if(id(cardID)) {
        i--;
      } else {
        let resultCard = document.createElement("div");
        resultCard.classList.add("card");
        resultCard = picAdder(resultCard, cardID);
        id("game").appendChild(resultCard);
      }
      id(cardID).addEventListener("click", setChecker);
    }
  }

  /**
   *  Picks a random image and amount of image for a card
   *  @returns {string} A string of all the elements of the card to be made by the image
   *  and count picked
   */
  function picPicker() {
    let cardStyle = "";
    if(easy()) {
      cardStyle = STYLE[0];
    } else {
      cardStyle = STYLE[Math.floor(Math.random() * STYLE.length)];
    }
    let cardShape = SHAPE[Math.floor(Math.random() * SHAPE.length)];
    let cardColor = COLOR[Math.floor(Math.random() * COLOR.length)];
    let cardCount = COUNT[Math.floor(Math.random() * COUNT.length)];
    return cardStyle + "-" + cardShape + "-" + cardColor + "-" + cardCount;
  }

  /**
   *  Adds the image and amount picked by picPicker() to a card element.
   *  @param {object} resultCard The DOM card element to have the image(s) added to it
   *  @param {string} cardID the id of the card being made in string form.
   *  @returns {object} the completed resultCard DOM element.
   */
  function picAdder(resultCard, cardID) {
    let idArray = cardID.split("-");
    let cardFile = "img/" + idArray[0] + "-" + idArray[1] + "-" + idArray[2] + ".png";
    for(let i = 1; i <= idArray[3]; i++) {
      let cardImg = document.createElement("img");
      cardImg.src = cardFile;
      resultCard.appendChild(cardImg);
    }
    resultCard.id = cardID;
    resultCard.alt = idArray[0] + ", " + idArray[1] + ", " + idArray[2] + ", " + idArray[3];
    return resultCard;
  }

  /**
   *  Called when a card is selected. Toggles the selected class. Checks if three cards are
   *  selected to be checked if they make a set.
   */
  function setChecker() {
    this.classList.toggle("selected");
    let select = document.getElementsByClassName("selected");
    if(select.length === 3) {
      let setStyle = [];
      let setShape = [];
      let setColor = [];
      let setCount = [];
      for(let i = 0; i < select.length; i++) {
        let ids = select[i].id.split("-");
        setStyle[i] = ids[0];
        setShape[i] = ids[1];
        setColor[i] = ids[2];
        setCount[i] = ids[3];
      }
      let goodStyle = sameOrDifferent(setStyle);
      let goodShape = sameOrDifferent(setShape);
      let goodColor = sameOrDifferent(setColor);
      let goodCount = sameOrDifferent(setCount);
      if(goodStyle && goodShape && goodColor && goodCount) {
        id("set-count").innerText++;
        set();
      } else {
        notASet();
      }
    }
  }

  /**
   *  Checks if the three cards attributes are all the same or all different.
   *  @param {array} type an array containing a string a single attribute of all the cards
   *  selected.
   *  @returns {boolean} true if contributes to a set, all same or all different.
   *  False if the attribute does not make a set.
   */
  function sameOrDifferent(type) {
    if(type[0] === type[1] && type[0] === type[2] && type[1] === type[2]) {
      return true;
    } else {
      let check = [];
      for(let i = 0; i < type.length; i++) {
        if(check.includes(type[i])) {
          return false;
        } else {
          check[i] = type[i];
        }
      }
      return true;
    }
  }

  /**
   *  If the cards selected make a set, this function is called to replace the selected cards
   *  with new images and display the message "SET!" over the cards for one second.
   */
  function set() {
    let select = qsa(".selected");
    for(let i = 0; i < select.length; i++) {
      let message = document.createElement("p");
      message.classList.add("result");
      message.innerText = "SET!";
      changeCard(select[i]);
      select[i].appendChild(message);
      select[i].classList.remove("selected");
    }
    setTimeout(function() {
      hideMessage(select);
    }, SEC);
  }

  /**
   *  Called to generate a new card image in the spot of a card that was part of a set.
   *  @param {object} card the DOM card that will be changed
   */
  function changeCard(card) {
    card.innerHTML = "";
    let cardID = picPicker();
    while(id(cardID)) {
      cardID = picPicker();
    }
    picAdder(card, cardID);
    let pics = card.children;
    for(let i = 0; i < pics.length; i++) {
      pics[i].classList.add("hidden");
    }
  }

  /**
   *  Called when the three cards selected do not make a set. this function shows the message
   *  "Not a Set :(" on the selected cards for one second
   *  then replaces it with the same card image(s)
   */
  function notASet() {
    let select = qsa(".selected");
    timePenalty();
    for(let i = 0; i < select.length; i++) {
      let message = document.createElement("p");
      message.classList.add("result");
      message.innerText = "Not a Set :(";
      for(let j = 0; j < select[i].children.length; j++) {
        select[i].children[j].classList.add("hidden");
      }
      select[i].appendChild(message);
      select[i].classList.remove("selected");
    }

    setTimeout(function() {
      hideMessage(select);
    }, SEC);
  }

  /**
   *  Hides the message displayed on the card and displays the old images if it was not a set
   *  and new images if it was a set.
   *  @param {nodeList} select a list of the selected DOM card elements
   */
  function hideMessage(select) {
    for(let i = 0; i < select.length; i++) {
      let child = select[i].getElementsByClassName("result")[0];
      select[i].removeChild(child);
      let pics = select[i].children;
      for(let j = 0; j < pics.length; j++) {
        pics[j].classList.remove("hidden");
      }
    }
  }

  /**
   *  Called when the "refresh" button is clicked. refreshes the game board with new cards
   */
  function refresh() {
    id("game").innerHTML = "";
    board();
  }

  /**
   *  Called when the "back to main" button is clicked. Ends the game, hides the game screen,
   *  and shows menu screen.
   */
  function backMain() {
    id("game").innerHTML = "";
    endGame();
    id("start").addEventListener("click", startGame);
    id("main-btn").removeEventListener("click", backMain);
    id("menu-view").classList.remove("hidden");
    id("game-view").classList.add("hidden");
  }

  /**
   *  Ends the game. Stops the timer. Unselects all selected cards.
   *  Disables the ability to select cards and click the refresh button.
   */
  function endGame() {
    clearInterval(timer);
    timer = null;
    let cards = qsa(".card");
    for(let i = 0; i < cards.length; i++) {
      cards[i].classList.remove("selected");
      cards[i].removeEventListener("click", setChecker);
    }
    id("refresh").removeEventListener("click", refresh);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

})();
