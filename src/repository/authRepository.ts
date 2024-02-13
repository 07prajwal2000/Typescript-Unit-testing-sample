import { User } from "../models/user";

export interface IAuthRepository {
  createUser(name: string, email: string, age: number): Promise<User | null>;
}

export class AuthRepository implements IAuthRepository {
  async createUser(name: string, email: string, age: number): Promise<User | null> {
    return Promise.resolve({
      age,
      name,
      email,
      id: 1
    });
  }
}