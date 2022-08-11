import * as userRepository from './auth.js'

let tweets = [{
    id: '1',
    text: "test용 텍스트",
    createdAt: Date.now().toString(),
    userId: '1'
},
{
    id: '2',
    text: "test용 텍스트2",
    createdAt: Date.now().toString(),
    userId: "1"

},
];

export async function getAll() {
    return Promise.all(
        tweets.map(async (tweet) => {
            const { username, name, url } = await userRepository.findById(
                tweet.userId
            );
            return { ...tweet, username, name, url};
        })
    );
}

export async function getAllByUsername(username) {
    return getAll().then((tweets) => 
    tweets.filter((tweet) => tweet.username === username)
    );
}

export async function getById(id) {
    const found = tweets.find((tweet) => tweet.id === id);
    if(!found) {
        return null;
    }
    const { username, name, url } = await userRepository.findById(found.userId);
    return { ...found, username, name, url};
}

export async function create(text, userId) {
    const tweet = {
        id: Date.now().toString(), //mysql id를 대체
        text,
        createdAt: new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets];
    return getById(tweet.id);
}

export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (tweet) {
        tweet.text = text;
    }
    return tweet;
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
}
