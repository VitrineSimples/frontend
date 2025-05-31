interface iLoginFormData {
  email: string;
  password: string;
}

interface iAuthContext {
  token: string | null;
  user: iUser | null;
  login: (loginData: iLoginFormData) => void;
  getUser: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface iUser {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

export type { iAuthContext, iUser, iLoginFormData };
