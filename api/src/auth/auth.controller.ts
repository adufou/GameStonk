import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {Public} from "../decorators/public.decorator";
import {SignInDto} from "./dto/auth.signin.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password, signInDto.firstName, signInDto.lastName);
    }
    
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
