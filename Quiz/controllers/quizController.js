// Quiz Controller
app.controller("quizController", function ($scope, $http, $location) {
  $scope.username = localStorage.getItem("name");
  $scope.category = localStorage.getItem("category");
  $scope.difficulty = localStorage.getItem("difficulty");
  $scope.numberOfQuestions = localStorage.getItem("numberOfQuestions") || 10;

  if (!$scope.username) {
    $location.path("/");
  }

  $scope.questions = [];
  $scope.currentIndex = 0;
  $scope.score = 0;
  $scope.userAnswer = null;
  $scope.quizCompleted = false;

  // Fetch questions from the API
  var url =
    "https://opentdb.com/api.php?amount=" +
    $scope.numberOfQuestions +
    "&category=" +
    $scope.category +
    "&difficulty=" +
    $scope.difficulty +
    "&type=multiple";

  $http.get(url).then(
    function (response) {
      if (response.data.results.length === 0) {
        $scope.errorMessage =
          "No questions available for the selected category and difficulty. Please try again.";
      } else {
        $scope.questions = response.data.results;
        // Decode HTML entities in questions and answers
        $scope.questions.forEach(function (question) {
          question.question = decodeHtml(question.question);
          question.correct_answer = decodeHtml(question.correct_answer);
          question.incorrect_answers =
            question.incorrect_answers.map(decodeHtml);
          question.allAnswers = question.incorrect_answers.concat(
            question.correct_answer
          );
          question.allAnswers = shuffleArray(question.allAnswers);
          // Also decode the allAnswers array
          question.allAnswers = question.allAnswers.map(decodeHtml);
        });
        $scope.currentQuestion = $scope.questions[$scope.currentIndex];
      }
    },
    function (error) {
      console.log("Error fetching questions", error);
    }
  );

  $scope.selectAnswer = function (answer) {
    $scope.userAnswer = answer;
  };

  $scope.submitAnswer = function () {
    if (!$scope.userAnswer) {
      alert("Please select an answer before proceeding.");
      return;
    }

    var correctAnswer = $scope.currentQuestion.correct_answer;
    if ($scope.userAnswer === correctAnswer) {
      $scope.score++;
    }
    $scope.userAnswer = null;
    $scope.currentIndex++;
    if ($scope.currentIndex < $scope.questions.length) {
      $scope.currentQuestion = $scope.questions[$scope.currentIndex];
    } else {
      $scope.quizCompleted = true;
    }
  };

  $scope.goToMenu = function () {
    $location.path("/menu");
  };

  $scope.logout = function () {
    localStorage.removeItem("name");
    localStorage.removeItem("category");
    localStorage.removeItem("difficulty");
    localStorage.removeItem("numberOfQuestions");
    $location.path("/");
  };

  function shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
});
