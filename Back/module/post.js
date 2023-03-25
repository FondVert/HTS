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

function vote(postId, userID, type, callback){
	database.connect.query('INSERT INTO `votePost`(`postId`, `userId`, `isUpVote`) VALUES (?,?,?)', ...arguments, function (err, result) {
		console.log(result)
		
		if (result) {
			callback(Object.assign({
				success: true
			}, result[0]))
		} else {
			callback({
				success: false,
				info: "error"
			})
		}
	})
}

function removeVote(postId, userId, callback){
    database.connect.query('deleteINSERT INTO `votePost`(`postId`, `userId`, `isUpVote`) VALUES (?,?,?)', ...arguments, function (err, result) {
        console.log(result)
        
        if (result) {
            callback(Object.assign({
                success: true
            }, result[0]))
        } else {
            callback({
                success: false,
                info: "error"
            })
        }
	})
}


module.exports = {
	newPost,
	getPost,
	vote,
	removeVote		
}