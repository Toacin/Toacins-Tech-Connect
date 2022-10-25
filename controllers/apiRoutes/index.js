const router = require("express").Router();
const {User, Post, Comment} = require("../../models");
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoutes")

// for "/api" endpoints
router.use("/users", userRoutes)
router.use("/blogpost", blogPostRoutes)

module.exports = router;