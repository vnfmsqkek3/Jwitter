import express from 'express';

const app = express();
app.use(express.json());

//새로운 사용자를 만듬
//이메일의 유효성을 검사하는 코드 작성
app.post('/users', (req, res, next) => {
    console.log(req.body);
    if(req.body.email.indexOf("@" != -1)) {
        res.status(201).send({ message : 'hello!'})
    }
    else{
    res.sendStatus(401).send({ message : "not email! "});
    }
});

//사용자의 email을 볼 수 있는 코드
app.get('/:email', (req, res, next) => {
    res.send("EMAIL");
});

app.listen(8080);


// {
//     "name": "jae",
//     "age" : 26,
//     "job": {
//         "name" : "hyeok",
//         "title": "programmer"
//     },
//     "email" : "czy1023@gmail.com"
// }