// Login Controller
app.controller("loginController", function ($scope, $location) {
  $scope.user = {};
  $scope.validationMessage = "";

  $scope.submitLogin = function () {
    var userName = $scope.user.name;
    var email = $scope.user.email;

    if (!email || email.indexOf("@") === -1) {
      $scope.validationMessage = "Please enter a valid email";
    } else if (!userName) {
      $scope.validationMessage = "Please enter your name";
    } else {
      // Store username in local storage
      localStorage.setItem("name", userName);
      $location.path("/menu");
    }
  };
});
