import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../database/entity/user.entity';
import { NewUserDto } from './dto/new-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(newUser: NewUserDto): Promise<UserEntity> {
    const { username, email, password, confirmPassword } = newUser;
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match...');
    }
    const user = new UserEntity();
    user.username = username;
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }

  public async findByUserId(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  public async findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ username });
  }

  public async updateUser(id: number, updateUser: UpdateUserDto) {
    return this.userRepository.update(id, updateUser);
  }

  public async findAmbassadors() {
    this.userRepository.find({ ambassador: true });
  }
}
