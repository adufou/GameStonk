import {
    Controller,
    Get,
    Param,
    Delete,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(+id);
    }
    
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }
    
    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResult> {
        return this.usersService.remove(+id);
    }
}
