import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
  // UseInterceptors
} from '@nestjs/common'
import { CreateMessageDto } from './dto/messages.dto'
import { MessagesService } from './messages.service'
import { CurrentUser } from 'src/users/current-user.decorator'
import { User } from 'src/users/user.entity'
import { AuthGuard } from 'src/auth.guard'
// import { CurrentUserInterceptor } from 'src/users/current-user.interceptor'

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getMess() {
    return this.messageService.findAll()
  }

  @Post()
  postMess(@Body() body: CreateMessageDto) {
    // return { body, content: body.content }
    return this.messageService.create(body)
  }

  // ==============================
  @Get('meme')
  // TODO: RE-CHECK
  // https://docs.nestjs.com/interceptors#binding-interceptors
  // ko dùng app.useGlobalInterceptors(),  ko export trong module của user module
  // chỉ cần setup APP_INTERCEPTOR trong user module mà module khác vẫn dùng được ??
  getMemeInterceptor(@CurrentUser() user: User) {
    // getMessId() {
    console.log('🚀 ~ meme interceptor:', user)
    return user
  }

  @Get('meme2')
  // @UseInterceptors(CurrentUserInterceptor)
  getTestInterceptor(@CurrentUser() user: User) {
    // getMessId() {
    console.log('🚀 ~ test interceptor:', user)
    return user
  }
  // ==============================

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
