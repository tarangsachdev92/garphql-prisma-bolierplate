// import uuidv4 from 'uuid/v4';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';
import getUserId from '../utils/getUserId'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        // const emailTaken = await prisma.exists.User({ email: args.data.email });

        // if (emailTaken) {
        //     throw new Error('Email Taken.')
        // }

        const password = await hashPassword(args.data.password)

        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
            // }, info)
        })

        // we remove info because we are returning token and it is not in definition

        return { user, token: generateToken(user.id) }
    },

    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('Unable to login');
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login');
        }
        return { user, token: generateToken(user.id) }
    },

    deleteUser(parent, args, { prisma, request }, info) {
        // const userExists = await prisma.exists.User({ id: args.id })

        // if (!userExists) {
        //     throw new Error('User not found!.')
        // }
        const userId = getUserId(request);

        return prisma.mutation.deleteUser({ where: { id: userId } }, info)
    },

    async updateUser(parent, args, { prisma, request }, info) {
        // const userExists = await prisma.exists.User({ id: args.id })

        // if (!userExists) {
        //     throw new Error('User not found!.')
        // }
        const userId = getUserId(request);

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info)
    },

}

export { Mutation as default }