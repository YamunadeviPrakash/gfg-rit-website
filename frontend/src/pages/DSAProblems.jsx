import { useEffect, useState } from 'react'
import axios from 'axios'
import { ExternalLink, Calendar, Zap, ChevronRight } from 'lucide-react'

function DifficultyBadge({ level }) {
  const cfg = {
    Easy: { className: 'badge-easy', bg: 'rgba(74,222,128,0.1)', color: '#4ade80' },
    Medium: { className: 'badge-medium', bg: 'rgba(251,191,36,0.1)', color: '#fbbf24' },
    Hard: { className: 'badge-hard', bg: 'rgba(248,113,113,0.1)', color: '#f87171' },
  }[level] || {}

  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
      {level}
    </span>
  )
}

export default function DSAProblems() {
  const [todayProblem, setTodayProblem] = useState(null)
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get('/api/problems/today').catch(() => ({ data: null })),
      axios.get('/api/problems').catch(() => ({ data: [] }))
    ]).then(([t, p]) => {
      setTodayProblem(t.data)
      setProblems(p.data.filter(pr => !pr.is_today))
      setLoading(false)
    })
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader" />
    </div>
  )

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-mono rounded-full mb-4"
            style={{ background: '#00ff9c10', border: '1px solid #00ff9c30', color: '#00ff9c' }}>
            Daily Practice
          </span>
          <h1 className="text-4xl font-black text-white mb-3">DSA Problem of the Day</h1>
          <p className="text-slate-400">Solve one problem every day to build consistency</p>
        </div>

        {/* Today's Problem */}
        {todayProblem && (
          <div className="rounded-2xl p-8 mb-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1e293b, #0f2040)', border: '1px solid rgba(0,255,156,0.25)' }}>
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-15 blur-2xl"
              style={{ background: '#00ff9c' }} />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-full animate-pulse"
                  style={{ background: '#00ff9c15', border: '1px solid #00ff9c40', color: '#00ff9c' }}>
                  <Zap size={10} fill="#00ff9c" />
                  Today's Problem
                </span>
                <DifficultyBadge level={todayProblem.difficulty} />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">{todayProblem.title}</h2>

              <div className="bg-[#0d1b2a] rounded-xl p-5 mb-6 border border-white/5">
                <p className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-2">Problem Statement</p>
                <p className="text-slate-300 leading-relaxed">{todayProblem.description}</p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a href={todayProblem.practice_link} target="_blank" rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-sm">
                  Solve Now
                  <ExternalLink size={14} />
                </a>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Calendar size={14} />
                  {new Date(todayProblem.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Previous Problems */}
        <div>
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <span className="text-slate-500 font-mono text-sm">//</span>
            Previous Problems
          </h2>
          <div className="space-y-3">
            {problems.map(problem => (
              <div key={problem.id} className="card-hover bg-[#1e293b] rounded-xl p-5 flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[#0d1b2a] flex items-center justify-center text-xs font-mono text-slate-500">
                  {new Date(problem.date).getDate()}
                  <span className="text-[8px] block">
                    {new Date(problem.date).toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="font-semibold text-white">{problem.title}</h3>
                    <DifficultyBadge level={problem.difficulty} />
                  </div>
                  <p className="text-sm text-slate-400 truncate">{problem.description}</p>
                </div>
                <a href={problem.practice_link} target="_blank" rel="noreferrer"
                  className="shrink-0 w-9 h-9 rounded-lg bg-[#0d1b2a] flex items-center justify-center hover:bg-[#00ff9c]/10 hover:text-[#00ff9c] text-slate-500 transition-all">
                  <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
