const router = require("express").Router();
const {User, Post, Comment} = require("../../models");
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoutes")
const commentRoutes = require("./commentRoutes");

// router handlers for "/api" endpoints
router.use("/user", userRoutes);
router.use("/blogpost", blogPostRoutes);
router.use("/comment", commentRoutes);

module.exports = router;