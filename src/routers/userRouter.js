import express from 'express';
import { asyncHandler } from '../lib/asyncHandler.js';
import { validate } from '../middlewares/validationMiddleware.js';
import { CreateUser, PatchUser } from '../structs/userStructs.js';
import {
  createUser,
  patchUser,
  getUser,
  getSearchUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router
  .route('/')
  .post(validate(CreateUser), asyncHandler(createUser))
  .get(asyncHandler(getSearchUser));

router
  .route('/:id')
  .patch(validate(PatchUser), asyncHandler(patchUser))
  .get(asyncHandler(getUser))
  .delete(asyncHandler(deleteUser));

export default router;
