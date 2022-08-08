const bcrypt = require('bcrypt')

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10);
console.log(`password: ${password}, hashed: ${hashed}`);

//$2b$10$8GpdlpSKuG7GAssEJswRtu1k6j6AivENg8cgjMbWCfNjiO9ktGJNa