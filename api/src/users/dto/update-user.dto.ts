import {
    IsEmail,
    IsInt,
    IsNotEmpty,
} from 'class-validator';

export class UpdateUserDto {
    @IsInt()
        id: number;
    
    @IsEmail()
        email?: string;

    @IsNotEmpty()
        firstName?: string;

    @IsNotEmpty()
        lastName?: string;
}
