const router = require("express").Router();
const {Comment} = require("../../../models")

// routes "/api/comment"
router.post('/', async (req,res) => {
    try {
        let postComment = req.body;
        postComment.user_id = req.session.user_id;
        let postedComment = await Comment.create(postComment);
        res.status(200).json(postedComment);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;