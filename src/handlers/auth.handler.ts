import { Request, ResponseToolkit } from "@hapi/hapi";
import { UserDocument, UserModel } from "../models/user.model";
import { generateToken } from "../config/auth";

export const register = async (request: Request, h: ResponseToolkit) => {
  try {
    const { email, password, name } = request.payload as {
      email: string;
      password: string;
      name: string;
    };

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return h.response({ message: "Email already in use" }).code(400);
    }

    const user = new UserModel({ email, password, name });
    await user.save();

    const token = await generateToken(user._id.toString());
    return h
      .response({
        message: "User registered successfully",
        data: {
          token,
          user: { id: user._id, email: user.email, name: user.name },
        },
      })
      .code(201);
  } catch (error: any) {
    console.error("Error registering user", error);
    return h.response({ message: error.message }).code(500);
  }
};

export const login = async (request: Request, h: ResponseToolkit) => {
    console.log('Login request received');
    try {
        const { email, password } = request.payload as {email: string, password: string};

        const user = await UserModel.findOne({ email });
        if (!user) {
            return h.response({ message: 'Invalid credentials'}).code(401);
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return h.response({ message: 'Invalid credentials'}).code(401);
        }

        const token = await generateToken(user._id.toString());

        return h.response({
            message: 'Login successful',
            data: {
                token,
                user: { id: user._id, email: user.email, name: user.name },
            }
        }).code(200);
    } catch (error: any) {
        console.error('Error logging in', error);
        return h.response({ message: error.message }).code(500);
    }
}

export const me = async (request: Request, h: ResponseToolkit) => {
    const user = request.auth.credentials.user as UserDocument;
    return h.response({
        message: 'User information',
        data: {
            id: user._id,
            email: user.email,
            name: user.name,
        }
    }).code(200);
}