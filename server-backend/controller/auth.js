import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options); // HTTP-ONLY
}

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  setToken(res, token);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ messgae: "ID나 패스워드가 잘못되었습니다." });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "ID나 패스워드가 잘못되었습니다." });
  }
  const token = createJwtToken(user.id);
  setToken(res, token);
  res.status(200).json({ token, username });
}

export async function logout(req, res, next) {
    res.cookie('token', '');
    res.status(200).json({ message : 'User has been logged out'});
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

export async function csrfToken (req, res, next) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

export function generateCSRFToken() {
  return bcrypt.hash(config.csrf.plainToken, 1); //한자리의 랜덤한 해쉬코드를 만들기 위해 1을 넣음
}