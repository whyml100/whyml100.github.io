const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// intializing express
const app = express();

// setting PORT
const PORT = process.env.PORT || 5000;

// Setting up mongodb
const dbURL = 'mongodb://localhost/testdb;'
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log("Successfully connected to MongoDB")
})

// JSON parsing the incoming requests
app.use(express.json())

//logging function for incoming requests
const logger = (req, res, next) => {
	console.log("search string is " + req.url);
	next();
};

// logging to db function
const create_log = async(changes, type) => {
	try {
		const newlog = new logdb({ 
		timestamp: new Date().toLocaleString(),
		type: type,
		activity: "id:" + changes.id + ", item:" + changes.item + ", quantity:" + changes.quantity + ", price:" + changes.price
		})
		console.log(newlog)
		const saved = await newlog.save()
		console.log("Successfully saved log")
		if (saved) {
			console.log("log created ")
		}
	 } 
	catch {
	console.log("error occurred while logging");
	}
}

// setting CORS 
app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});

// logging each incoming request
app.use(logger);

// making mongodb model for data
var entry = mongoose.model('testcoll', {
		id: String,
		item: String,
		quantity: String,
		price: String,
		description: String
		});

// making mongodb model for logs
var logdb = mongoose.model('log', {
		id: String,
		timestamp: String,
		type: String,
		activity: String
		});

// fetching data from mongodb to browse complete inventory
// app.get('/getdbdata/browse', (req, res) => {
// 	console.log(" complete database requested ")
// 	entry.find({}, (err, dbdata) => {
// 		console.log(dbdata)
// 		res.json(dbdata)
// 		})
// })

// fetching data from mongodb
app.post('/getdbdata/', (req, res) => {
	console.log("database requested ")
	console.log(req.body)
	// requesting complete inventory
	if (req.body.request == "everything"){
		entry.find({}, (err, dbdata) => {
		console.log(dbdata)
		res.json(dbdata)
		})
	} 
	// requesting filtered content 
	else {
		entry.find({
			$or :[
			{id: req.body.request},
			{item: req.body.request},
			{quantity: req.body.request},
			{price: req.body.request},
			{description: req.body.request}
			]
		}, (err, dbdata) => {
		console.log(dbdata)
		res.json(dbdata)
		})
	}
	
})

// get single document by id
app.post('/getDetails/', (req, res) => {
	console.log("single item requested ")
	console.log(req.body)
	// requesting single item  
		entry.find({
			id: req.body.itemId
		}, (err, dbdata) => {
		console.log(dbdata)
		res.json(dbdata)
		})	
})

// fetching data from mongodb for log page
app.get('/getlog', (req, res) => {
	console.log(" all logs requested ")
	logdb.find({}, (err, dblog) => {
		console.log(dblog)
		res.json(dblog)
		})
})


// Adds new documnet to mongodb
app.post('/ADDitem/', async(req, res) => {
	try {
		const newdoc = new entry(req.body)
		console.log(newdoc)
		const saved = await newdoc.save()
		console.log("Successfully saved document")
		if (saved) {
			create_log(req.body,"created");
			res.send(req.body)
		}
	 } 
	catch {
	res.sendStatus(500)
	}
})

// Updates documnet in mongodb
app.post('/UPDATEitem/', async(req, res) => {
	try {
    	const updated = await entry.findOneAndUpdate({id: req.body.id}, req.body, {useFindAndModify: false, new:true})
		if (updated){
			create_log(req.body,"updated");
			res.send(req.body)
		}
	 } 
	catch {
	res.sendStatus(500)
	}
})

// Deletes documnet from mongodb
app.post('/DeleteItem/', async(req, res) => {
	try {
		const deleted = await entry.deleteOne({id: req.body.id})
		if (deleted){
			create_log(req.body,"deleted");
			res.send(req.body)
		} 
	 } 
	catch {
	res.sendStatus(500)
	}
})

// serving static build version
app.use(express.static(path.join(__dirname, 'build')));

//listening to port 5000
app.listen(PORT, () => console.log("server online"));