const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');

const normalisePort = val => {
	let port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0){
		return port
	}
	return false;
};


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//==============================================================// CORS setup
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, Accept, Content-Type, Authorization, X-Requested-With");
    res.setHeader('Access-Control-Allow-Methods', "POST,GET,OPTIONS,DELETE,PUT");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
})
//==============================================================// middleware
const authMiddleware = require('./middleware/auth');
app.use(authMiddleware);
//==============================================================// mongoose models
require('./models/Tabs');
require('./models/User');

require('./routes/authRoutes')(app);
require('./routes/tabRoutes')(app);



mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.MONGODB_ATLAS_PW}@cluster0-b3gd5.mongodb.net/
${process.env.MONGODB_ATLAS_DB}?retryWrites=true`, { useNewUrlParser: true }).then(() => {
    console.log('connection to Atlas was successful...')
}).catch(err => {
    console.log(err);
});


const port = normalisePort(process.env.PORT || "5000");
app.set('port', port);
const server = http.createServer(app);


server.listen(port);