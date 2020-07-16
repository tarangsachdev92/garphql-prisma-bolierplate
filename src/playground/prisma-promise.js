import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
})

// prisma.query, prisma.mutation, prisma.subscription, prisma.exists

// all have two arguments : 1st operational arugument and 2nd is selection set
// for user we may not need to pass operational arg

// prisma.query.users(null, '{ id name posts {id title} }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// });

// prisma.query.comments(null, '{ id text author {id name} }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// });

// prisma.mutation.createPost({
//     data: {
//         title: 'NodeJs 102',
//         body: '',
//         published: false,
//         author: {
//             connect: {
//                 id: "ckbyvr5mv00co0820fan55yj5"
//             }
//         }
//     }
// }, '{ id title body author {id name } }').then(data => {
    // console.log(JSON.stringify(data, undefined, 2))
//     return prisma.query.users(null, '{ id name posts {id title} }')
// }).then((data1) => {
//     console.log(JSON.stringify(data1, undefined, 2))
// });

// prisma.mutation.updatePost({
//     where: {
//         id: 'ckc0f19jw00jo08203otqlkzg'
//     },
//     data: {
//         body: "this is how to get started with graphql",
//         published: true
//     }
// }, '{ id }').then(data => {
//     return prisma.query.posts(null, '{ id title body published author { id name }}')
// }).then(data1 => {
//     console.log(JSON.stringify(data1, undefined, 2))
// })

