const mongoose = require('mongoose');
const Tab = mongoose.model('Tab');
const User = mongoose.model('User');

module.exports = app => {
    app.get('/tabs/:id', async (req, res, next) => {
        const tabs = await User.findById(req.params.id).populate("createdTabs")
        res.status(200).json(tabs.createdTabs)
    })
    app.post('/tabs/:userId',(req,res,next) => {
        const newTab = new Tab({
            tabUrl: req.body.url,
            importance: req.body.importance,
            category: req.body.category,
            creator: req.params.userId
        })
        newTab.save().then(savedTab => {
            User.findById(req.params.userId).then(user => {
                user.createdTabs.push(savedTab)
                user.save().then( async (user) => {
                    const tabs = await User.findById(req.params.userId).populate("createdTabs");
                    res.status(200).json(tabs.createdTabs)
                })
            })
        })
    })
    app.delete('/tabs/:tabId', (req,res,next) => {
        Tab.deleteOne({_id: req.params.tabId}).then(result => {
            res.status(200).json({message: "deleted"});
        })
    })
    app.put('/tabs/:tabId', (req, res, next) => {
        Tab.updateOne({_id: req.params.tabId}, req.body).then(updatedTab => {
            res.status(200).json({message: "updated"})
        })
    })
}