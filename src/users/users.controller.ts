import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body)
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Get('')
  getAllUsers(@Query('email') email: string) {
    return this.usersService.findByEmail(email)
  }
}
