// TODO) Notification-Validator: 유효성 검사
import * as s from 'superstruct';

const IdFromParams = s.coerce(s.integer(), s.string(), Number);

// 1) path params 스키마
export const NotificationIdParams = s.object({
  id: IdFromParams,
});
