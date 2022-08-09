import express from 'express';
import { body, check, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

//새로운 사용자를 만듬
//express-valildator를 이용해 유효성을 검사하는 코드 작성 
app.post(
    '/users',
    [
        body('name').isLength({ min: 2, max: 10 }).withMessage('이름은 2글자이상 10글자 이하 '),
        body('age').notEmpty().isInt().withMessage("숫자를 입력해주세요"),
        body('email').isEmail().withMessage("이메일을 입력해주세요"),
        body('job.name').notEmpty(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        console.log(req.body);
        res.status(201);
    });

//사용자의 email을 볼 수 있는 코드 (localhost:8080/czy1023@gmail.com)
app.get('/:email',
    param('email').isEmail().withMessage("이메일을 입력해주세요"),
    //check('email').isEmail().withMessage("이메일을 입력해주세요"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        res.send("email !")
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