$(document).ready(function() {
  ////// GLOBAL VARIABLES //////

  // Initialize varibles to be used in app logic
  var questions;
  var currentQuestion;
  var isAnswerClicked;
  var isTimeUp;
  var countWrong;
  var countCorrect;
  var intervalId;
  var isUserCorrect;
  var userChoiceIndex;

  ////// EVENT LISTENERS //////

  // When user clicks on an answer
  $(document).on("click", ".choice", function() {
    // If an answer hasn't been clicked and time isn't up
    if (!isAnswerClicked && !isTimeUp) {
      // If the answer clicked is correct
      if (parseInt($(this).attr("index")) === currentQuestion.correctAnswer) {
        // Print correct to result
        $(".result").text("Correct!");
        // Add 1 to correct counter
        countCorrect++;
        isUserCorrect = true;
      } else {
        // Otherwise print wrong to result
        $(".result").text("Wrong!");
        // Add 1 to wrong counter
        countWrong++;
        // Save userChoiceIndex
        userChoiceIndex = parseInt($(this).attr("index"));
        isUserCorrect = false;
      }

      // Set isAnswerClicked to true to prevent things from happening if user continues to click answers
      isAnswerClicked = true;

      // Stop question timer
      stopTimer();

      // Call next round function
      endRound();
    }
  });

  // When user clicks on the Reset button
  $(document).on("click", "button", function() {
    // Call reset function
    reset();
  });


  ////// FUNCTIONS //////

  function reset() {
    // Set questions to array of objects holding questions and answers
    questions = [
      {
        question: "What is the highest mountain summit in North America?",
        answers: ["Mt. Whitney", "Denali", "Mt. Rainier", "Mt. St. Elias"],
        correctAnswer: 1
      },

      {
        question: "What is the highest mountain summit in the lower 48 American states?",
        answers: ["Mt. Elbert", "Mt. Lincoln", "Mt. Whitney", "Mt. Rainier"],
        correctAnswer: 2
      },

      {
        question: "What was the first 8,000 meter peak to be climbed?",
        answers: ["Mt. Everest", "Annapurna", "Lhotse", "Cho Oyu"],
        correctAnswer: 1
      },

      {
        question: "Who was the first person to climb all 14 8,000 meter peaks?",
        answers: ["Reinhold Messner", "Pierre Beghin", "Chris Bonnington", "Jerry Kukuczka"],
        correctAnswer: 0
      },

      {
        question: "Who was the first American to climb all 14 8,000 meter peaks?",
        answers: ["Ed House", "Conrad Anker", "David Breashers", "Ed Viesturs"],
        correctAnswer: 3
      },

      {
        question: "Which of the following is NOT one of the 'Seven Summits'?",
        answers: ["Mt. Vinson", "Mt. Elbrus", "K2", "Aconcagua"],
        correctAnswer: 2
      },

      {
        question: "Which of the following countries is represented on the list of the first 10 people to climb all 14 8,000 meter peaks?",
        answers: ["France", "Mexico", "Germany", "America"],
        correctAnswer: 1
      },

      {
        question: "Who was the first woman to reach the summit of Mt. Everest?",
        answers: ["Fanny Bullock Workman", "Gertrude Bell", "Gerlinde Kaltenbrunner", "Junko Tabei"],
        correctAnswer: 3
      },

      {
        question: "What mountain range stretches from northern Canada to southern United States?",
        answers: ["Rocky", "Appalachian", "Sierra Nevada", "Pacific Coast"],
        correctAnswer: 0
      },

      {
        question: "Mt. Everset is part of what section of the Himalayan range?",
        answers: ["Mahalangur", "Kangchenjunga", "Dhaulagiri", "Nanga Parbat"],
        correctAnswer: 0
      },

      {
        question: "The first summit of K2 was accomplished by climbers from which country in 1954?",
        answers: ["America", "Japan", "Switzerland", "Italy"],
        correctAnswer: 3
      },

      {
        question: "What mountain did Reinhold Messner climb in 1986 to complete his goal of climbing all 14 8,000 meter peaks?",
        answers: ["Mt. Everest", "K2", "Lhotse", "Gasherbrum I"],
        correctAnswer: 2
      }
    ];

    // Set game variables to initial conditions
    countWrong = 0;
    countCorrect = 0;

    // Hide summary div until game over
    $(".summary").hide();

    // Show main and result rows
    $(".mainRow").show();
    $(".resultRow").show();

    // Call choose question function
    chooseQuestion();
  }

  function chooseQuestion() {
    // Set round booleans to initial conditions
    isAnswerClicked = false;
    isTimeUp = false;
    userChoiceIndex = null;

    // Empty certain HTML elements
    $(".choices").empty();
    $(".result").empty();

    // Choose random object from questions array and save to currentQuestion
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    // Print question to HTML
    $(".question").text(currentQuestion.question);
    // Print answers to HTML
    for (i = 0; i < currentQuestion.answers.length; i++) {
      $(".choices").append(`<div class="choice" index=${i}>${currentQuestion.answers[i]}</div>`);
    }
    // Start timer
    runTimer();
  }

  function runTimer() {
    var secondsLeft = 20;

    // Remove and Add animateCircle class to circleFill element to reset
    $("#circleFill").removeClass("animateCircle");
    setTimeout(function() {
      $("#circleFill").addClass("animateCircle");
      $(".animateCircle").css("animation-play-state", "initial");
    }, 1);

    $(".timer").text(secondsLeft);

    intervalId = setInterval(function() {
      secondsLeft--;
      $(".timer").text(secondsLeft);
      if (secondsLeft === 0) {
        isTimeUp = true;
        stopTimer();
        countWrong++;
        $(".result").text("Time's up!")
        endRound();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalId);
    // Pause circle animation
    $(".animateCircle").css("animation-play-state", "paused");
  }

  function endRound() {
    // Highlight correct answer
    var correctIndex = currentQuestion.correctAnswer;
    $(`.choice[index=${correctIndex}]`).css("background-color", "#ABDCD6");
    $(`.choice[index=${correctIndex}]`).css("color", "#333333");


    if (!isUserCorrect) {
      $(`.choice[index=${userChoiceIndex}]`).css("background-color", "#EB593C");
      $(`.choice[index=${userChoiceIndex}]`).css("color", "#FFFCEC");
    }

    // Remove currentQuestion from questions array
    questions.splice(questions.indexOf(currentQuestion), 1);

    // Pause for 3 seconds
    var endRoundTimer = setTimeout(function() {
      // If no questions remain
      if (questions.length === 0) {
        // Replace contents of container with summary and reset button
        $(".mainRow").hide();
        $(".resultRow").hide();
        $(".summaryMessage").text(`That's all of the questions! You got ${countCorrect} questions correct and ${countWrong} questions wrong. Click Reset to play again.`)
        $(".summary").show();
      } else {
        chooseQuestion();
      }
    }, 4000);


  }

  ////// CALLS //////
  reset();
});
