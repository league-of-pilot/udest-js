import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
}
