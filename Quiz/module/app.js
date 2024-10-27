// app.js
let app = angular.module("quizApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./views/login.html",
      controller: "loginController",
    })
    .when("/menu", {
      templateUrl: "./views/menu.html",
      controller: "menuController",
    })
    .when("/quiz", {
      templateUrl: "./views/quiz.html",
      controller: "quizController",
    })
    .otherwise({
      redirectTo: "/",
    });
});

// Custom capitalize filter
app.filter("capitalize", function () {
  return function (input) {
    if (input != null) {
      input = input.toLowerCase();
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
    return "";
  };
});
