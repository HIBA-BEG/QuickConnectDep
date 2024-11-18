import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateInvitationDto {
    @IsNotEmpty()
    @IsString()
    from: string;

    @IsNotEmpty()
    @IsString()
    to: string;

    channel: Types.ObjectId
}
