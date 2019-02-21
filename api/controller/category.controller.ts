import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Item, Category } from "../entity";

import { getRepository } from "typeorm";

export class CategoryController extends DefaultController {
    protected initializeRoutes(): express.Router {
        const router = express.Router();

        router.route("/categories").get((req: Request, res: Response) => {
            const categoryRepo = getRepository(Category);
            categoryRepo.find().then((foundCategory: Category[] | undefined) => {
                if (!foundCategory) {
                    res.status(404).send([]);
                    return;
                }
                console.log(foundCategory);
                res.status(200).send(foundCategory);
            });
        }).post((req: Request, res: Response) => {
            const categoryRepo = getRepository(Category);
            const newCategory: Category = req.body;
            categoryRepo.save(newCategory).then((savedCategory: Category) => {
                res.status(201).send(savedCategory);
            });
        })

        router.route("/categories/:id").get((req: Request, res: Response) => {
            const categoryRepo = getRepository(Category)
            categoryRepo.findOne({ where: {id: req.params.id} }).then((foundCategory: Category | undefined) => {
                if (!foundCategory) {
                    res.status(404).send("Cannot find category with that id");
                    return;
                }
                res.status(200).send(foundCategory);
            })
        })
        .put((req: Request, res: Response) => {
            const categoryRepo = getRepository(Category)
            const updatedCategory: Category = req.body
            categoryRepo.findOne({ where: { id: req.params.id } }).then((foundCategory: Category | undefined) => {
                if (foundCategory) {
                    categoryRepo.save(updatedCategory).then((savedCategory: Category) => {
                        res.status(200).send(savedCategory)
                    })
                } else {
                    res.status(404).send("Cannot update nonexistent category")
                }
            })
        })

        return router;
    }
}