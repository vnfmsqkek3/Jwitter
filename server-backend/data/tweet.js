import { db } from '../db/database.js';
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js'
import { DynamoDB } from 'aws-nuke/src/resources/index.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define('tweet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
Tweet.belongsTo(User); //tweet은 user에 포함이 됨

const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id'
const ORDER_DESC = 'ORDER BY tw.createdAt DESC'

export async function getAll() {
    return Tweet.findAll({
        attributes: [
            'id',
            'text',
            'createdAt',
            'userId',
            [Sequelize.col('user.name'), 'name'],
            [Sequelize.col('user.username'), 'username'],
            [Sequelize.col('user.url'), 'url'],
        ],
        include: {
            model: User,
            attributes: []
        },
        order: [['createdAt', 'DESC']], //받아오는 순서(최근거가 맨 위로)
    }).then((data) => { console.log(data); return data });
}

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
    return Tweet.create({ text, userId }).then((data) => {
        console.log(data);
        return data
    });
}

export async function update(id, text) {
    return db.execute('UPDATE tweets SET text=? WHRE id=?', [text, id])
        .then(() => getById(id));
}

export async function remove(id) {
    return db.execute('DELETE FROM tweets WHERE id=?', [id])
}
