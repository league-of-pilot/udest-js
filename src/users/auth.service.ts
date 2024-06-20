import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from './users.service'
import { convertHash } from 'src/app.utils'

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signup({ email, password }: { email: string; password: string }) {
    // Check email exist
    const users = await this.userService.findByEmail(email)
    if (users.length) {
      throw new BadRequestException('Email already exists')
    }

    // hash password
    const hashPassword = await convertHash(password)
    // create user entities  -> return user
    const user = await this.userService.create({
      email,
      password: hashPassword
    })
    return user
  }

  signin() {}
}
