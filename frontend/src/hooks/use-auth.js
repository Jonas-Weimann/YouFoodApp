import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuth: false,
      setLogin: (user, token) => set({ user, token, isAuth: true }),
      setLogout: () => set({ user: null, token: null, isAuth: false }),
    }),
    { name: 'auth-storage', storage: createJSONStorage(() => localStorage) }
  )
)