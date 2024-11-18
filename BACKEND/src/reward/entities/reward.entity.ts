import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Rating } from "src/rating/entities/rating.entity";

@Schema({ timestamps: true })
export class Reward extends Document {
    @Prop({ type: Types.ObjectId, ref: 'Rating' })
    rating: Rating;

    @Prop({ required: true })
    points: number;

    @Prop([String])
    privileges: string[];
}

export const RewardSchema = SchemaFactory.createForClass(Reward);   
