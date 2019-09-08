

$(document).ready(function() {


    // track which question we are on
    var questionCounter = 0;
    // initial time of 15 seconds for each question
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "Rome is the largest city in what county?",
	    choices: ["Floyd", "Bartow", "Calhoun", "Cobb"],
	    correctAnswer: "Floyd",
	    image: "<img src='assests/images/floydcounty.png'>"
	  }, 
	  {
	    question: "Which river is not found in Rome,Ga?",
	    choices: ["St Johns", "Etowah", "Oostanaula", "Coosa"],
	    correctAnswer: "St Johns",
	    image: "<img src='assets/images/rivers.jpg'>"
	  }, 
	  {
	    question: "When was Rome, Ga founded?",
	    choices: ["1818", "1890", "1834", "1914"],
	    correctAnswer: "1834",
	    image: "<img src='assets/images/stoneArches'>"
	  }, 
	  {
	    question: "Berry College sits on how many acres?",
	    choices: ["27,000", "83,480", "460", "280"],
	    correctAnswer: "27,000",
	    image: "<img src='assets/images/BerryCollege.jpg>"
	  }, 
	  {
	    question: "What is the oldest landmark?",
	    choices: ["Mrtyle Hill", "cotton block", "Stone Arches", "Clocktower"],
	    correctAnswer: "Clocktower",
	    image: "<img src='assets/images/ClockTower.jpg>"
	  },
	  {
	    question: "How many hills does Rome, GA have?",
	    choices: ["4", "7", "8", "1"],
	    correctAnswer: "7",
	    image: "<img src='assets/images/RomeGa.jpg>"
	  },
	  {
	    question: "What street runs through the heart of downtown?",
	    choices: ["College", "Broad", "Water", "Main"],
	    correctAnswer: "Broad",
	    image: "<img src=assets/images/RomeGa.jpg>"
	  },
	  {
        question: "What movie was filmed here?",
        choices: ["Sweet Home Alabama", "Anchorman","Need for Speed", "The Originals"],
        correctAnswers: "Sweet Home Alabama",
        image: "<img src=assets/images/BerryCollege.jpg>"
	  }];
	  
	  

	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	// screen that shows final score and nice message :)
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Perfection! Go visit my hometown!";
			var bottomText = "#nerdalert!";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Good work! But do better you can...";
			var bottomText = "When in Rome...";
		}
		else {
			var endMessage = "Your'e still a winner in my eyes";
			var bottomText = "#scrub";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	// console.log(questionCounter);
	// console.log(questions[questionCounter].correctAnswer);
	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    
		questionContent();
    	timer();
    	userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});