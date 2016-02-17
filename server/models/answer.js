var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new mongoose.Schema({
	author: String,
	like_count: Number,
	answer: String,
	support: String,
	date: { type: Date, default: Date.now },
	_question: [{type:Schema.Types.ObjectId, ref: 'Question'}]
})

mongoose.model('Answer',AnswerSchema);