import express from 'express';
import notiControl from '../controller/notification.control';
import withTryCatch from '../lib/withTryCatch';
import authenticateUser from '../middleware/authenticate.user';

const notiRouter = express.Router();

notiRouter.get('/', authenticateUser, withTryCatch(notiControl.getList)); // 알림 목록 조회
notiRouter.get('/:id', authenticateUser, withTryCatch(notiControl.countUnread)); // 알림 조회
notiRouter.patch('/:id', authenticateUser, withTryCatch(notiControl.patch)); // 알림 수정 (단방향: 읽음으로)

export default notiRouter;
