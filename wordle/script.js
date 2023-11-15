import { WORDS } from "./words.js";

let guessesRemaining = 6;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
let modalOn = false;

console.log(rightGuessString);

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === "var(--green)") {
        return;
      }

      if (oldColor === "var(--yellow)" && color !== "var(--green)") {
        return;
      }

      elem.style.backgroundColor = color;
      elem.style.color = "white";
      break;
    }
  }
}

function deleteLetter() {
  let row = document.getElementsByClassName("word-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

function checkGuess() {
  let row = document.getElementsByClassName("word-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
   
    return;
  }

  if (!WORDS.includes(guessString)) {
    let modal = document.getElementById("wordNotInListBox");
    modalOn = true;
    modal.style.display = "block";
    setTimeout(function() {modal.style.display = "none"; modalOn = false;}, 1200);
    return;
  }

  var letterColor = ["var(--gray)", "var(--gray)", "var(--gray)", "var(--gray)", "var(--gray)"];

  //check green
  for (let i = 0; i < 5; i++) {
    if (rightGuess[i] == currentGuess[i]) {
      letterColor[i] = "var(--green)";
      rightGuess[i] = "#";
    }
  }

  //check yellow
  //checking guess letters
  for (let i = 0; i < 5; i++) {
    if (letterColor[i] == "var(--green)") continue;

    //checking right letters
    for (let j = 0; j < 5; j++) {
      if (rightGuess[j] == currentGuess[i]) {
        letterColor[i] = "var(--yellow)";
        rightGuess[j] = "#";
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    let box = row.children[i];
    let delay = 100 * i;
    setTimeout(() => {
      //flip box
      box.style.transform = "rotateX(360deg)";
      //shade box
      box.style.color = "white";
      box.style.backgroundColor = letterColor[i];
      shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
    }, delay);
  }

  if (guessString === rightGuessString) {
    guessesRemaining = 0;
    let headerResult = document.getElementById("modal-result-header");
    headerResult.innerHTML="You done it! Congratulation!";
    let wordResult = document.getElementById("word-result");
    wordResult.innerHTML= rightGuessString;
    let modal = document.getElementById("resultBox");
    modalOn = true;
    modal.style.display = "block";
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      let headerResult = document.getElementById("modal-result-header");
      headerResult.innerHTML="Game Over !";
      let wordResult = document.getElementById("word-result");
      wordResult.innerHTML= rightGuessString;
      let modal = document.getElementById("resultBox");
      modalOn = true;
      modal.style.display = "block";
    }
  }
}

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("word-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}


document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0 || modalOn) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }

  if (pressedKey.length>1) {
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

document.getElementById("keyboard-container").addEventListener("click", (e) => {
  if (!modalOn){
     const target = e.target;
  
     if (!target.classList.contains("keyboard-button")) {
        return;
     }
     let key = target.textContent;

     if (key === "Del") {
         key = "Backspace";
     }
     document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
  }
});

// Get the modal
let modal = document.getElementById("helpBox");
// Get the span "WORD" id="help"
let spanHelp = document.getElementById("help-span");

// When the user clicks the WORD, open the modal 
spanHelp.onclick = function() {
  modalOn = true;
  modal.style.display = "block";
}

// Get the span "WORD" id="help"
let spanModalClose = document.getElementById("modal-close");

// When the user clicks on <span> (x), close the modal
spanModalClose.onclick = function() {
  modal.style.display = "none";
  modalOn = false;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//When click NEXT WORD --> reload the page
document.getElementById("next-word").addEventListener("click", (e) => {
  location.reload();
})
