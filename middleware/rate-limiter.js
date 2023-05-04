const IP = require('ip');
const redisClient = require('../redis-connect')

const ipObj = {};

const { REQUEST_LIMIT } = process.env;

async function apiThrottler(req, res, next) {
    const ipAddress = IP.address();
    const count = await redisClient.get(ipAddress);

    if (Number(count)) {
        console.log(REQUEST_LIMIT)
        if (Number(count) >= Number(REQUEST_LIMIT)) {
            return res.status(429).end('rate limit exceeded');
        } else {
            await redisClient.set(ipAddress, Number(count) + 1, { EX: 1 });
        }
    } else {
        await redisClient.set(ipAddress, 1, { EX: 1 });
    }
    // console.log(ipObj);
    next();
}

module.exports = apiThrottler;