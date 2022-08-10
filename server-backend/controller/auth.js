import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';

const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z'; //secret key
const jwtExpiresInDays = '2d'; //만료시간
const bcryptSaltRounds = 12; //bcrypt 길이

export async function login(req, res) {
    const { username, password } = req.body;
    const user = await userRepository.findByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid user or password' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid user or password' });
    }
    const token = createJwtToken(user.id);
    res.status(200).json({ token, username });
  }
  
  function createJwtToken(id) {
    return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
  }
  
  export async function me(req, res, next) {
    const user = await userRepository.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ token: req.token, username: user.username })
};