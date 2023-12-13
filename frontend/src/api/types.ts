export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  lastConnection: string | null;
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
  lastConnection: string | null;
}

export interface ContactRequest {
  userId: string;
}
