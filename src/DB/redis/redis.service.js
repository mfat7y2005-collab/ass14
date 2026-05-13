import { createClient } from 'redis';

export const redisClient = createClient({
    
});

export const get_key = (userId) => `profile::${userId}`;
export const revoked_key = ({ userId, jti }) => `revoked_key:${userId}:${jti}`;

export const setValue = async ({ key, value, ttl }) => {
    try {
        const data = typeof value === "string" ? value : JSON.stringify(value);
        return ttl 
            ? await redisClient.set(key, data, { EX: ttl }) 
            : await redisClient.set(key, data);
    } catch (error) {
        console.log("error set data in redis", error);
    }
};
export const update = async ({ key, value = {} }) => {
    try {
        const data = typeof value === "string" ? value : JSON.stringify(value);
        if (!(await redisClient.exists(key))) return 0;
        return await redisClient.set(key, data);
    } catch (error) {
        console.log("error update data in redis 😈", error);
    }
};

export const get = async (key) => {
    try {
        const data = await redisClient.get(key);
        try {
            return JSON.parse(data);
        } catch (error) {
            return data;
        }
    } catch (error) {
        console.log("error data in redis😈", error);
    }
};

export const deleteKey = async (key) => {
    try {
        if (!key || !key.length) return 0;
        return await redisClient.del(key);
    } catch (error) {
        console.log("error  delete data in redis😈", error);
    }
};

export const keys = async (pattern = "*") => {
    try {
        return await redisClient.keys(`${pattern}`);
    } catch (error) {
        console.log("error keys from redis😈", error);
    }
};

export const ttl = async (key) => {
    try {
        return await redisClient.ttl(key);
    } catch (error) {
        console.log("error  ttl from redis😈", error);
    }
};

export const incr = async (key) => {
    return await redisClient.incr(key);
};