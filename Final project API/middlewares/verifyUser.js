import jwt from "jsonwebtoken";
import User from "../model/user.model.js"; 

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = {
  id: decoded.id || decoded._id,
  role: decoded.role,
  email: decoded.email,
};
req.userId = decoded.id || decoded._id; // ✅ add this

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", error: err.message });
  }
};

export const verifyAdmin = async (req, res, next) => {
  verifyUser(req, res, async () => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.role !== "admin") {
        return res.status(403).json({ message: "Access denied, admin only" });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  });
};
