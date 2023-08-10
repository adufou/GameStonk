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
import bcrypt from "bcrypt";
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {Public} from "../decorators/public.decorator";
import {RegisterDto} from "./dto/login-register.dto";
import {LoginDto} from "./dto/login-auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto.email, registerDto.password, registerDto.firstName, registerDto.lastName);
    }
    
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
