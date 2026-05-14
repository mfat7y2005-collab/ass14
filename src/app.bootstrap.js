import express from "express";
import cors from "cors"; 
import checkConnectionDB from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";
import { ORIGINS } from "../config/config.service.js";
const bootstrap = (app) => {
    const corsOptions = {
        origin: function (origin, callback) {
            if (!origin || ORIGINS.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("not allowed by cors"));
            }
        }
    };

    app.use(cors(corsOptions));

   
    app.use(express.json());

    checkConnectionDB();

    app.get("/", (req, res) => {
        res.status(200).json({ message: "Welcome on Saraha App 😍👋" });
    });

  
    app.use("/users", userRouter);


    app.all(/.*/, (req, res, next) => {
        return next(new Error(`URL ${req.originalUrl} not found ❌`, { cause: 404 }));
    });


    app.use((err, req, res, next) => {
        const status = err.cause || 500;
        return res.status(status).json({ 
            message: err.message, 
            stack: err.stack 
        });
    });
};

export default bootstrap;
