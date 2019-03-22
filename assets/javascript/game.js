var elements = {
	directions : document.getElementById("directions"),
	winsText : document.getElementById("wins"),
	guessesLeft : document.getElementById("guessesLeft"),
	lettersGuessed : document.getElementById("incorrectLetters"),
	currentWordText : document.getElementById("currentWord"),
};  
	
var game = {

    words : [ "supra","chaser","brabus","maybach","viper","pageout","audi"],
    
	guessesRemaining : 10,
	wins : 0,
	incorrectLetters : [],
	currentWord : "",
	revealedWordArray : [],
	over : false,
	
	initializeValues : function() {
		this.guessesRemaining = 5; elements.guessesLeft.textContent = this.guessesRemaining;
		elements.winsText.textContent = this.wins ;
		this.incorrectLetters = []; elements.lettersGuessed.textContent = "none";
		this.randomizeCurrentWord();
		for (this.revealedWordArray = []; this.revealedWordArray.length < this.currentWord.length ; this.revealedWordArray.push('_')) {} ;
		this.updateDisplayedWord();
	},
	
	updateRevealedWordArray : function(x, y) {
	this.revealedWordArray[x] = y;
	},
	
	updateDisplayedWord : function () {
		document.getElementById("currentWord").innerHTML = "";
		for (var i = 0; i < this.revealedWordArray.length; i++) {
		document.getElementById("currentWord").innerHTML += "<span class=\"letterbox\">";
			document.getElementById("currentWord").innerHTML += this.revealedWordArray[i];
			document.getElementById("currentWord").innerHTML += "</span>";
		}
	},
	
	randomizeCurrentWord : function() {
		var index = Math.floor(Math.random() * this.words.length);
		this.currentWord = this.words[index];}
	
};
	
	function getAllIndexes(arr, val) {
    var indexes = [];	
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === val) { indexes.push(i); }
	}
	return indexes;
}


	game.initializeValues();
	document.onkeyup = function(event) {
	if (game.over) return; // end game
	var userGuess = event.key.toLowerCase(); // Determines which key was pressed.
	
	if ("abcdefghijklmnopqrstuvwxyz".includes(userGuess)) {  //then the keypress was a letter
		if (!game.incorrectLetters.includes(userGuess) && !game.revealedWordArray.includes(userGuess)) //userGuess isn't in either lettersGuessed or revealedWordArray
			{
			var ind = getAllIndexes(game.currentWord, userGuess) ; //check if userguess is in the current word
			if (ind.length != 0) {  //then it is in current word
				for (var x = 0; x < ind.length; x++) {
					game.updateRevealedWordArray(ind[x], userGuess);
				}
				game.updateDisplayedWord();
				if (!game.revealedWordArray.includes('_')) {
					game.wins++;
					elements.directions.textContent = "Good Job mate!! How about this one?";
					game.initializeValues();
				}
			}
			else {
				game.incorrectLetters.push(userGuess); //add userGuess to letters guessed
				elements.lettersGuessed.textContent = game.incorrectLetters;
				game.guessesRemaining--; //reduce guessesRemaining by one 
				elements.guessesLeft.textContent = game.guessesRemaining;
				if (game.guessesRemaining < 1) {
					elements.directions.textContent = "Oof! Good Luck next time!";
				game.over = true; //end game
				}
			}
		}
	}
}