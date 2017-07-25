var questions = [];
questions[0] = "Which superhero did Nolan direct films about?";
questions[1] = "Who starred in Nolan's sci-fi thriller Inception?";
questions[2] = "Which Nolan film starred Christian Bale as a magician, who was rivaled against Hugh Jackman?";
questions[3] = "Christopher Nolan's brother is also a talented writer and director; what is his name?";
questions[4] = "Which composer has provided the musical scores for the majority of Nolan's films?";
questions[5] = "Which 2017 Nolan film depicts a famous WWII battle?";
questions[6] = "Which Nolan film centered around a protagonist with a short term memory loss condition?";
questions[7] = "Which actor played The Joker in Nolan's critically acclaimed film, The Dark Knight?";
questions[8] = "Al Paccino starred in which Nolan thriller?";
questions[9] = "Who starred as Matthew McConaughey's daughter in Nolan's sci-fi thriller, Interstellar?";

var answerChoices = [];
answerChoices[0] = ["Superman", "Batman", "Spiderman", "Deadpool"];
answerChoices[1] = ["Leonardo DiCaprio", "Brad Pitt", "Guy Pearce", "Matthew McConaughey"];
answerChoices[2] = ["Batman Begins", "The Dark Knight", "The Prestige", "Memento"];
answerChoices[3] = ["Jonathan", "William", "Nolan", "Edward"];
answerChoices[4] = ["John Williams", "Danny Elfman", "Howard Shore", "Hans Zimmer"];
answerChoices[5] = ["Pearl Harbor", "Dunkirk", "Interstellar", "Fury"];
answerChoices[6] = ["Memento", "Inception", "The Prestige", "Insomnia"];
answerChoices[7] = ["Leonardo DiCaprio", "Tom Hardy", "Christian Bale", "Heath Ledger"];
answerChoices[8] = ["Insomnia", "Interstellar", "Inception", "Dunkirk"];
answerChoices[9] = ["Jessica Chastain", "Anne Hathaway", "Margot Robbie", "Marion Cotillard"];

var correctAnswer = [];
correctAnswer[0] = "Batman";
correctAnswer[1] = "Leonardo DiCaprio";
correctAnswer[2] = "The Prestige";
correctAnswer[3] = "Jonathan";
correctAnswer[4] = "Hans Zimmer";
correctAnswer[5] = "Dunkirk";
correctAnswer[6] = "Memento";
correctAnswer[7] = "Heath Ledger";
correctAnswer[8] = "Insomnia";
correctAnswer[9] = "Jessica Chastain";

var intervalId;
var time;
var count;
var userGuess;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var correctGif = "<img src='assets/images/right.gif'>";
var incorrectGif = "<img src='assets/images/joker.gif'>";
var unansweredGif = "<img src='assets/images/matthew.gif'>";


function start() {
	$(".start").remove();
	count = -1;
	$("<div class='display'></div>").insertAfter($(".header"));
	$(".display").append($("<h2 class='questionChoice'><span id='question'></span></h2>"));
	$(".display").append($("<div class='gifHeader'></div>"));
	$(".display").append($("<div class='gif'></div>"));
	$(".display").append($("<div class='results'></div>"));
	nextQuestion();

}

function timer() {
	time = 15;
	$("#time").text(time);
	intervalId = setInterval(function() {
		time--;
		$("#time").text(time);
		console.log(time);
		if (time === 0) {
			clearInterval(intervalId);
			unanswered++;
			$(".gifHeader").append("<h2>You didn't account for the undlerying assumption of time.</h2>");
        	$(".gif").append(unansweredGif);
			timeout();
		}
	}, 1000);
}

function nextQuestion() {
	clearInterval(intervalId);
	$(".display").prepend($("<h2 class='timeRemaining'>Time remaining: <span id='time'></span></h2>"));
	$(".display").append($("<h2 class='questionChoice'><span id='question'></span></h2>"));
	$(".answer-choices").remove();
	count++;
	$("#question").text(questions[count]);

	if (count === questions.length) {
		calculateResults();
		// alert("Game Over!");
	} else {
		timer();
		for (var i = 0; i < 4; i++) {
			$(".display").append($("<div class='answer-choices'>"+ answerChoices[count][i] + "</div>"));
		}
	}
}

function gradeQuestion() {

    userGuess = $(this).text();
    
    if(userGuess === correctAnswer[count]){
        correct++;
        console.log(correct);
        $(".gifHeader").append("<h2>Well done.</h2>");
        $(".gif").append(correctGif);
        timeout();
    } else {
        incorrect++;
        console.log(incorrect);
        $(".gifHeader").append("<h2>hahahaha wrong</h2>");
        $(".gif").append(incorrectGif);
        timeout();
    }
}

function timeout() {
	$(".timeRemaining").remove();
	$(".questionChoice").remove();
	$(".answer-choices").remove();
	clearInterval(intervalId);
	setTimeout(function() {
		$(".gifHeader").empty();
		$(".gif").empty();
		nextQuestion();
	}, 3500);
}

function calculateResults() {
	$(".timeRemaining").remove();
	$(".results").append("<h2>Correct: <span id='correct'></h2>");
	$(".results").append("<h2>Incorrect: <span id='incorrect'></h2>");
	$(".results").append("<h2>Unanswered: <span id='unanswered'></h2>");
	$(".results").append("<button type='button' class='btn btn-primary btn-lg reset'>Reset</button>")
	$("#correct").text(correct);
	$("#incorrect").text(incorrect);
	$("#unanswered").text(unanswered);
}

function reset() {
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	$(".results").remove();
	$(".display").remove();
	start();
}

$(document.body).on("click", ".answer-choices", gradeQuestion);
$(".start").on("click", start);
$(document.body).on("click", ".reset", reset);
$("#time").text(time);

