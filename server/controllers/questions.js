var mongoose = require('mongoose'); 
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer')

module.exports = function(){
	return{
		index:function(req,res){
			Question.find({},function(err,results){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.json(results);
				}
			})
		},

		create_question:function(req,res){
			if(req.body.question.length<10)
			{
				res.json({error:'The question must be at least 10 characters long'});
			}
			else
			{
				var new_question = new Question({author:req.body.author,answer_count:0,question:req.body.question,description:req.body.description});
				new_question.save(function(err){
					if(err)
					{
						console.log(err);
					}
					else
					{
						res.json({message:'You successfully created a new question.'})
					}
				})
			}
		},

		create_answer:function(req,res){
			console.log(req.body.question)
			if(req.body.answer.length<5)
			{
				res.json({error:'The answer must be at least 5 characters long'});
			}
			else
			{
				Question.findById({_id:req.body.question},function(err,question){

					var answer = new Answer({author:req.body.author,like_count:0,answer:req.body.answer,support:req.body.support});

					answer._question=question._id;
					question.answers.push(answer);

					question.answer_count += 1;

					answer.save(function(err){
						question.save(function(err){
					if(err){
						console.log(err)
					}
					else
					{
						Question.findById({_id:question._id})
						.populate('answers')
						.exec(function(err,data){
							if(err)
							{
								console.log(err);
							}
							else
							{
								res.json(data);
							}
						})
					}
						})
					})
				})
			}

		},

		show_question:function(req,res){
			Question.findById({_id:req.body._id})
			.populate('answers')
			.exec(function(err,data){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.json(data);
				}
			})
		},

		answer_question:function(req,res){
			Question.findById({_id:req.body._id}, function(err,data){
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.json(data)
				}
			})
		},

		add_like:function(req,res){
			Answer.update({_id:req.body.answer_id},{$inc:{like_count:1}}, function(err,data){
				if(err)
				{
					console.log(err);
				}
				else
				{
					Question.findById({_id:req.body.question_id})
						.populate('answers')
						.exec(function(err,data){
							if(err)
							{
								console.log(err);
							}
							else
							{
								res.json(data);
							}
						})
				}
			})
		}

	}
}();















