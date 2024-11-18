import { Prop, Schema } from "@nestjs/mongoose";
import { Channel } from "diagnostics_channel";
import { Document, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

export enum BanListType {
    TEMPORARY = "Temporary",
    FINAL = "Final",
}
@Schema({ timestamps: true })
export class BanList extends Document{
    @Prop({ enum: BanListType, default: BanListType.TEMPORARY })
    type: BanListType;

    @Prop()
    expiresAt: Date;

    @Prop({ required: true })
    reason: string;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: Types.ObjectId, ref: 'Channel' })
    channel: Channel;
}
