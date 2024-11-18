import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendRequestDto {
    @IsNotEmpty()
    @IsString()
    from: string;

    @IsNotEmpty()
    @IsString()
    to: string;
}
