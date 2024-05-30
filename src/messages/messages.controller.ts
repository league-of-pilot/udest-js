import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CreateMessageDto } from './dto/messages.dto'
import { MessagesService } from './messages.service'

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get()
  getMess() {
    return this.messageService.findAll()
  }

  @Post()
  postMess(@Body() body: CreateMessageDto) {
    // return { body, content: body.content }
    return this.messageService.create(body)
  }

  @Get('/:id')
  getMessId(@Param('id') idTest: string) {
    // getMessId() {
    console.log(idTest)
    console.log(typeof idTest)
    return this.messageService.findOne(idTest)
  }

  @Get('query/:ids')
  getMessQuery(
    @Param('ids') idTest: string,
    @Query() demoQuery: { demo: string }
  ) {
    // getMessId() {
    console.log('🚀 ~ demoQuery:', demoQuery)
    console.log(typeof demoQuery)
    return `mess-id query ${idTest} - ${demoQuery.demo}`
  }
}
