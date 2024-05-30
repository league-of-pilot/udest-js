import { Injectable } from '@nestjs/common'
import { readFile, writeFile } from 'fs/promises'
import * as path from 'path'
import { DB_CONST } from 'src/app.const'
import { CreateMessageDto } from './dto/messages.dto'

@Injectable()
export class MessagesRepo {
  public dbFullPath: string
  constructor() {
    this.dbFullPath = path.resolve(DB_CONST.dbPath, DB_CONST.dbName)
  }

  // does not work
  // constructor(
  //   public dbFullPath = path.resolve(DB_CONST.dbPath, DB_CONST.dbName)
  // ) {}

  findOne(id: string) {
    return this.findAll()[id]
  }

  async findAll() {
    const content = await readFile(this.dbFullPath, 'utf-8')
    const dbContent = JSON.parse(content)
    return dbContent
  }

  async create(content: CreateMessageDto) {
    const dbContent = await this.findAll()
    const id = crypto.randomUUID()
    const newMess = {
      id,
      content
    }
    dbContent[id] = newMess
    await writeFile(this.dbFullPath, JSON.stringify(dbContent, null, 2))
  }
}
