export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ContactResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ContactRequest {
  userId: string;
}
