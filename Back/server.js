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

app.use(bodyParser.json({limit: '50mb'}))

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
})

/**
 * envoie moi un form-data
 * @param name le nom de l'user
 * @param password le password
 * @return un token pour authentification
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
 * @param token
 */
app.post('/post', (req, res) => {
	try {
		console.log(req.body)
    let userId = jwt.verify(req.body.token ,'undefined').id;
		if(req.body.title && req.body.description && req.body.content && req.body.image && userId) {
			post.newPost(req.body.title, req.body.description, req.body.content, req.body.image, userId, function(out) {
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
 * @param postId
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
 * create, update or remove a vote
 * @param postId
 * @param type {number} (0:reset, 1:good, 2:bad)
 * @param token
 * @return if the type of the save done (if success)
 */
app.post('/post/vote', (req, res) => {
	try {
    let userId = jwt.verify(req.body.token ,'undefined').id;

		if(req.body.postId && userId && req.body.type && (req.body.type == 1 || req.body.type == 2)) {
			post.vote(req.body.postId, userId, req.body.type, function(out) {
				res.status(200).json(out)
			})
		}else if(req.body.postId && userId && req.body.type == 0){
      post.removeVote(req.body.postId, userId, function(out) {
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
 * create a save or delete a save if already exist
 * @param postId
 * @param token
 * @return if a save was created (1) or removed (0)
 */
app.post('/post/save', (req, res) => {
	try {
    	let userId = jwt.verify(req.body.token ,'undefined').id;
		if(req.body.postId && userId) {
			post.save(req.body.postId, userId, function(out) {
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
 * @param token 
 * 					   (default)
 * @param page      (opt) (0) le numéro de la page
 * @param sliceSize (opt) (10) la taille de la liste
 * @param orderType (opt) (0)  0: newlest, 1: oldest, 2: good, 3: bad
 * @param getSave   (opt) (false)
 * @param keywords {array} pour une recherche par mots clés
 * 
 * @return les infos du post + hasSave (boolean) true si l'user lié au token à sauvegardé ce post
 */
app.get('/post/list', (req, res) => {
	try {
    	let userId = jwt.verify(req.body.token ,'undefined').id;
		
		post.getList(userId, req.body.page, req.body.sliceSize, req.body.orderType, req.body.getSave, req.body.keywords, function(out) {
			res.status(200).json(out)
		})
		
	} catch (err) {
		console.log(err)
		res.status(200).json({
			success: false,
			info: "invalid input"
		})
	}
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


