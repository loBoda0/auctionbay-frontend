import { User } from "../interfaces/user"

const USER_PREFIX = "user"

const userStorage = {
  getUser: () => {
    if (typeof window !== "undefined") {
      const userString = window.localStorage.getItem(`${USER_PREFIX}`)
      let user: User | null = null
      try {
        user = userString ? JSON.parse(userString) : null
      } catch (error) {
        console.error('Error parsing user from local storage', error)
      }
      return user
    }
    return null
  },

  setUser: (user: User): void => {
    window.localStorage.setItem(`${USER_PREFIX}`, JSON.stringify(user))
  },

  clearUser: (): void => {
    window.localStorage.removeItem(`${USER_PREFIX}`)
  },

}

export { userStorage }