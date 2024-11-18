import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Channel } from "diagnostics_channel";
import { Document, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema({ timestamps: true})
export class Message extends Document{
    @Prop({ required: true })
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    sender: User;

    @Prop({ type: Types.ObjectId, ref: 'Channel' })
    channel: Channel;

}

export const MessageSchema = SchemaFactory.createForClass(Message);

