const express = require("express");
const { authenticateToken } = require("../middlewares/authetication");
const router = express.Router();
// const { validateDriverCreate } = require("../middleware/validators/driverValidator");
// const { getDrivers, getDriversByCluster, createDriver } = require("../controllers/driverController");

router.use(authenticateToken);

router.get('/posts', (req, res) => {
//   res.json(posts.filter(post => post.username === req.user.name))
  res.json('eeeeeeeeeeeeelaaa')
});

module.exports = router;