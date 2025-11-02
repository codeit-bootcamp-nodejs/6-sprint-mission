import * as s from 'superstruct';
import isEmail from 'is-email';

export const CreateUser = s.object({
  email: s.define('email', isEmail),
  firstName: s.size(s.string(), 1, 30),
  lastName: s.size(s.string(), 1, 30),
  fullName: s.optional(s.size(s.string(), 1, 30)),
  address: s.string(),
  userPreference: s.object({
    receiveEmail: s.boolean(),
  }),
});

export const PatchUser = s.partial(CreateUser);
