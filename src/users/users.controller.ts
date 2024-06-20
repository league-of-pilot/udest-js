import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body)
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id)
    // Việc throw trong service hay controller tùy, throw trong controller ở đây sẽ thoải mái hơn
    // Ngoài http Nest có thể handle socket controller ...
    // throw ngay trong service thì phải setup thêm exception filter để handle
    // https://docs.nestjs.com/exception-filters
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return user
  }

  @Get('')
  getAllUsers(@Query('email') email: string) {
    return this.usersService.findByEmail(email)
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body)
  }
}
