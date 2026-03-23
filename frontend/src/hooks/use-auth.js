import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setLogin: (user, token) => set({ user, token }),
      setLogout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
)