import { userService } from '../services/userService.js';

export const createUser = async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).send(user);
};

export const patchUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.update(id, req.body);
  res.status(200).send(user);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.findById(id);
  res.status(200).send(user);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.delete(id);
  res.status(204).send();
};

export const getSearchUser = async (req, res) => {
  const search = await userService.find(req.query);
  res.status(200).send(search);
};
