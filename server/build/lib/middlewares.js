"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticate = (req, res, next) => {
    const accessToken = req.cookies["accessToken"];
    if (accessToken) {
        (0, jsonwebtoken_1.verify)(accessToken, process.env.JWT_ACCESS_SECRET, (err, user) => {
            if (err) {
                console.log("middlewares.authenticate: invalid access token");
                return res.sendStatus(401);
            }
            res.locals.user = user;
            next();
        });
    }
    else {
        console.log("middlewares.authenticate: unauthorized, access token does not exist");
        res.sendStatus(401);
    }
};
exports.authenticate = authenticate;
