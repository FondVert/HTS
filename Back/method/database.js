const mysql = require('mysql')

var connect = mysql.createConnection({
	host: "10.20.30.40",
	port: 3306,
	user: "HTS",
	password: "Passworddd01.",
	database : "HTS"
})

connect.connect(function(err) {
	if (!err) {
		console.log('Connected to the database')
	} else {
		console.log('Not Connected to the database')
		console.error(err.message)
	}
})

module.exports = {
	connect
}