const database = require('./../method/database')

function newPost(title, description, content, userId, callback){


	database.connect.query('INSERT INTO post (userId, title, description, content) VALUES (?,?,?,?)', [userId, title, description, content], function (err, result) {
		console.log(err)
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

function getPost(postId, userId, callback){
	database.connect.query(`SELECT post.*, user.username, hasSave.hasSave, IFNULL(votePost.type,0) AS voteType, nbrUp, nbrDown, (nbrUp - nbrDown) AS ratio  
	FROM post JOIN user ON user.userId = post.userId 
	LEFT JOIN (SELECT post.postId, COUNT(savePost.userId) AS hasSave
	FROM user
	CROSS JOIN post
	LEFT JOIN savePost ON savePost.userId = user.userId AND savePost.postId = post.postId
	WHERE user.userId = ${userId} 
	GROUP BY post.postId) AS hasSave ON hasSave.postId = post.postId
	JOIN upView ON upView.postId = post.postId 
    JOIN downView ON downView.postId = post.postId
	LEFT JOIN votePost ON votePost.postId = post.postId AND votePost.userId = ${userId}
	WHERE post.postId = ?`, [postId], function (err, result) {
		
		//console.log(err, result)
		if (result.length) {
			callback(Object.assign({
				success: true
			}, result[0]))
		}else if(result){
			callback({
				success: false,
				info: "Post not found"
			})
		} else {
			callback({
				success: false,
				info: "Error when searching post"
			})
		}
	})
}

function getList(userId = 0, page = 0, sliceSize = 10, orderType = 0, getSave = false, keywords, callback){
	let order
	switch(orderType){
		case 3:
			order = 'ORDER BY nbrDown DESC'; break;
		case 2:
			order = 'ORDER BY nbrUp DESC'; break;
		case 1:
			order = 'ORDER BY creationDate ASC'; break
		default:
			order = 'ORDER BY creationDate DESC'
	}
	let research = '';
	if(keywords && keywords[0]){
		for (let i = 0; i < keywords.length; i++) {
			research += `post.title LIKE '%${keywords[i]}%' OR post.description LIKE '%${keywords[i]}%' OR user.username LIKE '%${keywords[i]}%'`;
			if(i < keywords.length - 1) research += ' OR '
		}
	}

	database.connect.query(
	`SELECT DISTINCT post.*, hasSave.hasSave, user.username, nbrUp, nbrDown, (nbrUp - nbrDown) AS ratio 
	FROM post JOIN user ON user.userId = post.userId
	LEFT JOIN (SELECT post.postId, COUNT(savePost.userId) AS hasSave
	FROM user
	CROSS JOIN post
	LEFT JOIN savePost ON savePost.userId = user.userId AND savePost.postId = post.postId
	WHERE user.userId = ${userId} 
	GROUP BY post.postId) AS hasSave ON hasSave.postId = post.postId
	JOIN upView ON upView.postId = post.postId 
    JOIN downView ON downView.postId = post.postId
	${getSave? 'WHERE hasSave.hasSave = 1':''}
	${!getSave && research? 'WHERE':'' /* ajouter le where si il n'a pas été ajouté avec la save */}
	${research}
	${order} LIMIT ${page*sliceSize}, ${sliceSize}`, 
	function (err, result) {
		callback({
			success: true,
			data: result
		})
		
	})
}

function vote(postId, userId, type, callback){
	database.connect.query('INSERT INTO `votePost`(`postId`, `userId`, `type`) VALUES (?,?,?)', [postId, userId, type], function (err, result) {
		
		// console.log(err, result)
		if (result) {
			callback({
				success: true,
				type
			})
			console.log(`vote ${postId} - ${userId} created`)
		} else if(err.errno && err.errno == 1062){ // already exist
			database.connect.query('UPDATE `votePost` SET `type`= ? WHERE postId = ? AND userId = ?', [type, postId, userId], function (err, result) {
				// console.log(result, err)
				if(result && result.changedRows == 0){
					callback({
						success: false,
						info: "the vote already exists"
					})
					console.log(`vote ${postId} - ${userId} (${type}) already exists`)
				}else if (result) {
					callback({
						success: true,
						type
					})
					console.log(`vote ${postId} - ${userId} updated`)
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
		// console.log(result)
		
		if (result) {
			callback({
				success: true,
				type: 0
			})
			console.log(`vote ${postId} - ${userId} deleted`)
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
	getList,
	vote,
	removeVote,
	save	
}