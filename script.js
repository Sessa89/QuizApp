// Definition JSON-Array mit 1x Frage, 4x Antworten, 1x richtige Antwort
let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners-Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1": "Text Fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2": "&lt;iframe&gt;",
        "answer_3": "&lt;frame&gt;",
        "answer_4": "&lt;frameset&gt;",
        "right_answer": 2
    },
    {
        "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
        "answer_1": "readonly",
        "answer_2": "max",
        "answer_3": "from",
        "answer_4": "spellcheck",
        "right_answer": 1
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title {...}",
        "answer_3": "a.title {...}",
        "answer_4": "a=title {...}",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in JavaScript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4
    }
];


// Definiton von Variabeln, hier: Beginn bei Frage 1 (= Array an der Stelle "0")
let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');


// Definition der Funktion "Initialisierung"
function init() {
    document.getElementById('all-questions').innerHTML = questions.length;      // Anzahl der Fragen entsprechend der Länge des Arrays "questions"

    showQuestion();
}


// Definition der Funktion um Fragen ODER den Endscreen anzuzeigen bzw. auszugeben
function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


// Definition der Funktion um den Fragenfortschritt zu prüfen
function gameIsOver() {
    return currentQuestion >= questions.length      // Ausgabe: "true" oder "false"
}


// Definition der Funktion bzgl. der ausgewählten Frage
function answer(selection) {    // "selection" entspricht hier dem Wert (Variable), welcher aus HTML mitgegeben wird
    let question = questions[currentQuestion];  // Definition der Variable "question", hier: Array "questions" anhand Variable "currentQuestion" (hier = 0)
    let selectedQuestionNumber = selection.slice(-1);   // Definition der Variable "selectedQuestionNumber", hier: Ausgabe des letzten Zeichens (Buchstabe oder Zahl) der voran mitgegebenen Variablen
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {        // if-else-Abfrage => entspricht das letzte Zeichen der voran mitgegebenen Variablen dem Wert der richtigen Antwort, dann wird "richtig" in der Konsole ausgeben, ansonsten "falsch"
        document.getElementById(selection).parentNode.classList.add('bg-success');  // Eltern-Element bekommt die Klasse "bg-success" hinzugefügt (Container wird grün)
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');   // Eltern-Element bekommt die Klasse "bg-danger" hinzugefügt (Container wird rot)
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }

    document.getElementById('next-button').disabled = false;
}


// Definition der Funktion um zu prüfen, ob die richtige Antwort ausgewählt worden ist
function rightAnswerSelected(selectedQuestionNumber) {
    return selectedQuestionNumber == question['right_answer'];
}


// Definition der Funktion zum Anzeigen der nächsten Frage aus dem Array "questions"
function nextQuestion() {
    currentQuestion++;      // Variable wird um "1" erhöht, z. B. von "0" auf "1"

    document.getElementById('next-button').disabled = true;     // Button wird wieder auf "nicht anklickbar" gesetzt

    resetAnswerButtons();       // Funktion "resetAnswerButtons()" wird ausgeführt
    showQuestion();             // Funktion "showQuestion()" wird ausgeführt
}


// Definition der Funktion zum Zurücksetzen der Antwort-Buttons
function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


// Definition der Funktion zum Neustart des Spiels
function restartGame() {
    document.getElementById('header-image').src = "img/quiz.jpg";
    document.getElementById('questionBody').style = '';                 // questionBody wieder anzeigen
    document.getElementById('endScreen').style = 'display: none;';      // End-Screen ausblenden
    currentQuestion = 0;
    rightQuestions = 0;

    init();
}


// Definition der Funktion zum Anzeigen des Endscreens
function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none;'
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-image').src = "img/trophy.png";
}


// Definition der Funktion zum Updaten des Fortschrittbalkens
function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    console.log('Fortschritt:', percent);

    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%`;
}


// Definition der Funktion bzgl. dem Update zur nächsten Frage
function updateToNextQuestion() {
    let question = questions[currentQuestion];  // Definition der Variable "question", hier: Array "questions" anhand Variable "currentQuestion" (hier = 0)

    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];   // Ausgabe der Frage im Feld mit ID = "questiontext" an der Stelle "0" des Arrays "questions"
    document.getElementById('answer_1').innerHTML = question['answer_1'];       // Ausgabe der 1. Antwort im Feld mit ID = "answer_1" an der Stelle "0" des Arrays "questions"
    document.getElementById('answer_2').innerHTML = question['answer_2'];       // Ausgabe der 2. Antwort im Feld mit ID = "answer_2" an der Stelle "0" des Arrays "questions"
    document.getElementById('answer_3').innerHTML = question['answer_3'];       // Ausgabe der 3. Antwort im Feld mit ID = "answer_3" an der Stelle "0" des Arrays "questions"
    document.getElementById('answer_4').innerHTML = question['answer_4'];       // Ausgabe der 4. Antwort im Feld mit ID = "answer_4" an der Stelle "0" des Arrays "questions"
}