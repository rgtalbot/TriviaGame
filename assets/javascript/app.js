$(document).ready(function() {
    //variables
    var time = 30;
    var correct = 0;
    var incorrect = 0;
    var timer;
    var choice;
    var dispayQuestion;


    $('#timer').hide();
    $('#question').hide();
    $('#answer').hide();


    $('#start').click(function(){
        game.new();
    });


        //2. push start button and question, answer choices, and timer pop up




    //4. highlight answer choices on hover and make them clickable
    //5. compare click to correct answer
    //6. show correct answer and gif on a setTimeout
    //7. after timeout, pop up next question
    //8. make sure to log correct and incorrect guesses for final display.
    //9. show stats at the end and give them an option to start over.

    var trivia = {
        0: {
            question: "What is the answer?",
            choices: ["not this", "not this", "not this", "this"],
            answer: 3,
        },
        1: {
            question: "What is the answer?",
            choices: ["not this", "not this", "not this", "this"],
            answer: 3,
        },
        2: {
            question: "What is the answer?",
            choices: ["not this", "not this", "not this", "this"],
            answer: 3,
        },
        3: {
            question: "What is the answer?",
            choices: ["not this", "not this", "not this", "this"],
            answer: 3,
        },
        4: {
            question: "What is the answer?",
            choices: ["not this", "not this", "not this", "this"],
            answer: 3,
        },
    };


    var game = {
        new: function() {
            $('#timer').show();
            $('#question').show();
            $('#answer').show();
            $('#start').hide();
            timer = setInterval(game.countdown, 500);
            game.data();
        },

        countdown: function() {
            if (time > 0) {
                time--;
                $('#timer').html(time + " seconds");
            } else {
                clearInterval(timer);
                alert('working');
            }
        },

        timerReset: function() {
            $('#timer').html(time + " seconds");
        },

        check: function() {
            if ($(this).attr('data-id') == trivia[choice].answer) {
                correct++;
                console.log("correct", correct);
                // go to answer
                // set timeout and go on to next question
            } else {
                incorrect++;
                console.log("incorrect", incorrect);
                // go to answer
                // set timeout and go on to next question
            }
        },

        data: function() {
            choice = Math.floor(Math.random() * 5);
            console.log(choice);
            displayQuestion = trivia[choice].question;
            $('#question').html(question);
            $.each(trivia[choice].choices, function(index, value) {
                var answer = $('<p>')
                    .addClass('choice')
                    .html(trivia[choice].choices[index])
                    .attr('data-id', index)
                    .on('click', game.check);
                $('#answer').append(answer);
            });
        }
    };

    game.timerReset();

});
