const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = app => {
    app.post('/auth/login', async (req,res,next) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) {
                res.status(200).json({message: "Could not log user in."})
            }
            const isMatch = await bcrypt.compare(req.body.password, user.hash);
            if (!isMatch) {
                res.status(200).json({message: "Could not log user in."})
            }
            const token = jwt.sign({userId: user.id, email: user.email}, 'tbd', {
                expiresIn: '1hr'
            })
            res.status(200).json({expiresIn: 60, token: token, username: user.username, userId: user._id })
        } catch(err) {
            console.error(err);
        }
    })
    app.post('/auth/signup', async (req,res,next) => {
        try {
            const user = await User.find({username: req.body.username});
            if (user.length > 0) {
                res.status(200).json({message: "Username is taken."})
            }
            bcrypt.hash(req.body.password, 10).then(hash => {
                    const createdUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        username: req.body.username,
                        phone: req.body.phone,
                        hash: hash
                    });
                    return createdUser.save()
                }).then(user => {
                    const token = jwt.sign({userId: user._id, email: user.email}, 'tbd', {
                    expiresIn: '2hr'})
                    res.status(200).json({expiresIn: 120, token: token, username: user.username, userId: user._id })
                })
            } catch(err) {
            console.log(err)
        }
    })

}