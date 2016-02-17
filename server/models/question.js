var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
	author: String,
	answer_count: Number,
	question: String,
	description: String,
	date: { type: Date, default: Date.now },
	answers: [{type:Schema.Types.ObjectId, ref: 'Answer'}]
})

mongoose.model('Question',QuestionSchema);