const router = require("express").Router();
const {User, Post, Comment} = require("../../models");

router.get("/", async (req,res) => {
    let postData = await Post.findAll({
        include: [{
            model: Comment,
            include : [{model: User}]
        }, {model: User}]
    });
    let posts = postData.map((post) => post.get({plain: true}));
    res.render("homepage", {posts, loggedIn: req.session.loggedIn, username: req.session.username});
})

router.get("/login", async (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render("login", {layout: "login"});
})

module.exports = router;