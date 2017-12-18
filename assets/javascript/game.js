$(document).ready(function() {

  // Initialize array of question objects
  var questions = [

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

  // Global Variables //
  var currentQuestion;
  var isAnswerClicked = false;
  var countCorrect = 0;
  var countWrong = 0;

  // Functions //
  function chooseQuestion() {
    // Empty choices HTML
    $("#choices").empty();
    // Set isAnswerClicked to false
    isAnswerClicked = false;
    // Choose random question from questions array and save to currentQuestion
    currentQuestion = questions[Math.floor(Math.random() * questions.length)];
    // Print question to HTML
    $("#question").text(currentQuestion.question);
    // For each answer in currentQuestion's answer array
    $.each(currentQuestion.answers, function(index) {
      // Append a <div> to choices area with pertinent information
      $("#choices").append(`<div class="choice" index="${index}">${currentQuestion.answers[index]}</div>`);
    });
  }

  ////// EVENT HANDLERS //////

  // When user clicks an answer
  $(document).on("click", ".choice", function() {
    // Only execute if an answer has not already been clicked
    if (!isAnswerClicked) {
      // If index of clicked answer matches correctAnswer
      if (parseInt($(this).attr("index")) === currentQuestion.correctAnswer) {
        countCorrect++;
        $("#countCorrect").text(countCorrect);
      } else {
        countWrong++;
        $("#countWrong").text(countWrong);
      }

      // Set isAnswerClicked to true
      isAnswerClicked = true;

      // Remove question from array
      questions.splice(questions.indexOf(currentQuestion), 1);

      // Call chooseQuestion
      chooseQuestion();
    }
  });

  // Calls //
  chooseQuestion();
});
