let userScore = 0;
let compScore = 0;
let roundsPlayed = 0; // Initialize roundsPlayed

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const endGame = () => {
  if (userScore > compScore) {
    msg.innerText = "Congratulations! You are the winner!";
    msg.style.backgroundColor = "blue";
  } else if (userScore < compScore) {
    msg.innerText = "Sorry, you lost. Better luck next time!";
    msg.style.backgroundColor = "orange";
  } else {
    msg.innerText = "It's a tie! The game ends in a draw.";
    msg.style.backgroundColor = "gray";
  }

  // Reset roundsPlayed for a new game
  roundsPlayed = 0;
};

const playGame = (userChoice) => {
  // Increment the rounds counter before checking the condition
  roundsPlayed++;

  // Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    // Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      // scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      // rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      // rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }

  // Check if the maximum number of rounds (10) is reached
  if (roundsPlayed >= 10) {
    endGame();
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});