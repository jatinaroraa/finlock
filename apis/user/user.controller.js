const User = require("./user.model");
const config = require("../../config/development");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  console.log("hit login ", req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: "Invalid login credentials" });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ token: token, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createAccount = async (req, res) => {
  const { name, email, password, cPassword } = req.body;
  try {
    // Check if user already exists
    console.log(req.body, "body");

    let user = await User.findOne({ email });
    if (user) {
      console.log(user, "user ");
      return res.status(400).json({ msg: "User already exists" });
    }
    // Create new user
    user = new User({ name, email, password, cPassword });
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.cPassword = user.password;

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: 20,
    });
    // console.log(token, "token");
    res.json({ token: token, user: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "not found" });
  }
};

module.exports = {
  login,
  createAccount,
};
