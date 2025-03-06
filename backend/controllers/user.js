import { User } from "../models/user.js";
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.js";

//Login Route for authentication and logining the user
const login = async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `Username and Password is essential!!` });
  }

  try {
    const user = await User.findOne({ username });
    if (!User) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: " User Not Found !!" });
    }

    if (bcrypt.compare(password, user.password)) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      res.status(httpStatus.OK).json({ token: token });
    }
  } catch (err) {
    res.status(500).json({ message: `${err}` });
  }
};

//Register the New User into the databases
const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const exisitingUser = await User.findOne({ username });
    if (exisitingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const handlePassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      username: username,
      password: handlePassword,
    });

    await newUser.save();
    res
      .status(httpStatus.CREATED)
      .json({ message: "User Created Successfully!!" });
  } catch (err) {
    res.json({ message: `SomeThing Went Wrong ${err}.` });
  }
};

//Function for to getUserHistory
const getUserHistory = async (req, res) => {
  const { token } = req.query;
  try {
    const user = await User.findOne({ token: token });
    const Meeting = await Meeting.find({ user_id: username });

    res.json(meetings);
  } catch (er) {
    res.json({ messsage: er });
  }
};

//Fundtion for the addToHistory
const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;
  try {
    const user = await User.findByOne({ token: token });
    const newMeeting = await Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();
    res.json(httpStatus.CREATED).json({ message: "Added Code to History" });
  } catch (er) {
    res.json({ message: `Something went wrong ${er}` });
  }
};
export { login, register, getUserHistory, addToHistory };
