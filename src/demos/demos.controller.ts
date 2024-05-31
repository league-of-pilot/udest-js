import { Controller, Get, Session } from '@nestjs/common'
import { DemosService } from './demos.service'

@Controller('demos')
export class DemosController {
  constructor(private readonly demosService: DemosService) {}

  @Get('/save-session')
  // Check header response thấy chỉ set-Cookie lần đầu tiên
  // Chưa rõ có dính tới CORS về sau ko hay hoạt động độc lập
  saveSession(@Session() session: any) {
    const rand = Math.floor(Math.random() * 999)
    const demo = {
      content: 'this is some session content',
      num: rand
    }
    session.test = demo
    session.num_p100 = demo.num + 100
    return { rand }
  }

  @Get('/get-session')
  getSession(@Session() session: any) {
    console.log('🚀 demos.controller L19-session', session)
    return session.test
  }

  private demoB = async (isGet = true) => {
    const url = isGet
      ? 'http://localhost:3696/demos/get-session'
      : 'http://localhost:3696/demos/save-session'

    const option = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await fetch(url, option)
    const json = await res.json()
    return json
  }
  // demoA().then(console.log)
}
