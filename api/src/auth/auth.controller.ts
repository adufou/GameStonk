import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dto/login-auth.dto';
import { RegisterDto } from '@/auth/dto/login-register.dto';
import { Public } from '@/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<{ access_token: string }> {
        return this.authService.register(
            registerDto.email,
            registerDto.password,
            registerDto.firstName,
            registerDto.lastName
        );
    }
}
