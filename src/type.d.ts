import { User } from './user.entity'

// fixing the issue of req.currentUser
// chỉ ảnh hướng với middleware, với các implement như interceptor hoặc guard vẫn ko ảnh hưởng type
declare module 'express' {
  interface Request {
    currentUser?: User
    session: {
      userId: number
    }
  }
}
