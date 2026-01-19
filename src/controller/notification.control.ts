import { NextFunction, Request, Response } from 'express';
import notiService from '../service/notification.service';

async function getList(req: Request, res: Response, next: NextFunction): Promise<void> {
  const notifications = await notiService.getList(req.user.id);
  res.status(200).send(notifications);
}

async function countUnread(req: Request, res: Response, next: NextFunction): Promise<void> {
  const notification = await notiService.countUnread(req.user.id);
  res.status(200).send(notification);
}

async function patch(req: Request, res: Response, next: NextFunction): Promise<void> {
  const notification = await notiService.patch(Number(req.params.id));
  res.status(200).send(notification);
}

export default {
  getList,
  countUnread,
  patch
};
