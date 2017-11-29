let path = require('path')
let Koa = require('koa');
let app = new Koa();



/**
 * static
 */
app.use(require('koa-static')(path.join(__dirname, '..', 'frontend', 'dist')));


/**
 * logger
 */
app.use(require('koa-logger')())


/**
 * parse json in request body
 */
app.use(require('koa-bodyparser')());


/**
 * Use koa session && csrf
 */
// app.keys = ['session key', 'csrf key'];

// app.use(require('koa-session')(app));
// const CSRF = require('koa-csrf');
// app.use(new CSRF())


/**
 * socket io setting
 */
const server = require('./socket')(app)

server.listen(3000);

// module.exports = app.listen(3000)
module.exports = server;
