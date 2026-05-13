import { createClient } from "redis";

export const redisClient = createClient({
    url: "rediss://default:gQAAAAAAAYOyAAIncDJhZjYwYWIxMGRhMWY0YTgzOTlkYTY4MzkzYjdlMDYyMnAyOTkyNTA@singular-ladybird-99250.upstash.io:6379"
});

export const redisConnection = async () => {
    try {
       await redisClient.connect()
    .then(() => console.log("Redis Connected Successfully... 😍"))
    .catch((err) => console.error("Redis Connection Error 😈", err));   
    } catch (error) {
        console.log("Fail to connect with redis 😈", error);
    }
};
