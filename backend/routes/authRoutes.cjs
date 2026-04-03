const express=require(`express`);
const { signup,login,logout,updateProfile,checkAuth} = require("../controllers/authController.js");
const {protectRoute}=require(`../middleware/authMiddleware.js`);
const { arcjetProtection}=require(`../middleware/arcjetMiddleware.js`);
const router = express.Router();


router.use(arcjetProtection);

 //instead of writing it in every middleware like...we wrote it as router.use()

router.get("/check", protectRoute, checkAuth);

router.post("/signup",signup);
router.post("/login",  login);
router.post("/logout", logout);


router.put("/update-profile", protectRoute,updateProfile);
module.exports = router;