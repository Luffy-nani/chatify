const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    console.log("➡️ BODY:", req.body);

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await User.findOne({ email });
    console.log("Checked existing user");

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    console.log("Salt created");

    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed");

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("✅ SAVED USER:", savedUser);

    res.status(201).json(savedUser);

  } catch (error) {
    console.error("❌ ERROR:", error); // 👈 MUST PRINT
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup };