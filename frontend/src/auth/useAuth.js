import { ref } from 'vue'
import { getProfile } from '@/api/user'

const isLoggedIn = ref(false)
const user = ref(null)

const fetchProfile = async () => {
  try {
    const res = await getProfile()
    user.value = res.data.data
  } catch (err) {
    console.warn('Profile fetch failed', err)
    user.value = null
  }
}

const initAuth = async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  isLoggedIn.value = true
  await fetchProfile()
}

const login = (token) => {
  localStorage.setItem('token', token)
  isLoggedIn.value = true

  // do NOT block login on profile
  fetchProfile()
}

const logout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  user.value = null
}

export function useAuth() {
  return {
    isLoggedIn,
    user,
    initAuth,
    login,
    logout,
  }
}
