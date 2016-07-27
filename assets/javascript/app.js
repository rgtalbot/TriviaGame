$(document).ready(function() {
    //variables
    var time = 30;
    var correct = 0;
    var incorrect = 0;
    var count = 0;
    var pick = 0;
    var timer;
    var choice;
    var display;

    $('#start').click(function() {
        game.new();
    });

    //9. show stats at the end and give them an option to start over.

    var trivia = [{
        question: "What is the answer?",
        choices: ["not this0", "not this", "not this", "this"],
        answer: 3,
        correct: "this",
        image: 'test.gif',
    }, {
        question: "What is the answer?",
        choices: ["not this1", "not this", "not this", "this"],
        answer: 3,
        correct: "this",
        image: 'test.gif',
    }, {
        question: "What is the answer?",
        choices: ["not this2", "not this", "not this", "this"],
        answer: 3,
        correct: "this",
        image: 'test.gif',
    }, {
        question: "What is the answer?",
        choices: ["not this3", "not this", "not this", "this"],
        answer: 3,
        correct: "this",
        image: 'test.gif',
    }, {
        question: "What is the answer?",
        choices: ["not this4", "not this", "not this", "this"],
        answer: 3,
        correct: "this",
        image: 'test.gif',
    }, ];
    console.log(trivia.length);



    var game = {
        new: function() {
            $('#start').hide();
            $('#timer').show();
            game.timerReset();
            timer = setInterval(game.countdown, 500);
            game.data();
        },

        countdown: function() {
            if (time > 0) {
                time--;
                $('#timer').html(time + " seconds");
            } else {
                clearInterval(timer);
                game.incorrect();
            }
        },

        timerReset: function() {
            time = 30;
            $('#timer').html(time + " seconds");
        },

        check: function() {
            if ($(this).attr('data-id') == trivia[choice].answer) {
                game.correct();
            } else {
                game.incorrect();
            }
        },

        correct: function() {
            correct++;
            clearInterval(timer);
            $('#timer').hide();
            console.log("correct", correct);
            game.displayAnswer();
        },

        incorrect: function() {
            incorrect++;
            clearInterval(timer);
            $('#timer').hide();
            console.log("incorrect", incorrect);
            game.displayAnswer();
        },

        data: function() {
            choice = pick;
            pick++;
            count++;
            $('#question').html(question);
            $.each(trivia[choice].choices, function(index, value) {
                var answer = $('<p>')
                    .addClass('choice')
                    .html(trivia[choice].choices[index])
                    .attr('data-id', index)
                    .on('click', game.check);
                $('#answer').append(answer);
            });
        },

        displayAnswer: function() {
            $('#question').html("The correct answer was " + trivia[choice].correct);
            var picture = $('<img>')
                .addClass('img-responsive')
                .attr('src', 'assets/images/' + trivia[choice].image);
            $('#answer').html(picture);
            display = setTimeout(game.nextQuestion, 1000);
        },

        nextQuestion: function() {
            if (count !== trivia.length) {
                time = 30;
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
            $('#answer').html("Number of correct answers: " + correct + "<br>Number of incorrect answers: " + incorrect);
            var reset = $("<button>")
                    .addClass('btn btn primary')
                    .html('Play Again?')
                    .attr('id', 'reset');
            $('#reset').html(reset);
        },

        reset: function() {
            time = 30;
            correct = 0;
            incorrect = 0;
            count = 0;
            pick = 0;
            timer = undefined;
            choice = undefined;
            display = undefined;
            $('#timer').empty();
            $('#question').empty();
            $('#answer').empty();
            game.new();
        }
    };
    $('#reset').on('click', game.reset);


});
