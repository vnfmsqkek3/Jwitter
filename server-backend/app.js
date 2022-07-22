import express from 'express';
import cors from 'cors';
import morgan from 'morgan'; //디버깅용
import helmet from 'helmet'; //보안용
import 'express-async-errors'; //promise나 async error를 잡는용
import tweetsRouter from './router/tweets.js'

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));


app.use('/tweets', tweetsRouter); // "/tweets"로 접속했을 때 tweetsRoute로 연결

app.use((req, res, next) => { //다른 url이 왔을때 404로 처리
    res.sendStatus(404);
});

app.use((error, req, res, next) => { //서버 error 처리
    console.error(error);
    res.sendStatus(500);
});

app.listen(8080);
