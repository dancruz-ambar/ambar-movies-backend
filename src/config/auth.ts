import { Server } from '@hapi/hapi';
import jwt from 'jsonwebtoken';
import * as hapiAuthJwt2 from 'hapi-auth-jwt2';
import { UserModel } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = async (userId: string) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h'});
};

const validateToken = async (decoded: any, request: any) => {
    console.log('=== Validate Token ===');
    console.log('Decoded:', decoded);
    try {
        const user = await UserModel.findById(decoded.userId);
        console.log('User:', user);
        if (!user) {
            return { isValid: false };
        }
        return { isValid: true, credentials: { user } };
    } catch (error) {
        console.log('Error validating token');
        return { isValid: false, error: 'Invalid token' };
    }
};

export const registerAuth = async (server: Server) => {
    await server.register(hapiAuthJwt2);

    server.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        validate: validateToken,
        verifyOptions: { algorithms: ['HS256'] },
    });
}