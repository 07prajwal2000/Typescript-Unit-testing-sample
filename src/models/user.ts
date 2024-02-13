export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
};

export interface CreateUserRequest {
  name: string;
  email: string;
  age: number;
};

export interface CreateUserResponse {
  data?: User | null;
  success: boolean;
  code: number;
  message: string;
};