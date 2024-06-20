import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

export const pscrypt = promisify(scrypt)

export const convertHash = async (password: string) => {
  const salt = randomBytes(8).toString('hex')
  const buf = (await pscrypt(password, salt, 32)) as Buffer
  const hashString = `${salt}.${buf.toString('hex')}`
  return hashString
}
