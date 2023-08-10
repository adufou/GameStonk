import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {ImATeapotException} from "@nestjs/common/exceptions/im-a-teapot.exception";
import {User} from "../users/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }
        
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    
    async register(email: string, password: string, firstName: string, lastName: string) {
        if (await this.userExists(email)) {
            // 🫖 Dude you're already signed up
            // TODO: handle this case
            throw new ImATeapotException()
        }
        
        const newUser = new User()
        newUser.email = email;
        newUser.password = password;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        
        const user = await this.usersService.create(newUser)
        
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    
    private async userExists(email: string):Promise<boolean> {
        const user = await this.usersService.findOneByEmail(email);
        return user !== null;
    }
}
