import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";
import { Channel } from "src/channel/entities/channel.entity";

export enum RequestStatus {
    PENDING = 'Pending',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
}

@Schema({ timestamps: true })
export class Invitation extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    from: User;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    to: User;

    @Prop({ type: Types.ObjectId, ref: 'Channel', required: true })
    channel: Channel;

    @Prop({ type: String, enum: RequestStatus, default: RequestStatus.PENDING })
    status: RequestStatus;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
