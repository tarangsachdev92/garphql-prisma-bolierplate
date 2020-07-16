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
    const userExists = await prisma.exists.User({ id: authorId });

    // console.log('userExists', userExists);

    if (!userExists) {
        throw new Error('User not found!')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data, author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name posts {id title published } } }')

    return post.author;
}

// // createPostForUser('abcid', {
// createPostForUser('ckbyvr5mv00co0820fan55yj5', {
//     title: 'great book to read',
//     body: 'the war of art',
//     published: true
// }).then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch(error => {
//     console.log(error.message);
// })

const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId });


    if (!postExists) {
        throw new Error('Post not found!')
    }

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{ author { id name posts { id title published } } }')
    return post.author;
}

// // updatePostForUser('wrongId', {
// updatePostForUser('ckc0hpvdi00nu0820fmqg5ql8', {
//     published: true
// }).then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch(error => {
//     console.log(error.message);
// })

// prisma.exists.Comment({
//     id: 'ckbyvtqdi00e80820hmzr4p4u', author: { id: "ckbyvr5mv00co0820fan55yj51" }
// }).then(response => { console.log(response) })