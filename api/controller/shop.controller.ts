import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Item, Category } from "../entity";

import { getRepository } from "typeorm";

export class ItemController extends DefaultController {
    protected initializeRoutes(): express.Router {
        const router = express.Router();

        router.route("/items").get((req: Request, res: Response) => {
            const itemRepo = getRepository(Item);
            itemRepo.find({ relations: ["categories"] }).then((foundItems: Item[] | undefined) => {
                if (!foundItems) {
                    res.status(404).send([]);
                    return;
                }
                console.log(foundItems);
                res.status(200).send(foundItems);
            });
        }).post((req: Request, res: Response) => {
            const itemRepo = getRepository(Item);
            const newItem: Item = req.body;
            itemRepo.save(newItem).then((savedItem: Item) => {
                res.status(201).send(savedItem);
            });
        })

        router.route("/items/:id").get((req: Request, res: Response) => {
            const itemRepo = getRepository(Item)
            itemRepo.findOne({ relations: ["categories"], where: { id: req.params.id } }).then((foundItem: Item | undefined) => {
                if (!foundItem) {
                    res.status(404).send("Cannot find item with that id");
                    return;
                }
                res.status(200).send(foundItem);
            })
        })
        .put((req: Request, res: Response) => {
            const itemRepo = getRepository(Item)
            const updatedItem: Item = req.body
            itemRepo.findOne({ relations: ["categories"], where: { id: req.params.id } }).then((foundItem: Item | undefined) => {
                if (foundItem) {
                    itemRepo.save(updatedItem).then((savedItem: Item) => {
                        res.status(200).send(savedItem)
                    })
                } else {
                    res.status(404).send("Cannot update nonexistent item")
                }
            })
        })

        return router;
    }
}