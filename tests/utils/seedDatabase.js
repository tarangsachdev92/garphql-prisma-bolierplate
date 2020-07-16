import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: 'John',
        email: 'john@example.com',
        password: bcrypt.hashSync('John@123')
    },
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: 'James',
        email: 'james@example.com',
        password: bcrypt.hashSync('James@123')
    },
    user: undefined,
    jwt: undefined
}

const seedDatabase = async () => {
    // delete test data
    await prisma.mutation.deleteManyUsers();

    // Create user one 
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

    // Create user two
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

}

export { seedDatabase as default, userOne, userTwo };