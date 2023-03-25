const express = require('express')
const bodyParser = require('body-parser')
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
});

app.get('/', (req, res) => {
  res.status(200).send(test.hello())
})

app.post('/', (req, res) => {
	console.log(req.body)
	res.status(200).json({
		'success': true,
		'name': req.body.name ? req.body.name : "Téo"
	})
})

/**
 * envoie moi un form-data
 * @param name le nom de l'user
 * @param password le password
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
			user.register(req.body.username, req.body.user, req.body.password, function(out) {
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

app.post('/post', (req, res) => {
	try {
		if(req.body.username && req.body.password && testUsername.test(req.body.username)) {
			res.status(200).json(post.newPost(req.body.title, req.body.description, req.body.content, function(out) {
				res.status(200).json(out)
			})) // title, description, content, userId, callback
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

