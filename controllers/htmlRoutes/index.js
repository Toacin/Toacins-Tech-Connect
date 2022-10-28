const router = require("express").Router();
const {User, Post, Comment} = require("../../models");

router.get("/", async (req,res) => {
    let postData = await Post.findAll({
        include: [{
            model: Comment,
            include : [{model: User}]
        }, {model: User}],
        order: [['id', 'DESC']]
    });
    let posts = postData.map((post) => post.get({plain: true}));
    (req.session.loggedIn) ? posts.logged_in = true : posts.logged_in = false;
    res.render("homepage", {posts, loggedIn: req.session.loggedIn, username: req.session.username});
})

router.get("/dashboard", async (req,res) => {
    if (!req.session.loggedIn) return res.redirect('/login');

    let postData = await Post.findAll({
        where: {
            id: req.session.user_id
        },
        include: [{
            model: Comment,
            include : [{model: User}]
        }, {model: User}],
        order: [['id', 'DESC']]
    });
    let posts = postData.map((post) => post.get({plain: true}));
    (req.session.loggedIn) ? posts.logged_in = true : posts.logged_in = false;
    res.render("dashboard", {posts, loggedIn: req.session.loggedIn, username: req.session.username});
})

router.get("/login", async (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render("login", {layout: "login"});
})

router.get("/signup", async (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render("signup", {layout: "login"});
})

module.exports = router;