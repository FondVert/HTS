const database = require('./../method/database')

function newPost(title, description, content, userId, callback){ // TODO: image


	database.connect.query('INSERT INTO `post`(`userId`, `title`, `description`, `content`) VALUES (?,?,?,?)', [userId, title, description, content], function (err, result) {
		
		if(result){
			callback({
				success: true,
				insertId: result.insertId
			})
		}else {
			callback({
				success: false,
				info: "sql failure"
			})
		}
 	})
}

function getPost(postId, callback){
	database.connect.query('SELECT `userId`,`title`,`description`,`content`,`creationDate` FROM `post` WHERE postId = ?', [postId], function (err, result) {
	
	if (result) {
		callback(Object.assign({
			success: true
		}, result[0]))
	} else {
		callback({
			success: false,
			info: "post not found"
		})
	}
	})
}

function vote(postId, userId, type, callback){
	database.connect.query('INSERT INTO `votePost`(`postId`, `userId`, `type`) VALUES (?,?,?)', [postId, userId, type], function (err, result) {
		
		if (result) {
			callback({
				success: true,
				type
			})
		} else if(err.errno && err.errno == 1062){ // already exist
			database.connect.query('UPDATE `votePost` SET `type`= ? WHERE postId = ? AND userId = ?', [type, postId, userId], function (err, result) {
				console.log(result, err)
				if(result && result.changedRows == 0){
					callback({
						success: false,
						info: "the vote already exists"
					})
				}else if (result) {
					callback({
						success: true,
						type
					})
				}else {
					callback({
						success: false,
						info: "error when updating the vote"
					})
				}
			})
		}else {
			callback({
				success: false,
				info: "error when creating the vote"
			})
		}
	})
}

function removeVote(postId, userId, callback){
	database.connect.query('DELETE FROM `votePost` WHERE postId = ? AND userId = ?', [postId, userId], function (err, result) {
		console.log(result)
		
		if (result) {
			callback({
				success: true,
				type: 0
			})
		} else {
			callback({
				success: false,
				info: "error when deleting the vote"
			})
		}
	})
}

function save(postId, userId, callback){
	database.connect.query('INSERT INTO `savePost`(`postId`, `userId`) VALUES (?,?)', [postId, userId], function (err, result) {
		
		if (result) {
			callback({
				success: true,
				type: 1,
				typeText: 'newSave'
			})
		} else if(err && err.errno == 1062){ // already exists
			database.connect.query('DELETE FROM `savePost` WHERE postId = ? AND userId = ?', [postId, userId], function (err, result) {
				
				if (result) {
					callback({
						success: true,
						type: 0,
						typeText: 'deletedSave'
					})	
				} else {
					callback({
						success: false,
						info: "error when saving the post"
					})
				}
			})
		} else {
			callback({
				success: false,
				info: "error when saving the post"
			})
		}
	})
}

module.exports = {
	newPost,
	getPost,
	vote,
	removeVote,
	save	
}