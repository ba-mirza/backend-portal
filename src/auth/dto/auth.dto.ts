import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDTO {
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Field is required' })
  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Field is required' })
  @IsString({ message: 'Password is not string' })
  password: string;
}

export class RegisterRequestDTO {
  @IsString({ message: 'Field should be a string' })
  @IsNotEmpty({ message: 'Field is required' })
  name: string;

  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Field is required' })
  @IsEmail({}, { message: 'Email should be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Field is required' })
  @IsString({ message: 'Password is not string' })
  password: string;
}
