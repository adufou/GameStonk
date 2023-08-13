import {
    Injectable, UnauthorizedException, 
} from '@nestjs/common';
import { ImATeapotException } from '@nestjs/common/exceptions/im-a-teapot.exception';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException();
        }
        
        const payload = {
            sub: user.id,
            email: user.email, 
        };
        return { access_token: await this.jwtService.signAsync(payload) };
    }
    
    async register(email: string, password: string, firstName: string, lastName: string) {
        if (await this.userExists(email)) {
            // TODO: handle this case ?
            throw new ImATeapotException('🫖 Dude you\'re already signed up');
        }
        
        const bcryptedPassword = await bcrypt.hash(password, 15);
        
        const newUser = new User();
        newUser.email = email;
        newUser.password = bcryptedPassword;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        
        const user = await this.usersService.create(newUser);
        
        const payload = {
            sub: user.id,
            email: user.email, 
        };
        return { access_token: await this.jwtService.signAsync(payload) };
    }
    
    private async userExists(email: string):Promise<boolean> {
        const user = await this.usersService.findOneByEmail(email);
        return user !== null;
    }
}
