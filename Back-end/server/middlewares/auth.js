import { verifyToken } from "../utils/token.js";

export const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.json({ message: "No token!" });
    }
    const decoded = verifyToken(token);
    req.id = decoded.data.id;
    req.role = decoded.data.Role;
  } catch (error) {
    console.log(error);
  }
  next();
};

export const checkRole = (role) => {
  return (req, res, next) => {
    try {
      if (role.includes(req.role)) {
        console.log("user authorized");
        next();
      } else {
        res.status(500).send("Not allowed");
      }
    } catch {
      return res.status(404).json({
        error: 404,
        message: "Not authorized",
      });
    }
  };
};
