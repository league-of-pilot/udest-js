import { Injectable, NotFoundException } from '@nestjs/common'
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

  findOne(id: number) {
    console.log('🚀 users.service L29-id findOne', id)
    // Nếu undefined thì vẫn trả vầ user đầu tiên ???
    return this.usersRepo.findOneBy({ id })
  }

  findByEmail(email: string) {
    return this.usersRepo.find({ where: { email } })
  }

  async update(id: number, attrs: Partial<User>) {
    // insert và update trong typeORM dùng với plain Obj
    // save, remove dùng với class entities - chạy hook
    // nhưng phải đánh đổi bằng việc fetch entities instance trước
    // return this.usersRepo.update(id, attrs)

    // C2 - fetch entities instance trước
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    Object.assign(user, attrs)
    return this.usersRepo.save(user)
  }

  // remove(entites) vs delete(id) - tương tự trên
  // Vì trong entities đang setup hook afterRemove -> convention trong team
  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    return this.usersRepo.remove(user)
  }
}

// Test ts type check quick - check Partial Utitlity type
// const userService = new UsersService({} as any)
// userService.update(1, { email: 'a', red: 'b' })
