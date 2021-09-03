// Variables
// -----------------------------------------------------------------------------

var words = [
	new Word(0, "A", "Empieza por A:", "Hermano mayor de Moises", "AARON"),
	new Word(1, "B", "Empieza por B:", "Un hombre ciego que cuando se entera de que está pasando Jesús, le dice : eres el hijo de David", "BARTIMEO"),
	new Word(2, "C", "Empieza por C:", "Se refiere a Jesucristo como sacrificio vivo, por limpieza de pecados de los hombres, enviado con el propósito de expiación de los pecados de la humanidad del pasado, presente y futuro", "CORDERO"),
	new Word(3, "D", "Empieza por D:", "Término de bienaventurado, bendito, feliz. Según la biblia se le atribuye a la persona que cumple los mandatos y estatutos dados por Dios.", "DICHOSO"),
	new Word(4, "E", "Empieza por E:", "Celos que se llegan a sentir por el éxito de alguien, o la adquisición material de otra persona", "ENVIDIA"),
	new Word(5, "F", "Contiene la F:", "Palabras, enunciados o actos que ensucian o difaman el nombre de Dios.", "BLASFEMIAS"),
	new Word(6, "G", "Empieza por G:", "Posición del alma en un tono de satisfacción, a causa de algún acontecimiento agradable o por algún pensamiento que despierte la alegría y la satisfacción.", "GOZO"),
	new Word(7, "H", "Contiene la H:", "Hija de Aarón, fue la esposa de Zacarías y madre de Juan el Bautista.", "ELIZABETH"),
	new Word(8, "I", "Empieza por I:", "Adoración de un Dios que es falso o que está sustituyendo al que es el verdadero", "IDOLATRIA"),
	new Word(9, "J", "Empieza por J:", "Uno de los primeros apóstoles de Jesús y autor de uno de los Evangelios", "JUAN"),
	new Word(10, "L", "Contiene la L:", "Persona que es capaz de mirar por el bien de los demás con sus actos o su forma de ser.", "BENEVOLENTE"),
	new Word(11, "M", "Empieza por M:", "Habilidad que Dios da a ciertas personas relacionadas con él para que puedan sentir compasión, empatía y amor por las personas.", "MISERICORDIA"),
	new Word(12, "N", "Empieza por N:", "Esposa de Elimelec y madre de Quelión y Mahlón. Entre ella y su nuera Rut existía una relación de amistad.", "NOEMI"),
	new Word(13, "Ñ", "Contiene la Ñ:", "Obtener un beneficio de alguien aparentando o haciéndole creer algo que no es verdad.", "ENGAÑAR"),
	new Word(14, "O", "Empieza por O:", "Exceso de autoestima, comportamiento que tiende a mostrar en exceso las virtudes.", "ORGULLO"),
	new Word(15, "P", "Contiene la P:", "Cartas enviadas por el apóstol Pablo hacia las comunidades cristianas para predicar la doctrina de Jesucristo entre el pueblo.", "EPISTOLA"),
	new Word(16, "Q", "Empieza por Q:", "Humillar el corazón en sentido de hacerlo humilde, sumiso, manso y receptivo a la voluntad de Dios", "QUEBRANTAR"),
	new Word(17, "R", "Empieza por R:", "Dominios, territorios y naciones de la antigüedad, cuyo funcionamiento de Estado es a través de la monarquía.", "REINOS"),
	new Word(18, "S", "Contiene la S:", "Celebración y conmemoración de la resurrección de Jesús el hijo primogénito de Dios al tercer día después de que fue crucificado a cómo se narra en las Biblia.", "PASCUA"),
	new Word(19, "T", "Empieza por T:", "Forma de vivir auténtica del cristianismo, una en que sea evidente que en todo lugar, momento o circunstancia Jesús está en el centro de la vida de esa persona.", "TESTIMONIO"),
	new Word(20, "U", "Contiene la U:", "Descendientes de Canaán ( hijo de Cam ) que vivieron antes de que los israelitas conquistaran sus tierras.", "JEBUSEOS"),
	new Word(21, "V", "Empieza por V:", "Aspecto de la naturaleza humana que se enfoca en aquello que es poco trascendente, poco profundo en la vida; en el que se trata de satisfacerse con cosas más terrenales como la riqueza.", "VANIDAD"),
	new Word(22, "X", "Contiene la X:", "Plenitud de las aguas y el cielo mientras estaban siendo creados y separados por orden de Dios durante la creación del universo.", "EXPANSION"),
	new Word(23, "Y", "Contiene la Y:", "Personas que se dedicaban a vigilar y proteger a las ciudades.", "ATALAYA"),
	new Word(24, "Z", "Contiene la Z:", "Serenidad y autocontrol.", "TEMPLANZA")
];

// Functions
// -----------------------------------------------------------------------------

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}

function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}

var remainingWords = 25;

function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	if (userAnswer == words[pos].word.toLowerCase()) {
		words[pos].correct = true;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--success");

	} else {
		words[pos].correct = false;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--failure");
	}
	remainingWords--;
	$("js--score").html(remainingWords);

	return count++;
}

function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}

function continuePlaying() {
	if (count != 25) {
		$("#js--user-answer").val("");
		showDefinition(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 1) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Fin de partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	return "Has conseguido un total de " + counter + " aciertos.";
}


// Main Program
// ----------------------------------------------------------------------------- */

// New game
var count = 0; // Counter for answered words
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	showDefinition(count);
	countdown();
});

// Send the answer
$("#js--send").click(function() {
	checkAnswer(count);
	continuePlaying();
});

// Key bindings for send the answer
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkAnswer(count);
		continuePlaying();
	}
});

// Skip the word
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuePlaying();
});

// Key bindings for skip the word
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "32") {
		pasapalabra(count);
		continuePlaying();
	}
});

// Play again
$("#js--pa").click(function() {
	location.reload()
});

// End the game
$("#js--close").click(function() {
	endGame();
});
