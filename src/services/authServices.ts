import { CreateUserRequest, CreateUserResponse, User } from "../models/user";
import { IAuthRepository } from "../repository/authRepository";

export interface IAuthService {
  createUser(data: CreateUserRequest): Promise<CreateUserResponse>;
}

export class AuthService implements IAuthService {
  constructor(private readonly repository: IAuthRepository) { }

  async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    if (!data.email || !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)) {
      return {
        code: 400,
        message: 'Invalid email',
        success: false
      };
    }
    if (data.age < 18 || data.age > 65) {
      return {
        code: 400,
        message: "Age should be in between 18 and 65",
        success: false
      };
    }
    if (!data.name || data.name.length < 3) {
      return {
        code: 400,
        message: "Name is too short",
        success: false
      };
    }
    try {
      const result = await this.repository.createUser(data.name, data.email, data.age);
      if (!result) {
        return {
          code: 400,
          message: 'failed to create user',
          success: false
        };
      }
      return {
        data: result,
        code: 200,
        message: 'ok',
        success: true
      };
    } catch (e) {
      return {
        data: null,
        code: 500,
        message: 'Server error',
        success: false
      };
    }
  }
}