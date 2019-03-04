import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Status } from "../entity";

import { getRepository, UpdateResult } from "typeorm";

export class StatusController extends DefaultController {
  protected initializeRoutes(): express.Router {
    const router = express.Router();

    router
      .route("/services/:orderId")
      .get((req: Request, res: Response) => {
        const statusRepo = getRepository(Status);
        statusRepo
          .findOne(req.params.order.trackingNumber)
          .then((foundStatus: Status | undefined) => {
            if (!foundStatus) {
              res
                .status(404)
                .send("Cannot find status with that trackingNumber");
              return;
            }
            res.status(200).send(foundStatus);
          });
      })
      .put((req: Request, res: Response) => {
        const statusRepo = getRepository(Status);
        const updatedStatus: Status = req.body;
        statusRepo
          .findOne(updatedStatus.order.trackingNumber)
          .then((foundStatus: Status | undefined) => {
            if (foundStatus) {
              statusRepo.save(updatedStatus).then((savedStatus: Status) => {
                res.status(200).send(savedStatus);
              });
            } else {
              res.status(404).send("Cannot update nonexistent status");
            }
          });
      })
      .delete((req: Request, res: Response) => {
        const statusRepo = getRepository(Status);
        statusRepo.delete(req.params.id).then(() => {
          res.sendStatus(200);
        });
      });

    return router;
  }
}
