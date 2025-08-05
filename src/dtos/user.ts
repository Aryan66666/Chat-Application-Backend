import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserSignUpDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

     @IsString()
    @IsNotEmpty()
    confirmPassword!: string;


    profilePhoto?: string;
    lastSeen?: Date;
    isOnline?: boolean

}
export class ConfirmSignUpDto{
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    code!: string;


}

export class SignInDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

}