import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {ImATeapotException} from "@nestjs/common/exceptions/im-a-teapot.exception";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, password: string, firstName: string, lastName: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            // 🫖 Dude you're already signed up
            // TODO: handle this case
            throw new ImATeapotException()
        }
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
