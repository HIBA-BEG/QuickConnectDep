import { Channel } from "./Channel";
import { User } from "./User";


export interface Invitation {
    _id?: string | number;
    to: User;
    from: User;
    channel: Channel;
    createdAt: string;
    updatedAt: string;
    __v: number;
}