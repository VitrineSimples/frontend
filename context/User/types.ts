import { Shop } from "../Shop/types";

type iUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  imageURL: string;
  shop: Shop;
};

type UserContextType = {
  users: iUser[];
  selectedUser: iUser | null;
  getUsers: () => Promise<void>;
  getUserById: (id: string) => Promise<void>;
  createUser: (data: Omit<iUser, "id" | "shop">) => Promise<void>;
  updateUser: (id: string, data: Omit<iUser, "id" | "shop">) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  clearSelectedUser: () => void;
};

export type { iUser, UserContextType };
