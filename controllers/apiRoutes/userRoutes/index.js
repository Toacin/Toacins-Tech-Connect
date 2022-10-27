const router = require("express").Router();
const {User, Post, Comment} = require("../../../models")

// route handlers for "/api/user"
router.get('/', async (req,res)=> {
    let userData = await User.findAll({
        include: [{model: Post},{model: Comment}]
    });
    let users = userData.map((user) => user.get({plain: true}));
    res.status(200).json(users);
})

router.get('/logout', async (req,res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.redirect("/");
        })
    } else {
        res.status(400).end();
    }
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
        res.status(201).json(postUser);
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

router.post('/login', async (req,res) => {
    let userData = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (!userData) return res.status(404).json("Invalid Login Credentials");
    
    let validity = userData.checkPassword(req.body.password);
    if (!validity) return res.status(404).json("Invalid Login Credentials!");
    
    let user = userData.get({plain: true});
    req.session.save(() => {
        req.session.id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

        res.status(202).json(user);
    })
})


module.exports = router;