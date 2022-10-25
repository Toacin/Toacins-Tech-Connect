const router = require("express").Router();
const {Comment} = require("../../../models")

// routes "/api/comment"
router.post('/', async (req,res) => {
    try {
        let postComment = await Comment.create(req.body);
        res.status(200).json(postComment);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;