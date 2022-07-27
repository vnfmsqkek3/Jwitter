import * as tweetRepository from '../data/tweet.js';
export function getTweets(req, res) {
    const username = req.query.username;

    //username이 있다면 현재 가지고 있는 tweets에서 filter를 해준다.
    //가지고 있는 배열의 아이템이 트윗을 전달받아서 트윗에 있는 username이 사용자가 원하는 username과 동일한 것만 골라낸다
    //username이 없는 경우라면 tweets를 할당한다
    const data = username 
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll();
    res.status(200).json(data);
};

function getTweet(req, res, next) {
    const id = req.params.id;
    const tweet = tweetRepository.getById(id);
    if(tweet) {
        res.status(200).json(tweet);
    }
    else {
        res.status(404).json({message: "Tweet id(${id}) not found"});
    }
};