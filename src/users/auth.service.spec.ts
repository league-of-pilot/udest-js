import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from './users.service'
// Cannot find module 'src/app.utils' from 'users/auth.service.ts'

it('can create an instance of auth service', async () => {
  // Create fake copy of user Service
  const fakeUserService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password })
  }

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: fakeUserService
      }
    ]
  }).compile()

  const service = module.get(AuthService)
  expect(service).toBeDefined()
})
