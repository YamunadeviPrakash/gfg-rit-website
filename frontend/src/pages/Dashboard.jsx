import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { LogIn, Plus, Edit2, Trash2, Save, X, LayoutDashboard, Calendar, Eye, LogOut, AlertCircle, CheckCircle } from 'lucide-react'

// ─── LOGIN FORM ────────────────────────────────────
function LoginForm() {
  const [creds, setCreds] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('/api/login', creds)
      if (res.data.success) {
        login(res.data.coordinator)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#00ff9c]/10 border border-[#00ff9c]/30 flex items-center justify-center mx-auto mb-4">
            <LogIn size={24} color="#00ff9c" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Coordinator Login</h1>
          <p className="text-slate-400 text-sm">Access the event management dashboard</p>
        </div>

        <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-4"
              style={{ background: '#f8717110', border: '1px solid #f8717130' }}>
              <AlertCircle size={16} color="#f87171" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Username</label>
              <input
                type="text"
                value={creds.username}
                onChange={e => setCreds({ ...creds, username: e.target.value })}
                placeholder="Enter username"
                className="w-full bg-[#0d1520] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 border border-white/5 focus:border-[#00ff9c]/40 focus:outline-none transition-colors"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Password</label>
              <input
                type="password"
                value={creds.password}
                onChange={e => setCreds({ ...creds, password: e.target.value })}
                placeholder="Enter password"
                className="w-full bg-[#0d1520] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 border border-white/5 focus:border-[#00ff9c]/40 focus:outline-none transition-colors"
                required
              />
            </div>
            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0f172a]/40 border-t-[#0f172a] rounded-full animate-spin" />
              ) : (
                <><LogIn size={16} /> Login</>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 rounded-xl bg-[#0d1520] border border-white/5">
            <p className="text-xs text-slate-500 font-mono">Demo credentials:</p>
            <p className="text-xs text-slate-400 font-mono">admin / admin123</p>
            <p className="text-xs text-slate-400 font-mono">coord1 / coord123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── EVENT FORM ────────────────────────────────────
const EMPTY_EVENT = { title: '', description: '', date: '', type: 'upcoming', winner: '', registration_link: '' }

function EventForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_EVENT)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    await onSave(form)
    setSaving(false)
  }

  const field = (label, key, type = 'text', placeholder = '') => (
    <div>
      <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full bg-[#0d1520] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 border border-white/5 focus:border-[#00ff9c]/40 focus:outline-none transition-colors"
        required={['title', 'description', 'date'].includes(key)}
      />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="bg-[#1e293b] rounded-xl p-6 border border-[#00ff9c]/20">
      <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
        <Plus size={16} color="#00ff9c" />
        {initial?.id ? 'Edit Event' : 'Create New Event'}
      </h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {field('Event Title', 'title', 'text', 'e.g. Hackathon 2025')}
        {field('Date', 'date', 'date')}
      </div>
      <div className="mb-4">
        <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Description</label>
        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Describe the event..."
          rows={3}
          className="w-full bg-[#0d1520] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 border border-white/5 focus:border-[#00ff9c]/40 focus:outline-none transition-colors resize-none"
          required
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Type</label>
          <select
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            className="w-full bg-[#0d1520] rounded-xl px-4 py-3 text-sm text-white border border-white/5 focus:border-[#00ff9c]/40 focus:outline-none transition-colors">
            <option value="upcoming">Upcoming</option>
            <option value="current">Current (Open)</option>
            <option value="past">Past</option>
          </select>
        </div>
        {field('Winner (optional)', 'winner', 'text', 'e.g. Team ByteForce')}
        {field('Registration Link', 'registration_link', 'url', 'https://...')}
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving}
          className="btn-primary flex items-center gap-2 text-sm py-2 px-4">
          {saving ? <div className="w-4 h-4 border-2 border-[#0f172a]/40 border-t-[#0f172a] rounded-full animate-spin" /> : <Save size={14} />}
          {initial?.id ? 'Save Changes' : 'Create Event'}
        </button>
        <button type="button" onClick={onCancel}
          className="btn-outline flex items-center gap-2 text-sm py-2 px-4">
          <X size={14} /> Cancel
        </button>
      </div>
    </form>
  )
}

// ─── DASHBOARD ─────────────────────────────────────
function DashboardMain() {
  const { coordinator, logout } = useAuth()
  const [events, setEvents] = useState([])
  const [feedback, setFeedback] = useState({})
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [toast, setToast] = useState(null)
  const [tab, setTab] = useState('all')

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const fetchEvents = () => {
    axios.get('/api/events').then(res => {
      setEvents(res.data)
      setLoading(false)
    })
  }

  useEffect(() => { fetchEvents() }, [])

  const handleCreate = async (form) => {
    try {
      await axios.post('/api/events', form)
      fetchEvents()
      setShowForm(false)
      showToast('Event created successfully!')
    } catch {
      showToast('Failed to create event', 'error')
    }
  }

  const fetchFeedback = async (eventId) => {
    const res = await axios.get(
      `/api/events/${eventId}/feedback`
    )
    setFeedback(prev => ({
      ...prev,
      [eventId]: res.data
    }))

  }

  const handleUpdate = async (form) => {
    try {
      await axios.put(`/api/events/${editing.id}`, form)
      fetchEvents()
      setEditing(null)
      showToast('Event updated!')
    } catch {
      showToast('Failed to update event', 'error')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return
    try {
      await axios.delete(`/api/events/${id}`)
      fetchEvents()
      showToast('Event deleted')
    } catch {
      showToast('Failed to delete', 'error')
    }
  }

  const typeColor = { past: '#64748b', current: '#00ff9c', upcoming: '#38bdf8' }
  const filtered = tab === 'all' ? events : events.filter(e => e.type === tab)

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Toast */}
        {toast && (
          <div className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl transition-all ${toast.type === 'error'
              ? 'bg-red-900/90 border border-red-500/30 text-red-300'
              : 'bg-[#1e293b] border border-[#00ff9c]/30 text-[#00ff9c]'
            }`}>
            {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            <span className="text-sm">{toast.msg}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard size={20} color="#00ff9c" />
              <h1 className="text-2xl font-bold text-white">Coordinator Dashboard</h1>
            </div>
            <p className="text-slate-400 text-sm">
              Logged in as <span className="text-[#00ff9c]">{coordinator?.name}</span>
              <span className="text-slate-600 mx-1">·</span>
              <span className="text-slate-500">{coordinator?.role}</span>
            </p>
          </div>
          <button onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all">
            <LogOut size={15} />
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Events', value: events.length, color: '#00ff9c' },
            { label: 'Active Events', value: events.filter(e => e.type === 'current').length, color: '#38bdf8' },
            { label: 'Upcoming', value: events.filter(e => e.type === 'upcoming').length, color: '#a78bfa' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#1e293b] rounded-xl p-4 text-center border border-white/5">
              <p className="text-2xl font-black font-mono" style={{ color }}>{value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Add Event Button */}
        {!showForm && !editing && (
          <button onClick={() => setShowForm(true)}
            className="btn-primary flex items-center gap-2 text-sm mb-6">
            <Plus size={16} />
            Add New Event
          </button>
        )}

        {/* Create Form */}
        {showForm && (
          <div className="mb-6">
            <EventForm onSave={handleCreate} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {/* Edit Form */}
        {editing && (
          <div className="mb-6">
            <EventForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />
          </div>
        )}

        {/* Event List */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar size={18} color="#38bdf8" /> Manage Events
            </h2>
            <div className="flex gap-1 bg-[#0d1520] rounded-lg p-1 border border-white/5">
              {['all', 'current', 'upcoming', 'past'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className="px-3 py-1.5 rounded-md text-xs capitalize transition-all"
                  style={tab === t ? { background: '#1e293b', color: '#00ff9c' } : { color: '#64748b' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><div className="loader" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 text-slate-500">No events found.</div>
          ) : (
            <div className="space-y-3">
              {filtered.map(event => (
                <div key={event.id} className="bg-[#1e293b] rounded-xl p-5 flex items-start gap-4 border border-white/5 hover:border-white/10 transition-all">
                  <div className="shrink-0 w-2 h-2 rounded-full mt-2.5"
                    style={{ background: typeColor[event.type] || '#64748b' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-white">{event.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize font-medium"
                        style={{
                          background: `${typeColor[event.type]}15`,
                          color: typeColor[event.type],
                          border: `1px solid ${typeColor[event.type]}30`
                        }}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-1">{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p className="text-sm text-slate-400 truncate">{event.description}</p>
                    {event.type === "past" && (
                      <div className="mt-3">
                        <button
                          onClick={() => fetchFeedback(event.id)}
                          className="text-xs text-[#38bdf8] flex items-center gap-1 hover:text-[#00ff9c] transition"
                        >
                          💬 View Feedback
                          {feedback[event.id]?.length > 0 && (
                            <span className="ml-1 text-slate-400">
                              ({feedback[event.id].length})
                            </span>
                          )}
                        </button>
                        {feedback[event.id]?.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {feedback[event.id].map(f => (
                              <div
                                key={f.id}
                                className="bg-[#020617] border border-white/10 p-2 rounded text-sm text-slate-300"
                              >
                                {f.message}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => { setEditing(event); setShowForm(false) }}
                      className="w-8 h-8 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center hover:bg-[#38bdf8]/20 text-[#38bdf8] transition-all">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(event.id)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 text-red-400 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── EXPORT ────────────────────────────────────────
export default function Dashboard() {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <DashboardMain /> : <LoginForm />
}
