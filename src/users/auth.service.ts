import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { UsersService } from './users.service'
import { compareHashPass, convertHash } from 'src/app.utils'

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

  async signin({ email, password }: { email: string; password: string }) {
    const [user] = await this.userService.findByEmail(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const [salt, hash] = user.password.split('.')
    const isPasswordCorrect = await compareHashPass({
      passInput: password,
      salt,
      hash
    })

    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong password')
    }

    return user
  }
}
