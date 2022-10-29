const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");

// route handlers for "/" endpoints
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;