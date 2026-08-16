export interface User {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  img_url: string;
  role: string;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface SignupPayload {
  full_name: string;
  phone: string;
  password: string;
}

export interface AuthResponseData {
  tokens: AuthTokens;
  profile: User;
}
