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
