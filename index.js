const express = require('express');
const app = express();
const mongoose = require('mongoose');


//==============================================================// mongoose models
require('./models/Tabs');
require('./models/User');

//==============================================================// middleware
app.use(express.json())
const authMiddleware = require('./middleware/auth');
app.use(authMiddleware);
//==============================================================// CORS setup
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "POST,GET,OPTIONS,DELETE,PUT");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization, X-Requested-With");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
})

require('./routes/authRoutes')(app);
require('./routes/tabRoutes')(app);



mongoose.connect(`mongodb+srv://${process.env.ATLAS_USER}:${process.env.MONGODB_ATLAS_PW}@cluster0-b3gd5.mongodb.net/
${process.env.MONGODB_ATLAS_DB}?retryWrites=true`, { useNewUrlParser: true }).then(() => {
    console.log('connection to Atlas was successful...')
}).catch(err => {
    console.log(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});