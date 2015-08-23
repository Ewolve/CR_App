var app=angular.module("quiz_module", ['ngSanitize']);

app.controller("quizCtrl", function($scope, $http){
	$scope.quest = -1;
	$scope.questions;
	$scope.key ="";
	$scope.currentQuest;
	$scope.youre = "";
	
	$http.get('/questions').success(function (data) {
			$scope.questions = data;
			console.log(data);
		});

	var shuffle = function(o){
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	
	$scope.page = function() {
		if ($scope.quest < 0) {
			return '/start';
		}
		else if ($scope.quest <= 8) {
			return '/quiz';
		}
		else if ($scope.quest > 8){
			return '/end';
		}
		else {
			return '/404';
		}
	};
	
	$scope.next = function(mykey) {
		$scope.quest += 1;
		$scope.key += mykey;
		if ($scope.quest <= 8 && $scope.quest >= 0) {
			console.log($scope.key);
			$scope.currentQuest = {question : $scope.questions.questions[$scope.quest].question, answers : shuffle($scope.questions.questions[$scope.quest].answers)}; 
		}
		else{
			console.log($scope.key);
			$scope.sendKey();
		}
	};
	
	$scope.back = function() {
		
		if ($scope.quest <= 8 && $scope.quest >= 0) {
			$scope.quest -= 1;
			$scope.key = $scope.key.substring(0, $scope.key.length - 1);
			if ($scope.quest >= 0)
			$scope.currentQuest = {question : $scope.questions.questions[$scope.quest].question, answers : shuffle($scope.questions.questions[$scope.quest].answers)}; 
		}
		console.log($scope.key);
	};

	$scope.sendKey = function() {
		var parameter = JSON.stringify({key : $scope.key+""});
		var sending = $http.post('/request', parameter);
		
		sending.success(function(data, status, headers, config) {
			$scope.youre = data +"";
		});
		sending.error(function( data, status, headers, config) {
			$scope.youre = "Ein Fehler ist aufgetreten";
		});
	};
})