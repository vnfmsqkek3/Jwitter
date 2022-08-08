let users = [
    {
        id: '1',
        username: 'vnfmsqkek3',
        password: '',
        name: 'jaehyeok',
        email: 'czy1023@gmail.com',
        url : 'https://github.com/vnfmsqkek3'
    },
];

export async function findByUsername(username){
    return users.find((user) => user.username === username);
}

export async function createUser(user) {
    const created = { ...user, id: Date.now().toString() };
    users.push(created);
    return created.id;
}