import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Users, Calendar, Code, TrendingUp, Github, Linkedin, ExternalLink, ChevronRight, Terminal, Zap, BookOpen, MessageSquare } from 'lucide-react'

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 1800
        const step = target / (duration / 16)
        const timer = setInterval(() => {
          start += step
          if (start >= target) {
            setCount(target)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function MemberCard({ member }) {
  const initials = member.name.split(' ').map(n => n[0]).join('')
  const colors = ['#00ff9c', '#38bdf8', '#a78bfa', '#fb923c', '#f472b6']
  const color = colors[member.id % colors.length]

  return (
    <div className="card-hover bg-[#1e293b] rounded-xl p-5 flex flex-col items-center text-center gap-3">
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold font-mono"
        style={{ background: `${color}15`, border: `2px solid ${color}40`, color }}>
        {initials}
      </div>
      <div>
        <p className="font-semibold text-white">{member.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">{member.role}</p>
        {member.is_coordinator === 1 && (
          <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full" style={{ background: '#00ff9c15', color: '#00ff9c' }}>
            Coordinator
          </span>
        )}
      </div>
      <div className="flex gap-2 mt-1">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noreferrer"
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#38bdf8]/10 hover:text-[#38bdf8] text-slate-400 transition-all">
            <Linkedin size={14} />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noreferrer"
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#00ff9c]/10 hover:text-[#00ff9c] text-slate-400 transition-all">
            <Github size={14} />
          </a>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const [stats, setStats] = useState({ members: 120, events: 24, problems_solved: 1247, active_learners: 89 })
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get('/api/stats').catch(() => ({ data: stats })),
      axios.get('/api/members').catch(() => ({ data: [] }))
    ]).then(([s, m]) => {
      setStats(s.data)
      setMembers(m.data)
      setLoading(false)
    })
  }, [])

  const codeSnippet = `// Welcome to GFG Campus Club – RIT
function joinClub(student) {
  const skills = ['DSA', 'CP', 'Web Dev'];
  return {
    ...student,
    community: 'GFG_RIT',
    skills,
    growth: Infinity
  };
}`

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center grid-bg overflow-hidden">
        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #00ff9c, transparent)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #38bdf8, transparent)', animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6"
              style={{ background: '#00ff9c10', border: '1px solid #00ff9c30', color: '#00ff9c' }}>
              <span className="w-2 h-2 rounded-full bg-[#00ff9c] animate-pulse" />
              GeeksforGeeks Campus Club
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4">
              <span className="text-white">GFG Campus</span>
              <br />
              <span className="text-glow" style={{ color: '#00ff9c' }}>Club – RIT</span>
            </h1>

            <p className="text-2xl font-mono text-slate-400 mb-3">
              <span className="text-[#38bdf8]">Code</span>
              <span className="text-slate-600 mx-2">·</span>
              <span className="text-[#a78bfa]">Learn</span>
              <span className="text-slate-600 mx-2">·</span>
              <span className="text-[#00ff9c]">Grow</span>
            </p>

            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
              Join RIT's very own coding community. Master DSA, compete in hackathons, 
              and build real projects with like-minded peers.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="https://chat.whatsapp.com/HZjaf6LCpEPCvgiJkdQxi8" target="_blank" rel="noreferrer"
                className="btn-primary flex items-center gap-2 text-sm">
                <MessageSquare size={16} />
                Join Community
              </a>
              <Link to="/events" className="btn-outline flex items-center gap-2 text-sm">
                <Calendar size={16} />
                View Events
              </Link>
              <Link to="/dsa" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-[#38bdf8] border border-white/10 hover:border-[#38bdf8]/30 transition-all">
                <Code size={16} />
                Practice DSA
              </Link>
              <Link to="/resources" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-[#a78bfa] border border-white/10 hover:border-[#a78bfa]/30 transition-all">
                <BookOpen size={16} />
                Resources
              </Link>
            </div>
          </div>

          {/* Right - Code terminal */}
          <div className="hidden lg:block">
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl animate-float">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1e293b]">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-mono text-slate-500">gfg_rit.js</span>
              </div>
              <div className="bg-[#0d1b2a] p-6">
                <pre className="text-sm leading-relaxed border-none bg-transparent p-0">
                  <code>
                    {codeSnippet.split('\n').map((line, i) => {
                      let colored = line
                        .replace(/(\/\/.*)/g, '<span style="color:#475569">$1</span>')
                        .replace(/\b(function|return|const)\b/g, '<span style="color:#c678dd">$1</span>')
                        .replace(/\b(student|skills|community|growth)\b/g, '<span style="color:#e06c75">$1</span>')
                        .replace(/('.*?'|`.*?`)/g, '<span style="color:#98c379">$1</span>')
                        .replace(/\b(Infinity)\b/g, '<span style="color:#d19a66">$1</span>')
                        .replace(/(\[|\]|\{|\})/g, '<span style="color:#abb2bf">$1</span>')
                      return (
                        <div key={i} className="flex">
                          <span className="text-slate-600 mr-4 select-none text-right w-4">{i + 1}</span>
                          <span dangerouslySetInnerHTML={{ __html: colored }} />
                        </div>
                      )
                    })}
                  </code>
                </pre>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                  <Terminal size={12} color="#00ff9c" />
                  <span className="text-xs font-mono text-[#00ff9c]">$ node gfg_rit.js</span>
                  <span className="w-2 h-4 bg-[#00ff9c] animate-pulse ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/5 bg-[#0a1020]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Club Members', value: stats.members, suffix: '+', color: '#00ff9c' },
              { icon: Calendar, label: 'Events Conducted', value: stats.events, suffix: '+', color: '#38bdf8' },
              { icon: Code, label: 'Problems Solved', value: stats.problems_solved, suffix: '+', color: '#a78bfa' },
              { icon: TrendingUp, label: 'Active Learners', value: stats.active_learners, suffix: '+', color: '#fb923c' },
            ].map(({ icon: Icon, label, value, suffix, color }) => (
              <div key={label} className="card-hover bg-[#1e293b] rounded-xl p-6 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <Icon size={22} color={color} />
                </div>
                <p className="text-3xl font-black font-mono" style={{ color }}>
                  <AnimatedCounter target={value} suffix={suffix} />
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Why Join GFG RIT?</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Everything you need to level up your coding skills</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code, title: 'DSA Mastery', desc: 'Structured learning path from basics to advanced algorithms with daily practice problems.', color: '#00ff9c', link: '/dsa' },
              { icon: Calendar, title: 'Regular Events', desc: 'Hackathons, workshops, coding competitions, and webinars every month.', color: '#38bdf8', link: '/events' },
              { icon: Zap, title: 'AI Coding Assistant', desc: 'Get instant explanations for coding concepts with our AI-powered chatbot.', color: '#a78bfa', link: '/ai' },
              { icon: Users, title: 'Community', desc: 'Connect with 100+ like-minded coders and experienced seniors from RIT.', color: '#fb923c', link: '/' },
              { icon: BookOpen, title: 'Learning Resources', desc: 'Curated DSA resources, coding platforms, and beginner learning paths.', color: '#f472b6', link: '/resources' },
              { icon: TrendingUp, title: 'Career Growth', desc: 'Interview prep, resume reviews, and placement support from our alumni network.', color: '#34d399', link: '/about' },
            ].map(({ icon: Icon, title, desc, color, link }) => (
              <Link key={title} to={link} className="card-hover bg-[#1e293b] rounded-xl p-6 flex flex-col gap-3 group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon size={20} color={color} />
                </div>
                <h3 className="font-semibold text-white group-hover:text-[#00ff9c] transition-colors">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1 text-xs mt-auto" style={{ color }}>
                  Learn more <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#0a1020]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Meet the Team</h2>
            <p className="text-slate-400">The people behind GFG Campus Club – RIT</p>
          </div>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="loader" />
            </div>
          ) : (
            <>
              {/* Coordinators */}
              <div className="mb-8">
                <h3 className="text-sm font-mono text-[#00ff9c] uppercase tracking-widest mb-4">// Coordinators</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {members.filter(m => m.is_coordinator).map(m => <MemberCard key={m.id} member={m} />)}
                </div>
              </div>
              {/* Members */}
              {members.filter(m => !m.is_coordinator).length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-[#38bdf8] uppercase tracking-widest mb-4">// Members</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {members.filter(m => !m.is_coordinator).map(m => <MemberCard key={m.id} member={m} />)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="rounded-2xl p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1e293b, #0f2040)', border: '1px solid rgba(0,255,156,0.2)' }}>
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl"
              style={{ background: '#00ff9c' }} />
            <h2 className="text-3xl font-bold text-white mb-3 relative">Ready to Start Coding?</h2>
            <p className="text-slate-400 mb-6 relative">Join our WhatsApp community and never miss an event, workshop, or opportunity.</p>
            <div className="flex flex-wrap gap-3 justify-center relative">
              <a href="https://chat.whatsapp.com/HZjaf6LCpEPCvgiJkdQxi8" target="_blank" rel="noreferrer"
                className="btn-primary flex items-center gap-2">
                <MessageSquare size={18} />
                Join WhatsApp Group
              </a>
              <Link to="/events" className="btn-outline flex items-center gap-2">
                <ExternalLink size={16} />
                View Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
