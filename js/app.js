// Variables
// -----------------------------------------------------------------------------

var words = [
	new Word(0, "A", "EMPIEZA POR A:", "Primer Hombre", "ADAN"),
	new Word(1, "B", "EMPIEZA POR B:", "Israel adoraba un … y fue reprendido por Dios a través de un profeta en las ciudades de Belén y Dan", "BECERRO"),
	new Word(2, "C", "Empieza por C:", "quiere decir “cuadragésima” y significa en sentido literal, cuadragésimo día.", "CUARESMA"),
	new Word(3, "D", "Empieza por D:", "Se refiere a una ofrenda dando el diez por ciento de las ganancias obtenidas.", "DIEZMO"),
	new Word(4, "E", "Empieza por E:", "El pueblo al que se dirigían dos discípulos del Señor Jesús en el día de su resurrección", "EMAUS"),
	new Word(5, "F", "Contiene la F:", "Se refiere a aquello que se presenta o se entrega a modo de adoración a Dios", "OFRENDA"),
	new Word(6, "G", "Empieza por G:", "Es el lugar donde Jehová y su pueblo Israel instalaron su primer campamento en tierra prometida", "GILGAL"),
	new Word(7, "H", "Contiene la H:", "Dios le dice en Canaan que serían sus tierras, tierra prometida y bendecida, donde tendría a toda su descendencia", "ABRAHAM"),
	new Word(8, "I", "Empieza por I:", "Se refiere a la respuesta emocional en el conocimiento del mal y la injusticia, también se le conoce como enojo", "IRA"),
	new Word(9, "J", "Empieza por J:", "Se refiere al personaje bíblico hijo menor de Jacob y Raquel", "JOSE"),
	new Word(10, "L", "Contiene la L:", "Segundo hijo de Adán y Eva", "ABEL"),
	new Word(11, "M", "Empieza por M:", "Muchedumbre de gentes convertida al cristianismo o pronta a su conversión", "MIES"),
	new Word(12, "N", "Empieza por N:", "Se entiende este término en personas que suelen usar su talento en obras malas", "NECIO"),
	new Word(13, "Ñ", "Contiene la Ñ:", "Acción de gran esfuerzo y valor.", "HAZAÑA"),
	new Word(14, "O", "Empieza por O:", "Se refiere a una conversación entre Dios y el ser humano", "ORACION"),
	new Word(15, "P", "Contiene la P:", "Era muy usado por Cristo para enseñar, un método que resultaba muy efectivo y dejaba huella en el oyente, donde difícilmente se le podría olvidar.", "PARABOLA"),
	new Word(16, "Q", "Empieza por Q:", "Es proceso, queja, pero significó también falta de fe en Dios del pueblo de Israel", "QUERELLA"),
	new Word(17, "R", "Empieza por R:", "Se refiere la retribución o reconocimiento que se obtiene a partir de acciones y conductas satisfactorias para quien la da", "RECOMPENSA"),
	new Word(18, "S", "Contiene la S:", "Fue el primer discípulo que fue llamado por Jesús", "ANDRES"),
	new Word(19, "T", "Empieza por T:", "Un santuario móvil o itinerante que fue erigido por los israelitas siguiendo las instrucciones de Dios dadas a Moises en el Monte Sinaí", "TABERNACULO"),
	new Word(20, "U", "Contiene la U:", "Es entendido como la abstención de la injerencia de alimentos y bebidas", "AYUNO"),
	new Word(21, "V", "Empieza por V:", "Se refiere al deseo, a la firme determinación, al consentimiento", "VOLUNTAD"),
	new Word(22, "X", "Contiene la X:", "Se refiere al segundo libro de la biblia, donde narra el tiempo de esclavitud por el que pasó el pueblo hebreo bajo dominio del reino de Egipto ", "EXODO"),
	new Word(23, "Y", "Contiene la Y:", "Jesús utiliza el término para invitarnos a unirnos a él", "YUGO"),
	new Word(24, "Z", "Contiene la Z:", "Se refiere a los individuos pertenecientes al pueblo de Nazaret", "NAZARENO")
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
