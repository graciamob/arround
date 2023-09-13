const { Router } = require("express");

const authMiddleware = require("../modules/auth-middleware");
const auth = require("./auth");
const user = require("./user");
const users = require("./users");

const router = Router();
router.use("/auth", auth);
router.use("/user", authMiddleware, user);
router.use("/users", users);

module.exports = router;
