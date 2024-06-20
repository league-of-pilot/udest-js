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
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'

// Decorator implements từ NestInterceptor dùng được cho cả class lẫn method
// Vị trí của decorator hiện trong tut này ko ảnh hưởng
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body)
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // phải import quá nhiều -> tự viết decorator riêng cho dễ xài
  // demo áp dụng cho toàn bộ controller luôn
  // @Serialize(UserDto)
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
