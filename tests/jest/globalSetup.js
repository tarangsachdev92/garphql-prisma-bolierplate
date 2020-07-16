require("babel-register");
require("@babel/polyfill/noConflict");
// import server from './server'
const server = require('../../src/server').default

module.exports = async () => {
    // const instance = await server.start({ port: 4000 })
    // instance.close()
    global.httpServer = await server.start({ port: 4000 })
}