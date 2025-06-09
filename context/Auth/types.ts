import { iUser } from "../User/types";

interface iLoginFormData {
  email: string;
  password: string;
}

interface iAuthContext {
  token: string | null;
  user: iUser | null;
  login: (loginData: iLoginFormData) => Promise<void>;
  getUser: (token: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export type { iAuthContext, iLoginFormData };
