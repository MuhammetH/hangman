var elements = {
	directions : document.getElementById("directions"),
	winsText : document.getElementById("wins"),
	guessesLeft : document.getElementById("guessesLeft"),
	lettersGuessed : document.getElementById("incorrectLetters"),
	currentWordText : document.getElementById("currentWord"),
};  
	
var game = {

    words : [ "supra","chaser","brabus","maybach","viper","peugeut","audi","honda", "bugatti", "volkswagen"],
    
	guessesRemaining : 10,
	wins : 0,
	incorrectLetters : [],
	currentWord : "",
	revealedWordArray : [],
	over : false,
	
	initializeValues : function() {
		this.guessesRemaining = 10; elements.guessesLeft.textContent = this.guessesRemaining;
		elements.winsText.textContent = this.wins ;
		this.incorrectLetters = []; elements.lettersGuessed.textContent = "none";
		this.randomizeCurrentWord();
		for (this.revealedWordArray = []; this.revealedWordArray.length < this.currentWord.length ; this.revealedWordArray.push(' _')) {} ;
		this.updateDisplayedWord();
	},
	
	revealedWord : function(x, y) {
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
	if (game.over) return; // game over
	var userGuess = event.key.toLowerCase(); // key press event.
	
	if ("abcdefghijklmnopqrstuvwxyz".includes(userGuess)) {  //making sure user guess is a letter.
	if (!game.incorrectLetters.includes(userGuess) && !game.revealedWordArray.includes(userGuess)) 
			{
			var ind = getAllIndexes(game.currentWord, userGuess) ; //checks if user guess is included on current word.
			if (ind.length != 0) {  
				for (var x = 0; x < ind.length; x++) {
					game.revealedWord(ind[x], userGuess);
				}
				game.updateDisplayedWord();
		if (!game.revealedWordArray.includes(' _')) {
					game.wins++;
					elements.directions.textContent = ("Good Job mate!! How about this one?");// changes directions to this sentence.
					game.initializeValues();
				}
			}
			else {
				game.incorrectLetters.push(userGuess); //adds the user guess to incorrect letters if it is not included on current word.
				elements.lettersGuessed.textContent = game.incorrectLetters;
				game.guessesRemaining--; //when user guess is wrong, guesses remaining decreases one.
				elements.guessesLeft.textContent = game.guessesRemaining;
				if (game.guessesRemaining < 1) {
					elements.directions.textContent = "Oof! Good Luck next time!";
				game.over = true; //game over!
				}
			}
		}
	}
}