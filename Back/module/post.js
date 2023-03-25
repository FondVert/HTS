const database = require('./../method/database')

function newPost(title, description, content, userId, callback){ // TODO: image


	database.connect.query('INSERT INTO `post`(`userId`, `title`, `description`, `content`) VALUES (?,?,?,?)', [userId, title, description, content], function (err, result) {
        console.log(result)
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

function login(username, password, callback){
	database.connect.query('SELECT userId, password FROM user WHERE name = ?', [username], function (err, result) {
  console.log(result)
	bcrypt.compare(password, result[0].password, function(err, result) {
		if (result) {
			let token = jwt.sign(
				{id: result[0].userId},
				'undefined',
				{expiresIn : '365d'}
			)
			callback({
				success: true,
				token: token
			})
		} else {
			callback({
				success: false,
				info: "bad password"
			})
		}
		})
	})
}

			// con.query(sql, (err, result)=>{
			// 		if(err) throw err
			// 		console.log(result) // debug
			// 		return {
			// 				
			// 		};
			// })


module.exports = {
    newPost
		
}