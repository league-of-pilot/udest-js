import { Injectable } from '@nestjs/common'
import { UsersService } from './users.service'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  signup(email: string, password: string) {
    // Check email exist
    // hash password
    // create user entities  -> save entities
    // return user
  }

  signin() {}
}
