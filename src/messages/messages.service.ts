import { Injectable, NotFoundException } from '@nestjs/common'
import { MessagesRepo } from './messages.repo'
import { CreateMessageDto } from './dto/messages.dto'

@Injectable()
export class MessagesService {
  constructor(private messageRepo: MessagesRepo) {}

  async findOne(id: string) {
    const mess = await this.messageRepo.findOne(id)

    if (!mess) {
      throw new NotFoundException('message not found')
    }

    return mess
  }

  findAll() {
    return this.messageRepo.findAll()
  }

  create(content: CreateMessageDto) {
    return this.messageRepo.create(content)
  }
}
