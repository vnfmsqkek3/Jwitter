export default class TweetService {

  // tweet API를 사용하는 프론트앤드 구현

  constructor(http){
    this.http = http;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify({text,username: 'jaehyeok',name: 'Jaehyeok'}),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets${tweetId}`, {
      method: 'DELETE',
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  }
}
