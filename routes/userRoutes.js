const router = require("express").Router();
const auth = require("../middleware/auth");
const { registerHandler, loginHandler, getUserProfileHandler, updateUserProfileHandler } = require('../controllers/userControllers');
router.post("/register", registerHandler);
router.post("/login", loginHandler);

router.get("/profile" , auth, getUserProfileHandler);
router.put("/profile", auth, updateUserProfileHandler);

module.exports = router;
