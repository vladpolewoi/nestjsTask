import { Repository } from 'typeorm'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import * as bycrypt from 'bcrypt'

export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    const { target, manager, queryRunner } = usersRepository
    super(target, manager, queryRunner)
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    //hash
    const salt = await bycrypt.genSalt()
    const hashedPassword = await bycrypt.hash(password, salt)

    const user = this.create({ username, password: hashedPassword })

    try {
      await this.save(user)
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }
}
