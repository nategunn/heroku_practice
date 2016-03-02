var qa_app = angular.module('qa_app',['ngRoute']);

qa_app.config(function($routeProvider,$locationProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'partials/login.html'
	})
	.when('/dash',{
		templateUrl: 'partials/dashboard.html'
	})
	.when('/new_question',{
		templateUrl: 'partials/new_question.html'
	})
	.when('/answer',{
		templateUrl: 'partials/answer.html'
	})
	.when('/question',{
		templateUrl: 'partials/question.html'
	})
	.otherwise({
		redirectTo:'/'
	});
});

///////////////////////////QUESTION FACTORY
qa_app.factory('QuestionFactory',function($http){
	var currentUser = '';
	var factory = {};

	factory.currUser = function(callback){
		callback(currentUser);
	};

	factory.welcomeUser = function(info){
		currentUser=info.name;
	};

	factory.index=function(callback){
		$http.get('/questions').success(function(data){
			callback(data);
		});
	};

	factory.logOff = function(info){
		currentUser=info;
	};

	factory.createQuestion=function(info,callback){
		$http.post('/createQuestion',info).success(function(data){
			callback(data);
		});
	};

	factory.createAnswer=function(info,callback){
		console.log(info.name);
		$http.post('/createAnswer',info).success(function(data){
			callback(data);
		});
	};

	factory.showQuestion=function(info,callback){
		console.log(info);
		$http.post('/showQuestion',info).success(function(data){
			callback(data);
		});
	};

	factory.answerQuestion=function(info,callback){
		console.log(info);
		$http.post('/answerQuestion',info).success(function(data){
			callback(data);
		});
	};

	factory.addLike=function(info,callback){
		$http.post('/addLike',info).success(function(data){
			callback(data);
		});
	};

	return factory;
});



/////////////////////////QUESTION CONTROLLER

 qa_app.controller('QuestionController',function($scope,$location,$routeParams,QuestionFactory){

 	$scope.messages=$routeParams.messages;
 	$scope.question=$routeParams.question;

 	QuestionFactory.currUser(function(data){
		$scope.currentUser = data;
	});

	QuestionFactory.index(function(data){
		$scope.questions=data;
	});

 	if($scope.currentUser ==='')//this if/else statement prevents index from prompting for a new currentUser if the currentUser is already set
	{
		$location.path('/');
		// QuestionFactory.indexUser(function(data){
		// 	$scope.questions=data;
		// });

		// QuestionFactory.currUser(function(data){
		// 	$scope.currentUser = data;
		// });
	}
	// else
	// {

	// 	QuestionFactory.index(function(data){
	// 		console.log('else');
	// 		$scope.questions=data;
	// 	});
	// }

	$scope.welcomeUser=function(){
		QuestionFactory.welcomeUser($scope.newUser);
		$location.path('/dash');
	}


	$scope.logOff=function(){
		// $scope.currentUser = '';

		// QuestionFactory.indexUser(function(data){
		// 	$scope.games=data;
		// });

		QuestionFactory.currUser(function(data){
			$scope.currentUser = data;
		});
	};

	$scope.createQuestion=function(){
		console.log('really');
		$scope.newQuestion.author=$scope.currentUser;
		QuestionFactory.createQuestion($scope.newQuestion,function(data){
			if(data.error)
			{
				$scope.errors=data;
			}
			else
			{
				$scope.messages=data;
				$location.path('/dash').search({messages:data});

				QuestionFactory.index(function(data){
					$scope.questions = data;
				});

			}
		});
};

	$scope.createAnswer=function(info,newAnswer){
		newAnswer.author=$scope.currentUser;
		newAnswer.question=info;
		console.log($scope.newAnswer.question);
		QuestionFactory.createAnswer(newAnswer,function(data){
			if(data.error)
			{
				$scope.errors=data;
			}
			else
			{
				$scope.question=data;
				$location.path('/question').search({question:data});

				QuestionFactory.index(function(data){
					$scope.questions = data;
				});

			}
		});
	};

	$scope.showQuestion=function(info){
		QuestionFactory.showQuestion({_id:info},function(data){
			$scope.question=data;
			$location.path('/question').search({question:data});
			QuestionFactory.index(function(data){
				$scope.questions=data;
			});
		});
	};
	
	$scope.answerQuestion=function(info){
		QuestionFactory.answerQuestion({_id:info},function(data){
			$scope.question=data;
			$location.path('/answer').search({question:data});
			QuestionFactory.index(function(data){
				$scope.questions=data;
			});
		});
	};

	$scope.addLike=function(answerId,questionId){

		QuestionFactory.addLike({answer_id:answerId,question_id:questionId},function(data){
			$scope.question=data;
			// $location.path('/question').search({question:data});
		});
	};




});