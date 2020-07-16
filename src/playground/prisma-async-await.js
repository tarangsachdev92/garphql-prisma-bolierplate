import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

// prisma.query, prisma.mutation, prisma.subscription, prisma.exists

// all have two arguments : 1st operational arugument and 2nd is selection set
// for user we may not need to pass operational arg

// 1. crate a new post
// 2. fetch all the info about the user (author)

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data, author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ id }')
    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, '{ id name posts {id title body published}}')

    return user;
}

// createPostForUser('ckbyvr5mv00co0820fan55yj5', {
//     title: 'great book to read',
//     body: 'the war of art',
//     published: true
// }).then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
// })

const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id } }')
    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{ id name posts {id title published}}')
    return user;
}

// updatePostForUser('ckc0glw6000k20820gl6psuqr', {
//     published: false
// }).then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
// })
