import '@babel/polyfill/noConflict'; // noConflict for if already uploaded then use that old othere wise import 
// for dev server node-babel included that default we added above import only for production
import server from './server'

server.start({ port: process.env.PORT || 4000 }, () => {
    console.log('server is up and running')
})