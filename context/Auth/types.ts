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
  refreshUser: () => Promise<void>
}

interface iUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

export type { iAuthContext, iUser, iLoginFormData };
