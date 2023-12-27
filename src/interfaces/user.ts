export interface User {
  id: string
  email: string
  avatar: string | null
  first_name: string
  last_name: string
  created_at: Date
  updated_at: Date
}