import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello() {
    return 'It\'s auth controller';
  }
}
