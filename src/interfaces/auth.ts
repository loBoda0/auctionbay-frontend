import { User } from "./user"

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void;
  logout: () => void
}