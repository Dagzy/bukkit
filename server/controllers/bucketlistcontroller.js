const BucketList = require('../models/bucketlist.js');
exports.addBucketList = function(req, res, next){
	//For Postman use
	//var title = req.body.title
	const title = req.body.props.title;
	const topic = req.body.props.topic;
	const url = req.body.props.url;
	const content = req.body.props.content;
	const specificUser = req.user;

	const bucketList = new BucketList({
		title: title,
		topic: topic,
		url: url,
		content: content,
		specificUser: specificUser
	});
	bucketList.save(function(err){
		console.log("saving new list");
		if(err){
			return next(err); 
		}
		res.json(bucketList);
	});
}