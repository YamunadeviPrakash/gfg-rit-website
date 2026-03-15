import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [coordinator, setCoordinator] = useState(() => {
    const saved = localStorage.getItem('gfg_coordinator')
    return saved ? JSON.parse(saved) : null
  })

  const login = (data) => {
    setCoordinator(data)
    localStorage.setItem('gfg_coordinator', JSON.stringify(data))
  }

  const logout = () => {
    setCoordinator(null)
    localStorage.removeItem('gfg_coordinator')
  }

  return (
    <AuthContext.Provider value={{ coordinator, login, logout, isLoggedIn: !!coordinator }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
