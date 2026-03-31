const express=require(`express`);
const {protectRoute}=require(`../middleware/authMiddleware.js`);
const { arcjetProtection}=require(`../middleware/arcjetMiddleware.js`);
const {getAllContacts,getAllChats ,getMessagesByUserId,sendMessage}=require(`../controllers/messageController.js`);


const router=express.Router();

router.use( arcjetProtection ,protectRoute);

router.get("/contacts",getAllContacts);
router.get("/chats",getAllChats);
//here order is imprtant since id is dynamic...if we keep that route above this then it may show error
router.get("/:id",getMessagesByUserId);

router.post("/send/:id",sendMessage);

module.exports = router;