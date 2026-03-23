import api from '@/api/api'

export const authService = {
  login: async (credentials) => {
    const { data } = await api.post('/auth/login', credentials)
    return data
  },

  register: async (userData) => {
    const { data } = await api.post('/auth/register', userData)
    return data
  },

  loginGoogle: async (googleToken) => {
    const { data } = await api.post('/auth/google', { token: googleToken })
    return data
  },

  logout: async () => {
    const { data } = await api.post('/auth/logout')
    return data
  }
}