import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma'

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', // relative to the root application folder(where the pacakge.json there) 
    resolvers,
    context(request) {
        return {
            pubsub, prisma, request
        }
    },
    fragmentReplacements
})

export { server as default } 