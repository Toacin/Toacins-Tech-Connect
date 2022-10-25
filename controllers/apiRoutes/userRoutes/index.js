const router = require("express").Router();
const {User, Post, Comment} = require("../../../models")

router.get('/', async (req,res)=> {
    let userData = await User.findAll({
        include: [{model: Post},{model: Comment}]
    });
    let users = userData.map((user) => user.get({plain: true}));
    res.status(200).json(users);
})

router.get('/:id', async (req,res)=> {
    let userData = await User.findOne({
        include: [{model: Post},{model: Comment}],
        where: {
            id: req.params.id
        }
    });
    if (!userData) return res.status(404).json("user not found");
    let user = userData.get({plain: true});
    res.status(200).json(user);
})

router.post('/', async (req,res) => {
    try {
        let postUser = await User.create(req.body);
        res.status(200).json(postUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.put('/:id', async (req,res) => {
    try {
        let updateUser = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if (!updateUser[0]) return res.status(404).json("user not found");
        res.status(200).json(updateUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req,res) => {
    try {
        let deletedUser = await User.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletedUser) return res.status(404).json("user not found");
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;