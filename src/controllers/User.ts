import asyncHandler from "express-async-handler";
import { db } from "../../drizzle/db";
import { UserTable } from "../../drizzle/schema";
import { and, eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signupUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const userExists = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.username, username));

  if (userExists.length !== 0) {
    res.status(400).json({ message: "User with username already exists" });
    throw new Error("User Already Exists");
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = await db
    .insert(UserTable)
    .values({
      username: username,
      password: hash,
    })
    .returning({
      username: UserTable.username,
    });

  const paylod = {
    username: newUser[0].username,
  };

  const token = jwt.sign(paylod, process.env.JWT_SECRET as string);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.status(200).cookie("token", token, options).json({
    message: "Signup Successful",
  });
});

const signinUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const findUser = await db
    .select()
    .from(UserTable)
    .where(and(eq(UserTable.username, username)));

  if (findUser.length !== 1) {
    res.status(400).json({ message: "User not found" });
    throw new Error("User not found");
  }

  const hashedPassword = findUser[0].password;

  const result = await bcrypt.compare(password, hashedPassword);

  if (result === false) {
    res.status(400).json({ message: "Incorrect Password" });
    throw new Error("Incorrect Password");
  }

  const payload = {
    username: username,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET as string);

  const options = { httpOnly: true, secure: true };

  res
    .status(200)
    .cookie("token", token, options)
    .json({ message: "Login Successful" });
});

const signoutUser = asyncHandler(async (req, res) => {
  const options = { httpOnly: true, secure: true };
  res
    .status(200)
    .clearCookie("token", options)
    .json({ message: "Logout Successful" });
});

export { signinUser, signupUser, signoutUser };
