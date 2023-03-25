const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = 5000

const test = require('./module/test')
const user = require('./module/user')
const post = require('./module/post')

testUsername = /^([a-zA-Z0-9_-]){2,32}$/
testName = /^([a-zA-Z0-9 - é]){2,32}$/

app.use(bodyParser.json())

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

/**
 * envoie moi un form-data
 * @param name le nom de l'user
 * @param password le password
 * @add un cookie 'token' qui stocke le token
 */
app.post('/login', (req, res) => {
	try {
		if(req.body.username && req.body.password && testUsername.test(req.body.username)) {
			user.login(req.body.username, req.body.password, function(out) {
				res.status(200).json(out)
			})
		} else {
			res.status(200).json({
				success: false
			})
		}
	} catch (err) {
		res.status(200).json({
			success: false,
			info: "invalid input"
		})
	}
})

app.post('/register', (req, res) => {
	try {
		if(req.body.username && req.body.name && req.body.password && testUsername.test(req.body.username) && testName.test(req.body.name)) {
			user.register(req.body.username, req.body.name, req.body.password, function(out) {
				res.status(200).json(out)
			})
		} else {
			res.status(200).json({
				success: false,
			})
		}
	} catch (err) {
		res.status(200).json({
			success: false,
			info: "invalid input"
		})
	}
})

/**
 * @param title (max 15 char)
 * @param description
 * @param content
 * @add le token dans les cookies (nom : token)
 */
app.post('/post', (req, res) => {
	try {
    let userId = jwt.verify(req.cookies.token ,'undefined').id;
    console.log(req.cookies, userId)
		if(req.body.title && req.body.description && req.body.content && userId) {
			post.newPost(req.body.title, req.body.description, req.body.content, userId, function(out) {
				res.status(200).json(out)
			})
		} else {
			res.status(200).json({
				success: false
			})
		}
	} catch (err) {
    console.log(err)
		res.status(200).json({
			success: false,
			info: "invalid input"
		})
	}
})

/**
 * @param popstId
 */
app.get('/post', (req, res) => {
	try {
		if(req.body.postId) {
			post.getPost(req.body.postId, function(out) {
				res.status(200).json(out)
			})
		} else {
			res.status(200).json({
				success: false
			})
		}
	} catch (err) {
		res.status(200).json({
			success: false,
			info: "invalid input"
		})
	}
})

/**
 * @param postId
 * @param type {number} (0:reset, 1:good, 2:bad)
 * @add le token dans un cookie nommé "token"
 */
app.post('/post/vote', (req, res) => {
	try {
    let userId = jwt.verify(req.cookies.token ,'undefined').id;

		if(req.body.postId && userId && req.body.type && req.body.type == 1 && req.body.type == 2) {
			post.vote(req.body.postId, userId, req.body.type, function(out) {
				res.status(200).json(out)
			})
		}else if(req.body.postId && userId && req.body.type && req.body.type == 0){
      post.removeVote(req.body.postId, userId, function(out) {
				res.status(200).json(out)
			})
    } else {
			res.status(200).json({
				success: false
			})
		}
	} catch (err) {
		res.status(200).json({
			success: false,
			info: "invalid input"
		})
	}
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


