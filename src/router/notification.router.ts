import express from 'express';
import notiControl from '../controller/notification.control';
import withTryCatch from '../lib/withTryCatch';
import authenticate from '../middleware/authenticate';

const notiRouter = express.Router();

notiRouter.get('/', authenticate, withTryCatch(notiControl.getList)); // 알림 목록 조회
notiRouter.get('/:id', authenticate, withTryCatch(notiControl.countUnread)); // 알림 조회
notiRouter.patch('/:id', authenticate, withTryCatch(notiControl.patch)); // 알림 수정 (단방향: 읽음으로)

export default notiRouter;

// userRouter로 합칠 예정
