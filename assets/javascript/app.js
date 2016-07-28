$(document).ready(function() {
    //variables
    var time = 20;
    var correct = 0;
    var incorrect = 0;
    var current = 0;
    var timer;
    var display;
    var i;

    //click to start game
    $('#start').click(function() {
        game.new();
        playAudio();
    });

    //array of all the question and answer objects
    var trivia = [{
        question: "How did Daenerys Targaryen eventually hatch her dragon eggs?",
        choices: ["In a lightning storm", "In a funeral pyre", "In a fireplace", "In a frozen cave"],
        answer: 1,
        correct: "In a funeral pyre",
        image: 'one.gif',
    }, {
        question: "How many times has Beric Dondarrion been brough back to life?",
        choices: ["Three", "Five", "Six", "Seven"],
        answer: 2,
        correct: "Six",
        image: 'two.gif',
    }, {
        question: "Besides dragonglass, what is the only other substance capable of defeating White Walkers?",
        choices: ["Weirwood", "Wildfire", "Valyrian Steel", "Snowballs"],
        answer: 2,
        correct: "Valyrian Steel",
        image: 'three.gif',
    }, {
        question: "What is the only thing that can put out volatile Wildfire?",
        choices: ["Sand", "Water", "Dragon's Blood", "Sunlight"],
        answer: 0,
        correct: "Sand",
        image: 'four.gif',
    }, {
        question: "Which Stark family direwolf was killed in retaliation for an attack on Prince Joffrey?",
        choices: ["Ghost", "Lady", "Nymeria", "Summer"],
        answer: 1,
        correct: "Lady",
        image: 'five.gif',
    }, {
        question: "Arya's punishment for stealing from the Many-Face God is:",
        choices: ["Death", "Memory Loss", "Blindness", "Uncontrollable Laughter"],
        answer: 2,
        correct: "Blindness",
        image: 'six.gif',
    }, {
        question: "'It's nothing' were the last words of this infamous character:",
        choices: ["Renly Baratheon", "Tywin Lannister", "Robb Stark", "King Joffrey"],
        answer: 3,
        correct: "King Joffrey",
        image: 'seven.gif',
    }, {
        question: "The name of King Tommen's favorite cat is:",
        choices: ["Battle Pus", "Little Lion", "Ser Pounce", "Prince Fuzzy"],
        answer: 2,
        correct: "Ser Pounce",
        image: 'eight.gif',
    }, {
        question: "What was the name of Ned Stark's greatsword?",
        choices: ["Ice", "Oathkeeper", "Widow's Wail", "Northguard"],
        answer: 0,
        correct: "Ice",
        image: 'nine.jpg',
    }, {
        question: "Prince Oberyn Martell is nicknamed the 'Red Viper' because of his combat and:",
        choices: ["Pride in drawing first blood", "Knowledge of poisons", "Nighttime attacks", "Ruby-colored armor"],
        answer: 1,
        correct: "Knowledge of poisons",
        image: 'ten.gif',
    }, {
        question: "Which of the following did Tyrion Lannister NOT say?",
        choices: ["I may be the Imp. But I'm no jackass", "Oh, did I kill him too? I've been a very busy man", "It's not slander if it's true", "It's not easy being drunk all the time. If it were easy, everyone would do it"],
        answer: 0,
        correct: "I may be the Imp. But I'm no jackass",
        image: 'eleven.gif',
    }, {
        question: "What infamous song plays during the Red Wedding?",
        choices: ["The Rains of Castamere", "It's Always Summer Under the Sea", "Gentle Mother, Font of Mercy", "The bear and the Maiden Fair"],
        answer: 0,
        correct: "The Rains of Castamere",
        image: 'twelve.gif',
    }, {
        question: "Which of the following is NOT a face of 'the Seven'?",
        choices: ["The Maiden", "The Widow", "The Mother", "The Stranger"],
        answer: 1,
        correct: "The Widow",
        image: 'thirteen.gif',
    }, {
        question: "What is the official Lannister family motto?",
        choices: ["Hear Me Roar", "A Lannister always pays his debts", "None So Fierce", "Never knowingly undersold"],
        answer: 0,
        correct: "Hear Me Roar",
        image: 'fourteen.gif',
    }];

    //object of all the functions that make the game run
    var game = {
        new: function() {
            $('#start').hide();
            $('#timer').show();
            game.timerReset();
            timer = setInterval(game.countdown, 1000);
            game.data();
        },

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

        timerReset: function() {
            time = 20;
            $('#timer').html(time);
        },

        check: function() {
            if ($(this).attr('data-id') == i.answer) {
                game.correct();
            } else {
                game.incorrect();
            }
        },

        correct: function() {
            correct++;
            clearInterval(timer);
            $('#timer').html("CORRECT");
            game.displayAnswer();
        },

        incorrect: function() {
            incorrect++;
            clearInterval(timer);
            $('#timer').html("INCORRECT");
            game.displayAnswer();
        },

        data: function() {
            i = trivia[current];
            current++;
            $('#question').html(i.question);
            $.each(i.choices, function(index, value) {
                var answer = $('<button>')
                    .addClass('btn choice')
                    .html(i.choices[index])
                    .attr('data-id', index)
                    .on('click', game.check);
                $('#answer').append(answer);
            });
        },

        displayAnswer: function() {
            $('#question').html("The correct answer was " + i.correct);
            var picture = $('<img>')
                .addClass('img-rounded image center-block')
                .attr('src', 'assets/images/' + i.image);
            $('#answer').html(picture);
            display = setTimeout(game.nextQuestion, 5000);
        },

        nextQuestion: function() {
            if (current !== trivia.length) {
                time = 20;
                $('#answer').empty();
                game.new();
            } else {
                game.endGame();
            }
        },

        endGame: function() {
            clearInterval(timer);
            $('#timer').hide();
            $('#question').html('GAME OVER');
            $('#answer').html("Correct answers: " + correct + "<br>Incorrect answers: " + incorrect);
            var reset = $("<button>")
                .addClass('btn gameButton')
                .html('Play Again')
                .attr('id', 'reset');
            stopAudio();
            $('#reset').html(reset);
        },

        reset: function() {
            time = 20;
            correct = 0;
            incorrect = 0;
            current = 0;
            timer = undefined;
            choice = undefined;
            display = undefined;
            $('#timer').empty();
            $('#question').empty();
            $('#answer').empty();
            $('#reset').empty();
            game.new();
        }
    };
    $('#reset').on('click', function() {
        game.reset();
        playAudio();
    });

    //audio functions
    var audio = new Audio();
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    function playAudio() {
        audio.src = "assets/sounds/theme.mp3";
        audio.play();
    }

    function stopAudio() {
        audio.pause();
        audio.currentTime = 0;
    }
});
