import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { createToken, verifyToken } from "../utils/token.js";

// CREATE USER
export const createUser = async (req, res, next) => {
  const { Name, Email, Password, Role } = req.body;
  const salt = await bcryptjs.genSalt();
  const hashedPassword = await bcryptjs.hash(Password, salt);
  try {
    const newUser = await User.create({
      Name,
      Email,
      Password: hashedPassword,
      Role,
      Picture: Picture,
    });
    return res
      .status(200)
      .json({ message: "user created successfully", user: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "user couldn't be created" });
  }
};

//LOGIN
export const login = async (req, res, next) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ where: { Email: Email } });
  if (!user) {
    return res.status(401).json({
      error: "404",
      message: "user not found",
    });
  } else {
    try {
      if (await bcryptjs.compare(Password, user.Password)) {
        const token = createToken(user);
        const decoded = verifyToken(token);
        res
          .cookie("access_token", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None",
          })
          .status(200)
          .json({ message: "login successfull", user: decoded });
      } else {
        res.status(401).json({
          message: "wrong password",
        });
      }
    } catch {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  }
};

//LOGOUT
export const userlogout = (req, res) => {
  console.log("cookie cleared");
  return res
    .clearCookie("access_token")
    .status(200)
    .send("successfully logged out");
};

// Delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.destroy({ where: { id } });
    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: " could not delete user" });
  }
};
