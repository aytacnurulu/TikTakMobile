export interface Profile {
  id: number;
  full_name: string;
  phone: string;
  address: string | null;
  img_url: string | null;
  role: string;
  created_at: string;
}

export interface UpdateProfilePayload {
  full_name: string;
  address: string | null;
  img_url?: string | null;
  password?: string;
  password_repeat?: string;
}