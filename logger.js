const pino = require('pino');
const { Writable } = require('stream');
const Log = require('./models/log');

// Every log collection write on MongoDB
const mongoStream = new Writable({
  write(chunk, _enc, cb) {
    try {
      const obj = JSON.parse(chunk.toString());

      // Define action request or HTTP
      const action =
        obj.action ||
        (obj.req ? 'HTTP_REQUEST' : (obj.msg ? 'LOG' : 'LOG'));

      const userid =
        obj.userid ??
        (obj.req && obj.req.headers && obj.req.headers['x-user-id']
          ? Number(obj.req.headers['x-user-id'])
          : undefined);

      Log.create({
        action,
        userid,
        payload: obj
      }).then(() => cb()).catch(() => cb());
    } catch {
      cb(); // in a case the line isn't JSON
    }
  }
});

const logger = pino({}, mongoStream);
module.exports = logger;
