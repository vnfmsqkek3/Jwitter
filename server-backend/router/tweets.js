import express from 'express';
import 'express-async-errors';

let tweets = [{
    id:'1',
    text: "test용 텍스트",
    createdAt: Date.now().toString(),
    name: 'jaehyeok',
    username: 'vnfmsqkek3',
    url: 'https://www.linkedin.com/in/%EC%9E%AC%ED%98%81-%EC%B5%9C-515606241/'
},
{
    id:'2',
    text: "test용 텍스트2",
    createdAt: Date.now().toString(),
    name: 'Zero',
    username: 'ttt',
    
},
];

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
    const username = req.query.username;

    //username이 있다면 현재 가지고 있는 tweets에서 filter를 해준다.
    //가지고 있는 배열의 아이템이 트윗을 전달받아서 트윗에 있는 username이 사용자가 원하는 username과 동일한 것만 골라낸다
    //username이 없는 경우라면 tweets를 할당한다
    const data = username 
    ? tweets.filter(t => t.username === username)
    : tweets;
    res.status(200).json(data);
});

// GET /tweets/:id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find(t => t.id === id);
    if(tweet) {
        res.status(200).json(tweet);
    }
    else {
        res.status(404).json({message: "Tweet ${id} not found"});
    }
});

// POST /tweets
router.post('/', (req, res, next) => {
    const { text, name, username } = req.body;
    const tweet = {
        id: Date.now().toString(), //mysql id를 대체
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
})
// PUT /tweets/:id
// DELETE /tweets/:id


export default router;