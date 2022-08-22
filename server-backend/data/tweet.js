import { db } from '../db/database.js';
import * as userRepository from './auth.js'

const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id'
const ORDER_DESC = 'ORDER BY tw.createdAt DESC'
export async function getAll() {
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then((result) => result[0])
};

export async function getAllByUsername(username) {
    return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);
}

export async function getById(id) {
    return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
    return db.execute('INSERT INTO tweets (text, createdAt, userId VALUES(?,?,?)', 
    [text, new Date(), userId])
}

export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        tweet.text = text;
    }
    return getById(tweet.id);
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}
