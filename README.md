# Jwitter
채팅 앱 만들기 프로젝트

2022-07-21

API문서
https://animated-jet-0ce.notion.site/API-Spec-Jweets-2619c23f03b04e96aa805778191981f5


2022-07-27
서버 MVC 패턴 적용

2022-08-08
로그인 restful APi 개발

- postman setup
![image](https://user-images.githubusercontent.com/50416571/184054960-062310fc-7a79-47b2-8192-251dd04ff1c4.png)


- 회원가입 기능 
![image](https://user-images.githubusercontent.com/50416571/184050986-d4ced5db-15cf-4fb2-a86a-c34bc1ea33fe.png)

- 로그인 기능
![image](https://user-images.githubusercontent.com/50416571/184051123-db1ea9e7-5e1d-4278-b171-2f361fa230f0.png)

- 회원가입을 하지 않을 시
![image](https://user-images.githubusercontent.com/50416571/184052465-a0f82c0c-9ff1-4cd7-8032-b1f6b250d10d.png)

- 
2022-08-19
MySQL 적용

**SCHEMA

```
CREATE SCHEMA `Jwitter` ;
```

```
CREATE TABLE `Jwitter`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usersname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `url` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `usersname_UNIQUE` (`usersname` ASC) VISIBLE);
```

```
CREATE TABLE `Jwitter`.`tweets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `createdAt` VARCHAR(45) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
```

```
ALTER TABLE `Jwitter`.`tweets` 
ADD INDEX `fk_tweets_1_idx` (`userId` ASC) VISIBLE;
;
ALTER TABLE `Jwitter`.`tweets` 
ADD CONSTRAINT `id`
  FOREIGN KEY (`userId`)
  REFERENCES `Jwitter`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
```

2022-08-31
- 보안 업데이트
 1. 문제점 (로컬스토리지에서 서버에서 받아온 JWT토큰을 볼 수 있어서 보안상 취약함)
 ![image](https://user-images.githubusercontent.com/50416571/187573126-698c01b7-3ac7-4659-858d-1179d115f9bc.png)
 
 2. backend/ npm i cookie-parser morgan helmet

```
    import cookieParser from 'cookie-parser';

    const corsOption = {
    origin: config.cors.allowedOrigin,
    optionsSuccessStatus: 200,
    credentials: true, // allow the Access-Control-Allow-Credentials
  };

```

```
// backend/controller/auth.js

function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res.cookie("token", token, options); // HTTP-ONLY
}

```

```
// frontend/src/network/http.js
  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });
```

2022-09-13
- 보안 업데이트 (CSRF Attack)

Cross-Site Request Forgery : authenticated된 사용자가 원하지 않는 action을 하도록 만드는 공격. 

문제 : local storage나 cookie에 저장된 데이터를 해커가 자바스크립트를 이용해 해커가 읽어갈 수 있음.


해결 logic
1. client가 server에게 CsrfToken 요청
2. server로 부터 CSRF token을 받음 
3. csrf_token을 이용해 server -> DB login요청
4. client는 HTTP Only Cookie: token=JWT 와 csrf_token을 application 메모리 상에 보관
5. 이후 client 요청때 JWT토큰을 HTTP Only옵션을 cookie로도 보내고, csrf_token을 Header에 붙임으로써 CSRF Attack을 예방.

결과
request를 한다고 해서 브라우저에 있는 HTTP Only cookie를 세션 라이딩을 한다고 해도 csrf_token이 있어야 함으로, application에서 발행받은 csrf_token을 이용해 CSRF Attack의 취약점을 보완할 수 있다.

```
// server/middleware/csrf.js
export const csrfCheck = (req, res, next) => {
  if (
    req.method === 'GET' ||
    req.method === 'OPTIONS' ||
    req.method === 'HEAD'
  ) {
    return next();
  }

  const csrfHeader = req.get('_csrf-token');

  if (!csrfHeader) {
    console.warn('Missing required "_csrf-token" header.', req.headers.origin);
    return res.status(403).json({ message: 'Failed CSRF check' });
  }

  validateCsrfToken(csrfHeader)
    .then((valid) => {
      if (!valid) {
        console.warn(
          'Value provided in "_csrf-token" header does not validate.',
          req.headers.origin,
          csrfHeader
        );
        return res.status(403).json({ message: 'Failed CSRF check' });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    });
};

async function validateCsrfToken(csrfHeader) {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}
```

```
// server/router/auth.js

router.get('/csrf-token', authController.csrfToken);
```

```
// app.js

import { csrfCheck } from './middleware/csrf.js';

app.use(csrfCheck);
```

```
// server/controller/auth.js

export async function csrfToken (req, res, next) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

export function generateCSRFToken() {
  return bcrypt.hash(config.csrf.plainToken, 1); //한자리의 랜덤한 해쉬코드를 만들기 위해 1을 넣음
}

```
### front-end는 코드 참조





