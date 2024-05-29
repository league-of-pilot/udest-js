import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

@Controller('messages')
export class MessagesController {
  @Get()
  getMess() {
    return 'get - all - messages'
  }

  @Post()
  postMess(@Body() body: { content: string }) {
    return { body, content: body.content }
  }

  @Get('/:id')
  getMessId(@Param('id') idTest: string) {
    // getMessId() {
    console.log(idTest)
    console.log(typeof idTest)
    return `mess-id ${idTest}`
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
