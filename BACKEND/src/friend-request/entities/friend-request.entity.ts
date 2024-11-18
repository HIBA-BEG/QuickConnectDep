import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

export enum RequestStatus {
    PENDING = 'Pending',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
  }

@Schema({ timestamps: true })
export class FriendRequest extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  from: User;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  to: User;

  @Prop({ type: String, enum: RequestStatus, default: RequestStatus.PENDING})
  status: RequestStatus;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
