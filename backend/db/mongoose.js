'use strict';

const mongoose = require('mongoose');

// "mongodb+srv://dbUser:passwordpassword@cluster0-woqpi.mongodb.net/test?retryWrites=true" || 'mongodb://localhost:27017/StudentAPI'


mongoose.connect("mongodb+srv://dbUser:passwordpassword@cluster0-woqpi.mongodb.net/test?retryWrites=true", { useNewUrlParser: true, useCreateIndex: true });


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://dbUser:passwordpassword@cluster0-woqpi.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
// 	const collection = client.db("test").collection("devices");
// 	// perform actions on the collection object
// 	// client.close();
// 	console.log(err)
// });

module.exports = {
	mongoose
}
