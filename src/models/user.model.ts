import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    email: string;
    password: string;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserMethods {
    comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = Document & IUser & IUserMethods;
export type UserModelType = Model<IUser, object, IUserMethods>;

const UserSchema = new Schema<IUser, UserModelType, IUserMethods>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function(password: string) {
    return bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model('User', UserSchema);