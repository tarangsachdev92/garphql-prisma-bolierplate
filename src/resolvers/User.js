import getUserId from '../utils/getUserId';


const User = {
    // email(parent, args, { request }, info) {
    //     const userId = getUserId(request, false);
    //     // for users query if we don't pass id as a output field than for all users email will be null 
    //     // for me query we always have id because we are not passing info object for the second argument
    //     // if we don't pass info->it will give all scaler value (in which id is always there)
    //     // console.log(parent);
    //     if (userId && userId === parent.id) {
    //         return parent.email
    //     } else {
    //         return null
    //     }
    // },
    email: {
        fragment: 'fragment userId on User {id}',
        resolve(parent, args, { request }, info) {
            const userId = getUserId(request, false);
            // console.log(parent.id);
            if (userId && userId === parent.id) {
                return parent.email
            } else {
                return null
            }
        }
    },
}

export { User as default };