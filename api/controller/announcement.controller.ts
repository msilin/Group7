import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import express from "express";

import { Announcement } from "../entity";

import { getRepository } from "typeorm";

export class AnnouncementController extends DefaultController {
    protected initializeRoutes(): express.Router {
        const router = express.Router();

        router.route("/announcements").get((req: Request, res: Response) => {
            const announcementRepo = getRepository(Announcement);
            announcementRepo.find().then((foundAnnouncements: Announcement[] | undefined) => {
                if (!foundAnnouncements) {
                    res.status(204).send([]);
                    return;
                }
                res.status(200).send(foundAnnouncements);
            });
        }).post((req: Request, res: Response) => {
            const announcementRepo = getRepository(Announcement);
            const { newTitle, newContent } = req.body;
            const newAnnouncement = {
                content: newContent,
                datePosted: new Date(),
                title: newTitle,
            };
            announcementRepo.save(newAnnouncement).then((savedAnnouncement: Announcement) => {
                res.status(201).send(savedAnnouncement);
            });
        });
        router.route("/announcements/:id").delete((req: Request, res: Response) => {
            const announcementRepo = getRepository(Announcement);
            announcementRepo.delete(req.params.id).then(() => { res.sendStatus(200); });
        })
            .put((req: Request, res: Response) => {
                const announcementRepo = getRepository(Announcement);
                const announcement: Announcement = req.body;
                announcementRepo.save(announcement).then((savedAnnouncement: Announcement) => {
                    if (savedAnnouncement) {
                        res.status(200).send(savedAnnouncement);
                    } else {
                        res.sendStatus(500);
                    }
                });
            });
        return router;
    }
}
