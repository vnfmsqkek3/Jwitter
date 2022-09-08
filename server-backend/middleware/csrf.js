import { config } from "../config.js";
import bcrypt from "bcrypt";

export const csrfCheck = (req, res, next) => {
  //변경하는 API가 아니기 때문에 넘어감
  if (
    req.method === "GET" ||
    req.method === "OPTIONS" ||
    req.method === "HEAD"
  ) {
    return next();
  }

  //서버의 상태를 변경하는 API에 한에서 검사
  const csrfHeader = req.get("_csrf-token");

  if (!csrfHeader) {
    console.warn('Missing required " _csrf-token" header.', req.headers.origin); //서버에 기록남기는 용도
    return res.status(403).json({ mssage: "Failed CSRF check" });
  }

  validateCsrfToken(csrfHeader)
    .then((valid) => {
      if (!valid) {
        console.warn(
          'Value provided in "_vsrf-token" header does not validate',
          req.headers.origin,
          csrfHeader
        );
        return res.status(403).json({ messgae: "Faild CSRF check" });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Somthing went worng" });
    });
};

async function validateCsrfToken(csrfHeader) {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}
