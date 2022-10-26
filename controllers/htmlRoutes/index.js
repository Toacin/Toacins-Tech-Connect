const router = require("express").Router();
const {User, Post, Comment} = require("../../models");

router.get("/", async (req,res) => {
    let postData = await Post.findAll({
        include: [{model: Comment}, {model: User}]
    });
    let posts = postData.map((post) => post.get({plain: true}));
    res.render("homepage", {posts});
})

module.exports = router;