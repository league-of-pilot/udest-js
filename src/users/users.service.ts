import { Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  // https://docs.nestjs.com/techniques/database#repository-pattern
  // Generic và decorator ko work tốt với nhau nên syntax ở đây hơi phức tạp
  // docs có vd để copy
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) {}

  create(data: CreateUserDto) {
    // Create tạo data ở tầng app, save để lưu vào db
    // Thật ra vẫn clean vì gọi vào tầng repo phụ trách,
    // vấn đề chỉ là logic ORM chia ra khái niệm phức tạp
    const user = this.usersRepo.create(data)

    return this.usersRepo.save(user)
    // Có thể save trực tiếp miễn là obj chứa đủ thông tin, ko cần tạo entities
    // return this.usersRepo.save(data)
  }
}
