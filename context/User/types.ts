type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
};

type UserContextType = {
  users: User[];
  selectedUser: User | null;
  getUsers: () => Promise<void>;
  getUserById: (id: string) => Promise<void>;
  createUser: (data: Omit<User, "id">) => Promise<void>;
  updateUser: (id: string, data: Omit<User, "id">) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  clearSelectedUser: () => void;
};

export type { User, UserContextType };
