const database = require('./../method/database')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

function login(username, password, callback){
	database.connect.query('SELECT userId, password FROM user WHERE username = ?', [username], function (err, result) {
		console.log(result)
		if(result[0]) {
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
		} else {
			callback({
				success: false,
				info: "bad password"
			})
		}
	})
}

function register(username, name, password, callback){
	database.connect.query('SELECT userId FROM user WHERE username = ?', [username], function (err, result) {
		// console.log(result)
		if(!result[0]) {
			bcrypt.hash(password, 10, function(err, hash) {
				database.connect.query('INSERT INTO `user`(`username, `name`, `password`) VALUES (?,?,?)', [username, name, hash], function (err, result) {
					console.log(hash)
				})
			})
		} else {
			callback({
				success: false,
				info: "username early exist"
			})
		}
	})
}

module.exports = {
    login,
		register
}