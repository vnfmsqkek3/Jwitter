import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { } from 'express-async-errors';
import * as userRepository from '../data/auth.js';

//추후 업데이트 예정
const jwtSecretKey = 'F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z'; //secret key
const jwtExpiresInDays = '2d'; //만료시간
const bcryptSaltRounds = 12; //bcrypt 길이

export async function signup(req, res) {
    const { username, password, name, email, url} = req.body;
    const found = await userRepository.findByUsername(username);
    if(found){
        return res.status(409).json({ message: `${username} already exists`});
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    });
    const token = createJwtToken(userId);
    res.status(201).json({ token, username});
}

export async function login(req, res) {
    const { username, password } = req.body;
    const user = await userRepository.findByUsername(username);
    if (!user) {
        return res.status(401).json({ messgae: 'ID나 패스워드가 잘못되었습니다.'});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
        return res.status(401).json({ message: 'ID나 패스워드가 잘못되었습니다.'});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({ token, username});
}

function createJwtToken(id){
    return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}