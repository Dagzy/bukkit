const BucketList = require('../models/bucketlist.js');
exports.addBucketList = function(req, res, next){
	//For Postman use
	//var title = req.body.title
	let title = req.body.props.title;
	let topic = req.body.props.topic;
	let url = req.body.props.url;
	let content = req.body.props.content;
	let specificUser = req.user._id;

	let bucketList = new BucketList({
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
exports.fetchBucketLists = function(req, res){
	let specificUser = req.user._id;
	BucketList.find({specificUser: specificUser})
	.then(
		function fetchSuccess(data){
			res.json(data);
		},
		function fetchError(err){
			res.send(500, err.message);
		}
	);
}
exports.fetchBucketList = function(req, res){
	let specificBucketList = req.params.id;
	BucketList.findOne({_id: specificBucketList})
	.then(
		function fetchSuccess(data){
			res.json(data);
		},
		function fetchError(err){
			res.send(500, err.message);
		}
	);
}
exports.deleteBucketList = function(req, res){
	let specificBucketList = req.params.id;
	BucketList.remove({_id: specificBucketList})
	.then(
		function deleteSuccess(data){
			res.json(data);
		},
		function deleteError(err){
			res.send(500, err.message);
		}
	);
}