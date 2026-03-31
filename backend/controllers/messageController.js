const Message=require(`../models/MessageSchema`);
const User=require(`../models/UserSchema`);
const cloudinary=require(`../lib/cloudinary`);


const getAllContacts=async(req,res)=>
{
    try {
    const loggedInUserId = req.user._id;

    const users = await User.find({
      _id: { $ne: loggedInUserId }
    })
    .select("-password")
    .limit(20);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

const getAllChats = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // ✅ fixed name

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in getting the chat partners", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMessagesByUserId=async(req,res)=>
{
    try{
        const myId=req.user._id;
        const {id:userToChatId}=req.params;
        
        const messages=await Message.find({
            $or:[
                {
                    senderId:myId, receiverId:userToChatId
                },
                {
                    senderId:userToChatId, receiverId:myId
                }
            ],
        });
        res.status(200).json(messages);
    }
    catch(error)
    {
        console.log("Error in getting the messages",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const sendMessage=async(req,res)=>
{
    try
    {
        const {text,image}=req.body;
        const senderId=req.user._id;
        const {id:receiverId}=req.params;

        if(!text && !image)
            return res.status(400).json({message:"Text or image is requried"});

        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
          }  
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
        } 

        let imageUrl;
        if(image)
        {
            const uploadRes=await cloudinary.uploader.upload(image);
            imageUrl=uploadRes.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    
    }
    catch(error)
    {
        console.log("Error in sending the message",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

module.exports={getAllContacts,getAllChats ,getMessagesByUserId,sendMessage};