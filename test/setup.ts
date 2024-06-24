import { rm } from 'fs/promises'
import { join } from 'path'

global.beforeEach(async () => {
  try {
    // do something before each test
    // __dirname is the directory of the app.e2e-spec.ts file
    await rm(join(__dirname, '..', '_ignore_mock', 'test.sqlite'))
  } catch (e) {}
})
