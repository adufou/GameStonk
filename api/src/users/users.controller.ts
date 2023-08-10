import {Controller, Get, Param} from '@nestjs/common';
import {UsersService} from "./users.service";
import {FindOneParams} from "../params/find-one.params";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Get(':id')
    findOne(@Param() params: FindOneParams) {
        return this.usersService.findOne(params.id);
    }
}
