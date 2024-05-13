let userScore = 0;
let compScore = 0;
let roundsPlayed = 0;

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
  msg.innerText = "It's a Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const disableChoices = () => {
  choices.forEach((choice) => {
    choice.disabled = true;
  });
};

const enableChoices = () => {
  choices.forEach((choice) => {
    choice.disabled = false;
  });
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerHTML = `You win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerHTML = `You lost, ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const endGame = () => {
  if (userScore > compScore) {
    msg.innerHTML = `Congratulations! You are the winner! (Score: ${userScore}-${compScore})`;
    msg.style.backgroundColor = "blue";
  } else if (userScore < compScore) {
    msg.innerHTML = `Sorry, you lost the game. Better luck next time! (Score: ${userScore}-${compScore})`;
    msg.style.backgroundColor = "orange";
  } else {
    msg.innerHTML = `It's a tie! The game ends in a draw. (Score: ${userScore}-${compScore})`;
    msg.style.backgroundColor = "gray";
  }

  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  roundsPlayed = 0;
  document.getElementById("restart-btn").style.display = "block";
  disableChoices();
};

document.getElementById("start-game-btn").addEventListener("click", () => {
  enableChoices();
});

document.getElementById("restart-btn").addEventListener("click", () => {
  document.getElementById("restart-btn").style.display = "none";
  enableChoices();
});

function playGame(userChoice) {
  roundsPlayed++;
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }

  if (roundsPlayed >= 15) {
    endGame();
  }
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playGame(choice.id);
  });
});