import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            bio: 'This is my bio data',
            accessLevel: 1
        },
        {
            firstName: 'Heidi',
            lastName: 'Moll',
            email: 'heidi@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            bio: 'This is my bio data',
            accessLevel: 2
        },
        {
            firstName: 'Donte',
            lastName: 'Greenhill',
            email: 'donte@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            bio: 'This is my bio data',
            accessLevel: 1
        },
        {
            firstName: 'Rosemarie',
            lastName: 'Coutu',
            email: 'rosemarie@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            bio: 'This is my bio data',
            accessLevel: 3
        }
    ],
};
export default data;