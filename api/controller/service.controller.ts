import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Service } from "../entity";

import { getRepository, UpdateResult } from "typeorm";

export class ServiceController extends DefaultController {
    protected initializeRoutes(): express.Router {
        const router = express.Router();

        router.route("/services").get((req: Request, res: Response) => {
            const serviceRepo = getRepository(Service);
            serviceRepo.find().then((foundService: Service[] | undefined) => {
                if (!foundService) {
                    res.status(204).send([]);
                    return;
                }
                res.status(200).send(foundService);
            });
        }).post((req: Request, res: Response) => {
            const serviceRepo = getRepository(Service);
            const newItem: Service = req.body;
            serviceRepo.save(newItem).then((savedService: Service) => {
                res.status(201).send(savedService);
            });
        })

        router.route("/services/:id").get((req: Request, res: Response) => {
            const serviceRepo = getRepository(Service)
            serviceRepo.findOne(req.params.id).then((foundService: Service | undefined) => {
                if (!foundService) {
                    res.status(404).send("Cannot find service with that id");
                    return;
                }
                res.status(200).send(foundService);
            })
        })
        .put((req: Request, res: Response) => {
            const serviceRepo = getRepository(Service)
            const updatedService: Service = req.body
            serviceRepo.findOne(updatedService.id).then((foundService: Service | undefined) => {
                if (foundService) {
                    serviceRepo.save(updatedService).then((savedService: Service) => {
                        res.status(200).send(savedService)
                    })
                } else {
                    res.status(404).send("Cannot update nonexistent service")
                }
            })
        })

        return router;
    }
}