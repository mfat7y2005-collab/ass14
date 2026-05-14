import express from "express";
import bootstrap from "./app.bootstrap.js";

import { redisClient } from './DB/redis/redis.service.js';

const app = express();
const port = 3000;

bootstrap(app, express);

app.listen(port, () => {
    console.log(`Server is running on port ${port} ✈️`);
});
