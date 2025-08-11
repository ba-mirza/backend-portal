import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmail } from 'class-validator/types/decorator/string/IsEmail';

export class AuthDTO {
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
