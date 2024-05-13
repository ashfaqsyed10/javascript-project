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
  msg.innerText = "It's a Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};
// const disablechoice = () =>{
//   for (let choices of choice)
// {
//   choices.disabled = true;
// }
// };


const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
      userScore++;
      userScorePara.innerText = userScore;
      msg.innerHTML = `You win! u got one point ${userChoice} beats ${compChoice}`;
      msg.style.backgroundColor = "green";
    } else {
      compScore++;
      compScorePara.innerText = compScore;
      msg.innerHTML = `You lost, comp gets a point ${compChoice} beats your ${userChoice}`;
      msg.style.backgroundColor = "red";
    }
  };
  const restartBtn = document.getElementById("restart-btn");

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
      disablechoice();
    }
  
    // Reset scores to 0 for a new game
    userScore = 0;
    compScore = 0;
  
    // Update the displayed scores
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
  
    // Reset roundsPlayed for a new game
    roundsPlayed = 0;
  
    // Show the restart button after completing 10 rounds
    restartBtn.style.display = "block";
  };
  
  // Event listener for the restart button
  restartBtn.addEventListener("click", () => {
    // Hide the restart button
    restartBtn.style.display = "none";
  
  });
function playGame(userChoice) {
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
    if (roundsPlayed >= 15) {
        endGame();
    }
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

