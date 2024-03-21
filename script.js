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

// Definition der Funktion "Initialisierung"
function init() {
    document.getElementById('all-questions').innerHTML = questions.length;      // Anzahl der Fragen entsprechend der Länge des Arrays "questions"
    
    showQuestion();
}

// Definition der Funktion um die Frage anzuzeigen bzw. auszugeben
function showQuestion() {
    let question = questions[currentQuestion];  // Definition der Variable "question", hier: Array "questions" anhand Variable "currentQuestion" (hier = 0)

    document.getElementById('questiontext').innerHTML = question['question'];   // Ausgabe der Frage im Feld mit ID = "questiontext" an der Stelle "0" des Arrays "questions"
    document.getElementById('answer_1').innerHTML = question['answer_1'];       // Ausgabe der 1. Antwort im Feld mit ID = "answer_1" an der Stelle "0" des Arrays "questions"
    document.getElementById('answer_2').innerHTML = question['answer_2'];       // Ausgabe der 2. Antwort im Feld mit ID = "answer_2" an der Stelle "0" des Arrays "questions"
    document.getElementById('answer_3').innerHTML = question['answer_3'];       // Ausgabe der 3. Antwort im Feld mit ID = "answer_3" an der Stelle "0" des Arrays "questions"
    document.getElementById('answer_4').innerHTML = question['answer_4'];       // Ausgabe der 4. Antwort im Feld mit ID = "answer_4" an der Stelle "0" des Arrays "questions"
}

// Definition der Funktion bzgl. der ausgewählten Frage
function answer(selection) {    // "selection" entspricht hier dem Wert (Variable), welcher aus HTML mitgegeben wird
    let question = questions[currentQuestion];  // Definition der Variable "question", hier: Array "questions" anhand Variable "currentQuestion" (hier = 0)

    console.log('selected answer is ', selection);  // Ausgabe des Textes "selected answer is" und der ausgewählten Antwort (Variable) in der Konsole
    let selectedQuestionNumber = selection.slice(-1);   // Definition der Variable "selectedQuestionNumber", hier: Ausgabe des letzten Zeichens (Buchstabe oder Zahl) der voran mitgegebenen Variablen
    console.log('selectedQuestionNumber is ', selectedQuestionNumber);  // Ausgabe des Textes "selectedQuestionNumber is" und das letzte Zeichen der voran mitgegebenen Variablen in der Konsole
    console.log('Current question is ', question['right_answer']);  // Ausgabe des Textes "Current question is" und der richtigen Antwort (hier: an der Stelle "0" des Arrays) in der Konsole

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if(selectedQuestionNumber == question['right_answer']) {        // if-else-Abfrage => entspricht das letzte Zeichen der voran mitgegebenen Variablen dem Wert der richtigen Antwort, dann wird "richtig" in der Konsole ausgeben, ansonsten "falsch"
        console.log('Richtige Antwort!');
        document.getElementById(selection).parentNode.classList.add('bg-success');  // Eltern-Element bekommt die Klasse "bg-success" hinzugefügt (Container wird grün)
    } else {
        console.log('Falsche Antwort!');
        document.getElementById(selection).parentNode.classList.add('bg-danger');   // Eltern-Element bekommt die Klasse "bg-danger" hinzugefügt (Container wird rot)
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }

    document.getElementById('next-button').disabled = false;
}