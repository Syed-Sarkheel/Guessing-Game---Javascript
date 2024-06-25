const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const options = {
    min: 1,
    max: 100,
    thresh: 5,
    goal: "",
    maxattempts: 2,
    minthresh:0,
    maxthresh:0,
};

const user = {
    username: "",
};


let attempts = 0;

function createGoal() {
    console.log("Generating a goal...");
    options.goal = Math.floor(Math.random() * (options.max - options.min + 1)) + options.min;
    console.log("Successfully generated a goal");
    options.minthresh=options.goal-options.thresh;
    options.maxthresh=options.goal+options.thresh;

    takeGuess();

}

function takeGuess() {
    rl.question("Guess a number between " + options.min + " and " + options.max + ": ", (answer) => {
        const guess = answer;
       
            evaluateGuess(guess);
        
    });
}

function evaluateGuess(guess) {
    attempts++;
    if (guess == options.goal) {
        console.log(`Congratulations ${user.username}! You guessed it right in ${attempts} attempt(s).`);
        rl.close();
    } else if (guess>=minthresh && guess<=maxthresh) {
        console.log(`You are close to the goal.`);
    } else if (guess < options.goal) {
        console.log(`Guess Higher.`);
    } else {
        console.log(`Guess Lower.`);
    }

    if (attempts >= options.maxattempts) {
        console.log(`Sorry, you have reached the maximum number of attempts (${options.maxattempts}). The correct number was ${options.goal}.`);
        rl.close();
    } else {
        takeGuess();
    }
}
function enrollUser() {
    rl.question("What is your name?: ", (name) => {
        user.username = name;
        console.log(`Hello ${user.username}! Let's play a game.`);
        createGoal(); 
    });
}
enrollUser();
