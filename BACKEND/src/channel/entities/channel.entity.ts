import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Message } from "src/message/entities/message.entity";
import { User } from "src/user/entities/user.entity";

export enum ChannelType {
    PRIVATE = 'Private',
    PUBLIC = 'Public',
    CONVERSATION = 'Conversation',
}

@Schema({ timestamps: true })
export class Channel extends Document {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    members: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
    messages: Message[];

    @Prop([String])
    bannedWords: string[];


    @Prop({ type: String, enum: ChannelType, default: ChannelType.PUBLIC })
    type: ChannelType;

    @Prop({type: Date, required: false})
    expirationTime: Date;

    @Prop()
    scheduledTime?: Date;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    moderator: User;

}

export const ChannelSchema = SchemaFactory.createForClass(Channel)
