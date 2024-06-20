import { Exclude } from 'class-transformer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  BeforeInsert
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  // Bước validate IsEmail hiện được set trong Dto
  // Có thể thêm luôn ở đây để chặt chẽ, tùy
  email: string

  @Column()
  @Exclude()
  // https://docs.nestjs.com/techniques/serialization
  // ko hay vì áp dụng vào trực tiếp entities cấp cao nhất
  // nếu muốn custom các properties khác tùy theo route thì ntn
  password: string

  // https://typeorm.io/listeners-and-subscribers
  @BeforeInsert()
  logBeforeInsert() {
    console.log('Before inserted')
  }

  @AfterInsert()
  logInsert() {
    console.log('Inserted user', this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user', this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user', this.id)
  }
}
