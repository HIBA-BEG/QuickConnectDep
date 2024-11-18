import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Channel } from "diagnostics_channel";
import { Document, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema({ timestamps: true })
export class Rating extends Document{
    @Prop({type: Types.ObjectId, ref: 'User'})
    rater: User;
    
    @Prop({type: Types.ObjectId, ref: 'User'})
    ratee: User;

    @Prop({type: Types.ObjectId, ref: 'Channel'})
    channel: Channel;

    @Prop()
    comment: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
