let users = [
    {
        id: '1',
        username: 'jae',
        password: '$2b$10$8GpdlpSKuG7GAssEJswRtu1k6j6AivENg8cgjMbWCfNjiO9ktGJNa',
        name: 'jaehyeok',
        email: 'czy1023@gmail.com',
        url: 'https://github.com/vnfmsqkek3'
    },
];

export async function findByUsername(username) {
    return users.find((user) => user.username === username);
}

export async function findById(id){
    return users.find((user) => user.id === id);
}

export async function createUser(user) {
    const created = { ...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
}