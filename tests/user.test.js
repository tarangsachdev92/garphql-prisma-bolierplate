import 'cross-fetch/polyfill';
import seedDatabase, { userOne } from './utils/seedDatabase'
import getClient from './utils/getClient';
import { createUser, login, getUsers, getProfile } from './utils/operations';
import prisma from '../src/prisma';

jest.setTimeout(30000);

const client = getClient();

beforeEach(seedDatabase)

test('should create a new user', async () => {
    const variables = {
        "data": {
            "name": "Andrew",
            "email": "andrew@example.com",
            "password": "Andrew@123"
        }
    }

    const response = await client.mutate({ mutation: createUser, variables })

    const exists = await prisma.exists.User({ id: response.data.createUser.user.id })
    expect(exists).toBe(true)
})

test('should expose public author profiles', async () => {
    const response = await client.query({ query: getUsers })
    expect(response.data.users.length).toBe(2)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('John')
})

test('Should not login with bad credentials', async () => {
    const variables = {
        data: {
            email: "john@example.com",
            password: "John@1234"
        }
    }
    await expect(
        client.mutate({ mutation: login, variables })
    ).rejects.toThrow();
    // expect(() => { throw new Error('This is my error') }).toThrow()
})

test('should not signup user with invalid password', async () => {
    const variables = {
        data: {
            name: 'Tarang',
            email: 'tarangsachdev@gmail.com',
            password: 'Tar23'
        }
    }
    await expect(
        client.mutate({ mutation: createUser, variables })
    ).rejects.toThrow()
})

test('should fetch user profile', async () => {
    const client = getClient(userOne.jwt);

    const { data } = await client.query({ query: getProfile })

    expect(data.me.id).toBe(userOne.user.id);
    expect(data.me.name).toBe(userOne.user.name);
    expect(data.me.email).toBe(userOne.user.email);
})