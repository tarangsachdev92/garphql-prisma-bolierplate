
import getUserId from '../utils/getUserId';

const Query = {
    // all have two arguments : 1st operational arugument and 2nd is selection set
    // for selection we have three option
    // nothing, string, object(info)

    // prisma.query.users(null, null)
    // if we provide null to the second arg it will return all scaler values(not objects and array)

    users(parent, args, { prisma }, info) {

        // return db.users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
        };
        const { query } = args;
        // console.log(query);
        if (query) {
            opArgs.where = {
                OR: [{
                    name_contains: query
                }]
                // {
                //     email_contains: query
                // }
            }
        }
        return prisma.query.users(opArgs, info)
    },

    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.query.user({
            where: {
                id: userId
            }
        })
        // }, info)
    },
}

export { Query as default }