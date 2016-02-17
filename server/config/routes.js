var questions = require('./../controllers/questions.js');

module.exports = function(app){

	app.get('/questions',function(req,res){
		questions.index(req,res)
	})

	app.post('/createQuestion', function(req,res){
		questions.create_question(req,res);
	})

	app.post('/createAnswer', function(req,res){
		console.log(req.body.name);
		questions.create_answer(req,res);
	})

	app.post('/showQuestion', function(req,res){
		questions.show_question(req,res);
	})

	app.post('/answerQuestion', function(req,res){
		questions.answer_question(req,res);
	})

	app.post('/addLike',function(req,res){
		questions.add_like(req,res);
	})
} 