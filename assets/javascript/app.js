$(document).ready(function() {
    //variables
    var time = 20,
        correct = 0,
        incorrect = 0,
        current = 0,
        trivia = [],
        timer,
        display,
        i,
        randomizedArray,
        mute = false;

        $('#mute').hide();

    //click to star the game
    $('#start').click(function() {
        game.new();
        playAudio();
    });
    //click to reset the game
    $('#reset').click(function() {
        game.reset();
        playAudio();
    });
    //click to toggle the sounds
    $('#mute').click(function() {
        if (mute == false) {
            audio.pause();
            $(this).attr('src', 'assets/images/mute.png');
            mute = true;
        } else if (mute == true) {
            audio.play();
            $(this).attr('src', 'assets/images/unmute.png');
            mute = false;
        }
    });

    //object of all the functions that make the game run
    var game = {
        //pick 10 random questions and push them to trivia array
        randomizeQuestions: function() {
            randomizedArray = triviaQuestions.sort(function(a, b) {
                return 0.5 - Math.random()
            });
            for (var i = 0; i < 10; i++) {
                trivia.push(randomizedArray.pop());
            }
        },
        //randomize the order of the choices
        randomizeChoices: function() {
            for (var i = 0; i < trivia.length; i++) {
                var randomChoice = trivia[current].choices.sort(function(a, b) {
                    return 0.5 - Math.random()
                });

            }
        },
        //start the timer and run the data function
        new: function() {
            $('#start').hide();
            game.timerReset();
            timer = setInterval(game.countdown, 1000);
            game.data();
        },
        //countdown the clock and move on as incorrect if time expires
        countdown: function() {
            if (time > 0) {
                time--;
                $('#timer').html(time);
            } else {
                incorrect++;
                clearInterval(timer);
                $('#timer').html("TIME IS UP");
                game.displayAnswer();
            }
        },
        //reset the timer to 20 seconds
        timerReset: function() {
            time = 20;
            $('#timer').html(time);
        },
        //check to see if the clicked answer is correct
        check: function() {
            if ($(this).text() == i.correct) {
                game.correct();
            } else {
                game.incorrect();
                console.log(typeof(this.textContent) + ": " + this.textContent);
                console.log(typeof(i.correct) + ": " + i.correct);
            }
        },
        //what to do for a correct answer
        correct: function() {
            correct++;
            clearInterval(timer);
            $('#timer').html("CORRECT");
            $('#question').empty();
            game.displayAnswer();
        },
        //what to do for an incorrect answer
        incorrect: function() {
            incorrect++;
            clearInterval(timer);
            $('#timer').html("INCORRECT");
            $('#question').html("The correct answer was " + i.correct);
            game.displayAnswer();
        },
        //display the current question
        data: function() {
            i = trivia[current];
            current++;
            $('#question').html(i.question);
            $.each(i.choices, function(index, value) {
                var answer = $('<button>')
                    .addClass('btn choice')
                    .html(i.choices[index])
                    .on('click', game.check);
                $('#answer').append(answer);
            });
        },
        //display the answer after a selection
        displayAnswer: function() {
            var picture = $('<img>')
                .addClass('img-rounded image center-block')
                .attr('src', 'assets/images/' + i.image);
            $('#answer').html(picture);
            display = setTimeout(game.nextQuestion, 5000);
        },
        //move on to the next question or end the game
        nextQuestion: function() {
            if (current !== trivia.length) {
                time = 20;
                $('#answer').empty();
                game.new();
            } else {
                game.endGame();
            }
        },
        //show the stats screen when the game ends
        endGame: function() {
            clearInterval(timer);
            $('#timer').hide();
            $('#question').html('GAME OVER');
            $('#answer').html("Correct answers: " + correct + "<br>Incorrect answers: " + incorrect);
            var reset = $("<button>")
                .addClass('btn gameButton')
                .html('Play Again')
                .attr('id', 'reset');
            $('#reset').html(reset);
        },
        //reset the game
        reset: function() {
            time = 20;
            correct = 0;
            incorrect = 0;
            current = 0;
            timer = undefined;
            choice = undefined;
            display = undefined;
            randomizedArray = undefined;
            i = trivia[current];
            trivia = [];
            $('#timer').show();
            $('#timer').empty();
            $('#question').empty();
            $('#answer').empty();
            $('#reset').empty();
            stopAudio();
            game.randomizeQuestions();
            game.randomizeChoices();
            game.new();
        }
    };

    //audio
    var audio = new Audio();
    //run the audio in a loop
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    //function to start the music when you click start and show the mute button
    function playAudio() {
        $('#mute').show();
        audio.src = "assets/sounds/theme.mp3";
        audio.play();
    }
    //function to stop the audio when the game ends and reset the audio back to the start for the reset
    function stopAudio() {
        $('#mute').hide();
        audio.pause();
        audio.currentTime = 0;
    }

    //array of all the question and answer objects
    var triviaQuestions = [{
        question: "How did Daenerys Targaryen eventually hatch her dragon eggs?",
        choices: ["In a lightning storm", "In a funeral pyre", "In a fireplace", "In a frozen cave"],
        correct: "In a funeral pyre",
        image: 'one.gif',
    }, {
        question: "How many times has Beric Dondarrion been brough back to life?",
        choices: ["Three", "Five", "Six", "Seven"],
        correct: "Six",
        image: 'two.gif',
    }, {
        question: "Besides dragonglass, what is the only other substance capable of defeating White Walkers?",
        choices: ["Weirwood", "Wildfire", "Valyrian Steel", "Snowballs"],
        correct: "Valyrian Steel",
        image: 'three.gif',
    }, {
        question: "What is the only thing that can put out volatile Wildfire?",
        choices: ["Sand", "Water", "Dragon's Blood", "Sunlight"],
        correct: "Sand",
        image: 'four.gif',
    }, {
        question: "Which Stark family direwolf was killed in retaliation for an attack on Prince Joffrey?",
        choices: ["Ghost", "Lady", "Nymeria", "Summer"],
        correct: "Lady",
        image: 'five.gif',
    }, {
        question: "Arya's punishment for stealing from the Many-Face God is:",
        choices: ["Death", "Memory Loss", "Blindness", "Uncontrollable Laughter"],
        correct: "Blindness",
        image: 'six.gif',
    }, {
        question: "'It's nothing' were the last words of this infamous character:",
        choices: ["Renly Baratheon", "Tywin Lannister", "Robb Stark", "King Joffrey"],
        correct: "King Joffrey",
        image: 'seven.gif',
    }, {
        question: "The name of King Tommen's favorite cat is:",
        choices: ["Battle Pus", "Little Lion", "Ser Pounce", "Prince Fuzzy"],
        correct: "Ser Pounce",
        image: 'eight.gif',
    }, {
        question: "What was the name of Ned Stark's greatsword?",
        choices: ["Ice", "Oathkeeper", "Widow's Wail", "Northguard"],
        correct: "Ice",
        image: 'nine.jpg',
    }, {
        question: "Prince Oberyn Martell is nicknamed the 'Red Viper' because of his combat and:",
        choices: ["Pride in drawing first blood", "Knowledge of poisons", "Nighttime attacks", "Ruby-colored armor"],
        correct: "Knowledge of poisons",
        image: 'ten.gif',
    }, {
        question: "Which of the following did Tyrion Lannister NOT say?",
        choices: ["I may be the Imp. But I'm no jackass", "Oh, did I kill him too? I've been a very busy man", "It's not slander if it's true", "It's not easy being drunk all the time. If it were easy, everyone would do it"],
        correct: "I may be the Imp. But I'm no jackass",
        image: 'eleven.gif',
    }, {
        question: "What infamous song plays during the Red Wedding?",
        choices: ["The Rains of Castamere", "It's Always Summer Under the Sea", "Gentle Mother, Font of Mercy", "The bear and the Maiden Fair"],
        correct: "The Rains of Castamere",
        image: 'twelve.gif',
    }, {
        question: "Which of the following is NOT a face of 'the Seven'?",
        choices: ["The Maiden", "The Widow", "The Mother", "The Stranger"],
        correct: "The Widow",
        image: 'thirteen.gif',
    }, {
        question: "What is the official Lannister family motto?",
        choices: ["Hear Me Roar", "A Lannister always pays his debts", "None So Fierce", "Never knowingly undersold"],
        correct: "Hear Me Roar",
        image: 'fourteen.gif',
    }, {
        question: "Who were the Unsullied NOT instructed to kill in Astapor?",
        choices: ["The Council", "The Soldiers", "The Men Holding Whips", "The Masters"],
        correct: "The Council",
        image: "fifteen.gif",
    }, {
        question: "What is NOT part of the Night's Watch vows?",
        choices: ["Win No Glory", "Take No Wife", "Kill No Innocent", "Father No Children"],
        correct: "Kill No Innocent",
        image: "sixteen.gif",
    }, {question: "What animal is on House Baratheon's sigil?",
        choices: ["Boar", "Bear", "Stag", "Lion"],
        correct: "Stag",
        image: 'seventeen.gif',

    }, {
        question: "How many kingdoms are in Westeros?",
        choices: ["Seven", "Five", "Nine", "Three"],
        correct: "Seven",
        image: "eighteen.jpg",
    }, {
        question: "The night is dark and full of ________.",
        choices: ["Blood", "Evil", "Death", "Terrors"],
        correct: "Terrors",
        image: "nineteen.gif",
    }, {
        question: "Where is the Iron Bank?",
        choices: ["Braavos", "Highgarden", "Pyke", "Dorne"],
        correct: "Braavos",
        image: "twenty.jpg",
    }
    ];


    game.randomizeQuestions();
    game.randomizeChoices();



});
