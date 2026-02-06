import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });

  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashed,
  });

  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Invalid credentials");

  const token = generateToken({
    id: user._id,
    role: user.role,
  });

  return { user, token };
};
