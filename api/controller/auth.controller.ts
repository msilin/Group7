import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Session, userType } from "../entity";

import { getRepository } from "typeorm";

export class AuthController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router.use("/", (req: Request, res: Response, next) => {
        const sessionRepo = getRepository(Session);
        const token = req.get("token");

        sessionRepo.findOneOrFail(token, {relations: ["user"]}).then((foundSession: Session) => {
            res.locals.userType = foundSession.user.userType;
            res.locals.userId = foundSession.user.id;
            next();
        }).catch(() => {
            res.locals.userType = userType.ANON;
            res.locals.userId = -1;
            next();
        });
    });
    return router;
  }
}
