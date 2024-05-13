// Variables to keep track of scores and rounds played
let userScore = 0;
let compScore = 0;
let roundsPlayed = 0; // Initialize roundsPlayed

// Selecting HTML elements using querySelector
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Function to generate computer's choice (rock, paper, or scissors)
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

// Function to handle a draw game
const drawGame = () => {
  msg.innerText = "It's a Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Function to display the winner and update scores
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerHTML = `You win! You got one point. ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerHTML = `You lost. Comp gets a point. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

// Selecting the restart button
const restartBtn = document.getElementById("restart-btn");

// Function to end the game and display final results
const endGame = () => {
  if (userScore > compScore) {
    msg.innerHTML = `Congratulations! You are the winner! 🏆😃 (Score: ${userScore}-${compScore})`;
    msg.style.backgroundColor = "blue";
  } else if (userScore < compScore) {
    msg.innerHTML = `Sorry, you lost the game. Better luck next time! 😢💔 (Score: ${userScore}-${compScore})`;
    msg.style.backgroundColor = "orange";
  } else {
    msg.innerHTML = `It's a tie! The game ends in a draw. 😐🤝 (Score: ${userScore}-${compScore})`;
    msg.style.backgroundColor = "gray";
  }

  // Reset scores and roundsPlayed for a new game
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  roundsPlayed = 0;

  // Show the restart button after completing 15 rounds
  restartBtn.style.display = "block";
};

// Event listener for the restart button
restartBtn.addEventListener("click", () => {
  // Hide the restart button
  restartBtn.style.display = "none";
});

// Function to play the game based on the user's choice
function playGame(userChoice) {
  // Increment the rounds counter before checking the condition
  roundsPlayed++;

  // Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    // Draw Game
    drawGame();
  } else {
    // Determine the winner
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    // Display the winner and update scores
    showWinner(userWin, userChoice, compChoice);
  }

  // Check if the maximum number of rounds (15) is reached
  if (roundsPlayed >= 15) {
    endGame();
  }
}

// Event listener for the choices (rock, paper, scissors)
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});