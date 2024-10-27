// Menu Controller
app.controller("menuController", function ($scope, $location) {
  $scope.username = localStorage.getItem("name");

  if (!$scope.username) {
    $location.path("/");
  }

  $scope.date = new Date();

  $scope.categories = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Books" },
    { id: 11, name: "Film" },
    { id: 12, name: "Music" },
    { id: 13, name: "Musicals & Theatres" },
    { id: 14, name: "Television" },
    { id: 15, name: "Video Games" },
    { id: 16, name: "Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Computers" },
    { id: 19, name: "Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    // Add more categories as needed
  ];

  $scope.difficulties = ["easy", "medium", "hard"];

  $scope.selectedCategory = null;
  $scope.selectedDifficulty = null;
  $scope.numberOfQuestions = 10;
  $scope.errorMessage = "";

  $scope.submit = function () {
    if (!$scope.selectedCategory || !$scope.selectedDifficulty) {
      $scope.errorMessage = "Please select a category and difficulty";
    } else {
      $scope.errorMessage = "";
      // Store selections in local storage
      localStorage.setItem("category", $scope.selectedCategory);
      localStorage.setItem("difficulty", $scope.selectedDifficulty);
      localStorage.setItem("numberOfQuestions", $scope.numberOfQuestions);
      $location.path("/quiz");
    }
  };
});
