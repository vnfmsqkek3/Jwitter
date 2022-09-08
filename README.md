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

 
