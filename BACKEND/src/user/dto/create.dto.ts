import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
