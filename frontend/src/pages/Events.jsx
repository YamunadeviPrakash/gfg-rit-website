import { useEffect, useState } from 'react'
import axios from 'axios'
import { Calendar, Trophy, ExternalLink, Clock, CheckCircle, Loader } from 'lucide-react'

function EventCard({ event, type }) {
  const typeConfig = {
    past: { color: '#64748b', bg: '#64748b15', label: 'Past', icon: CheckCircle },
    current: { color: '#00ff9c', bg: '#00ff9c15', label: 'Registration Open', icon: Clock },
    upcoming: { color: '#38bdf8', bg: '#38bdf815', label: 'Upcoming', icon: Calendar },
  }
  const config = typeConfig[type] || typeConfig.upcoming

  return (
    <div className="card-hover bg-[#1e293b] rounded-xl overflow-hidden">
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${config.color}, transparent)` }} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-white text-lg leading-tight">{event.title}</h3>
          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-medium"
            style={{ background: config.bg, color: config.color, border: `1px solid ${config.color}30` }}>
            {config.label}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <Calendar size={12} />
          {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>

        <p className="text-sm text-slate-400 leading-relaxed mb-4">{event.description}</p>

        {event.winner && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-4"
            style={{ background: '#fbbf2410', border: '1px solid #fbbf2420' }}>
            <Trophy size={14} color="#fbbf24" />
            <span className="text-[#fbbf24] font-medium">Winner:</span>
            <span className="text-slate-300">{event.winner}</span>
          </div>
        )}

        {event.registration_link && type === 'current' && (
          <a href={event.registration_link} target="_blank" rel="noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-sm py-2 px-4">
            Register Now
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  )
}

export default function Events() {
  const [events, setEvents] = useState({ past: [], current: [], upcoming: [] })
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('current')

  useEffect(() => {
    axios.get('/api/events').then(res => {
      const data = res.data
      setEvents({
        past: data.filter(e => e.type === 'past'),
        current: data.filter(e => e.type === 'current'),
        upcoming: data.filter(e => e.type === 'upcoming'),
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const tabs = [
    { key: 'current', label: 'Current Events', color: '#00ff9c', count: events.current.length },
    { key: 'upcoming', label: 'Upcoming', color: '#38bdf8', count: events.upcoming.length },
    { key: 'past', label: 'Past Events', color: '#64748b', count: events.past.length },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-mono rounded-full mb-4"
            style={{ background: '#38bdf810', border: '1px solid #38bdf830', color: '#38bdf8' }}>
            Events
          </span>
          <h1 className="text-4xl font-black text-white mb-3">Club Events</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            From hackathons to workshops – stay in the loop with everything happening at GFG RIT
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 rounded-xl w-fit mx-auto"
          style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.05)' }}>
          {tabs.map(({ key, label, color, count }) => (
            <button key={key} onClick={() => setTab(key)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
              style={tab === key
                ? { background: `${color}15`, color, border: `1px solid ${color}30` }
                : { color: '#64748b', border: '1px solid transparent' }
              }>
              {label}
              <span className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: tab === key ? `${color}25` : '#ffffff10', color: tab === key ? color : '#475569' }}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="loader" />
          </div>
        ) : (
          <div>
            {events[tab].length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <Calendar size={40} className="mx-auto mb-3 opacity-30" />
                <p>No {tab} events at the moment.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {events[tab].map(event => (
                  <EventCard key={event.id} event={event} type={tab} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
