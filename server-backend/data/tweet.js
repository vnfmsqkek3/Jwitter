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

export async function getAll(){
    return tweets;
}

export async function getAllByUsername(username){
    return tweets.filter((tweet) => tweet.username === username);
}

export async function getById(id){
    return tweets.find((tweet) => tweet.id === id);
}

export async function creat(text, name, username) {
    const tweet = {
        id: Date.now().toString(), //mysql id를 대체
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets];
    return tweet;
}

export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet){
        tweet.text = text;
    }
    return tweet;
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}
