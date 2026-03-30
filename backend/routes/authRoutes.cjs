const express=require(`express`);
const { signup,login,logout,updateProfile} = require("../controllers/authController.js");
const {protectRoute}=require(`../middleware/authMiddleware.js`);

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout);


router.put("/update-profile",protectRoute,updateProfile);
module.exports = router;