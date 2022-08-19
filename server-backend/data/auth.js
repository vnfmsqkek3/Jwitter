import { db } from '../db/database.js';

export async function findByUsername(username) {
    return db.execute('SELECT * FROM users WHERE username=?', [username])
    .then((result) => result[0][0]);
}

export async function findById(id) {
    return null;
    //return users.find((user) => user.id === id);
}

export async function createUser(user) {
    const { username, password, name, email, url } = user;
    return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
        [username, password, name, email, url]
    ).then((result) =>  result[0].insertId);
}