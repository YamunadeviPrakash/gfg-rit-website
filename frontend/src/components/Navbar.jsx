import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, Code2, LogOut, LayoutDashboard } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/events', label: 'Events' },
  { path: '/resources', label: 'Resources' },
  { path: '/dsa', label: 'DSA' },
  { path: '/collaborate', label: 'Collaborate' },
  { path: '/ai', label: 'AI Assistant' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isLoggedIn, coordinator, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a1020]/95 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#00ff9c]/10 border border-[#00ff9c]/30 flex items-center justify-center group-hover:bg-[#00ff9c]/20 transition-all">
              <Code2 size={18} color="#00ff9c" />
            </div>
            <div>
              <span className="font-bold text-white font-mono text-sm">GFG</span>
              <span className="text-[#00ff9c] font-bold font-mono text-sm">·RIT</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === path
                    ? 'text-[#00ff9c] bg-[#00ff9c]/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#38bdf8] hover:bg-[#38bdf8]/10 transition-all">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <span className="text-xs text-slate-500">{coordinator?.name}</span>
                <button onClick={logout} className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all">
                  <LogOut size={14} />
                </button>
              </>
            ) : (
              <Link to="/dashboard" className="px-4 py-2 rounded-lg text-sm font-semibold btn-primary">
                Coordinator Login
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0a1020]/98 backdrop-blur-md border-t border-white/5 px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === path
                    ? 'text-[#00ff9c] bg-[#00ff9c]/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
            <hr className="border-white/5 my-2" />
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="px-4 py-3 rounded-lg text-sm text-[#38bdf8]">Dashboard</Link>
                <button onClick={logout} className="text-left px-4 py-3 rounded-lg text-sm text-red-400">Logout</button>
              </>
            ) : (
              <Link to="/dashboard" className="px-4 py-3 rounded-lg text-sm font-semibold text-[#00ff9c] bg-[#00ff9c]/10">
                Coordinator Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
