import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema({ timestamps: true })
export class Notification extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    receiver: User;

    @Prop({ required: true })
    content: string;

    @Prop({ default: false })
    read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

