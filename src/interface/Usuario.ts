export interface Usuario {
  email: string;
  rol: string;
  password?: string;

  id?: string;
  created_at: string;
  last_sign_in_at?: string;
}
