import { Expose } from 'class-transformer'

// TH Định nghĩa chung cho UserDto phải dùng Expose để chỉ ra những field nào cần expose
export class UserDto {
  @Expose()
  id: number

  @Expose()
  email: string
}
