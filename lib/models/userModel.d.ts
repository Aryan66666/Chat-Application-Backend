import { Schema } from 'mongoose';
declare const User: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profilePhoto: string;
    lastSeen: NativeDate;
    isOnline: boolean;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profilePhoto: string;
    lastSeen: NativeDate;
    isOnline: boolean;
}, {}, {
    timestamps: true;
    versionKey: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profilePhoto: string;
    lastSeen: NativeDate;
    isOnline: boolean;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    versionKey: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profilePhoto: string;
    lastSeen: NativeDate;
    isOnline: boolean;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profilePhoto: string;
    lastSeen: NativeDate;
    isOnline: boolean;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
    versionKey: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profilePhoto: string;
    lastSeen: NativeDate;
    isOnline: boolean;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=userModel.d.ts.map