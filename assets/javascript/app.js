$(document).ready(function() {
    //variables
    var time = 30;
    var correct = 0;
    var incorrect = 0;
    var pick = 0;
    var timer;
    var choice;
    var display;

    $('#start').click(function() {
        game.new();
    });

    var trivia = [{
        question: "In <i>The Secret World of Alex Mack</i>, what's the name of Alex' Sister?",
        choices: ["Beth", "Diana", "Annie", "Kelly"],
        answer: 2,
        correct: "Annie",
        image: 'alexMack.gif',
    }, {
        question: "The fictional city where <i>Hey Arnold!</i> is set is called:",
        choices: ["Hillwood", "Hill Valley", "Pleasantville", "Radiator Springs"],
        answer: 0,
        correct: "Hillwood",
        image: 'arnold.gif',
    }, {
        question: "How many seasons did <i>The Wild Thornberrys</i> have?",
        choices: ["1", "3", "4", "5"],
        answer: 3,
        correct: "5",
        image: 'thornberry.png',
    }, {
        question: "What type of animal is Rocko from <i>Rocko's Modern Life</i>?",
        choices: ["Dog", "Wallaby", "Kangaroo", "Bear"],
        answer: 1,
        correct: "Wallaby",
        image: 'rocko.gif',
    }, {
        question: "What year id <i>Clarissa Explains It All</i> start airing?",
        choices: ["1991", "1992", "1993", "1994"],
        answer: 0,
        correct: "1991",
        image: 'clarissa.gif',
    }, {
        question: "Ryan Gosling appeard on this Nick show in 1995:",
        choices: ["<i>All That</i>", "<i>The Adventures of Pete and Pete</i>", "<i>Are You Afraid of the Dark?</i>", "<i>The Secret World of Alex Mack</i>"],
        answer: 2,
        correct: "<i>Are You Afraid of the Dark?</i>",
        image: 'dark.gif',
    }, {
        question: "What was the name of Doug's dog on <i>Doug</i>?",
        choices: ["Doug Jr.", "Skeeter", "Stinky", "Porkchop"],
        answer: 3,
        correct: "Porkchop",
        image: 'doug.gif',
    }, {
        question: "How many teams competed in each game on <i>Legends of the Hidden Temple</i>?",
        choices: ["2", "4", "6", "8"],
        answer: 2,
        correct: "6",
        image: 'temple.gif',
    }, {
        question: "How do Tommy and Angelica know each other on <i>Rugrats</i>?",
        choices: ["They are neighbors", "They are family friends", "They are brother and sister", "They are cousins"],
        answer: 3,
        correct: "They are cousins",
        image: 'rugrats.gif',
    }, {
        question: "The show <i>Kenan & Kel</i> took place in:",
        choices: ["New York City", "Chicago", "Los Angeles", "Miami"],
        answer: 1,
        correct: "Chicago",
        image: 'kenan.gif',
    }, {
        question: "What was the name of the burger place on <i>All That</i>?",
        choices: ["In-N-Out Burger", "Sweet Burger", "Good Burger", "Amazing Burger"],
        answer: 2,
        correct: "Good Burger",
        image: 'allthat.gif',
    },
];

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
            $('#timer').html("CORRECT");
            console.log("correct", correct);
            game.displayAnswer();
        },

        incorrect: function() {
            incorrect++;
            clearInterval(timer);
            $('#timer').html("INCORRECT");
            console.log("incorrect", incorrect);
            game.displayAnswer();
        },

        data: function() {
            choice = pick;
            pick++;
            $('#question').html(trivia[choice].question);
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
            display = setTimeout(game.nextQuestion, 4000);
        },

        nextQuestion: function() {
            if (pick !== trivia.length) {
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
