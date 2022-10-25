const router = require("express").Router();
const {User, Post, Comment} = require("../../models")

// for "/api" endpoints

router.get('/', async (req,res)=> {
    let userData = await User.findAll({include: [{model: Post},{model: Comment}]});
    let users = userData.map((user) => user.get({plain: true}));
    res.status(200).json(users);
})

module.exports = router;