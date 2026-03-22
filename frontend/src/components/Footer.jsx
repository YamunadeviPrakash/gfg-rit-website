import { Link } from 'react-router-dom'
import { Code2, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a1020] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#00ff9c]/10 border border-[#00ff9c]/30 flex items-center justify-center">
                <Code2 size={20} color="#00ff9c" />
              </div>
              <div>
                <span className="font-bold text-white font-mono">GFG Campus Club</span>
                <span className="text-[#00ff9c] font-bold font-mono"> – RIT</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering RIT students to code, learn, and grow through community-driven 
              programming activities and events.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#00ff9c]/10 hover:text-[#00ff9c] text-slate-400 transition-all">
                <Github size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#38bdf8]/10 hover:text-[#38bdf8] text-slate-400 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="mailto:gfgclub@rit.edu"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#00ff9c]/10 hover:text-[#00ff9c] text-slate-400 transition-all">
                <Mail size={16} />
              </a>
              <a href="https://chat.whatsapp.com/HZjaf6LCpEPCvgiJkdQxi8" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-green-500/10 hover:text-green-400 text-slate-400 transition-all">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/about', 'About'], ['/events', 'Events'], ['/resources', 'Resources']].map(([path, label]) => (
                <li key={path}>
                  <Link to={path} className="text-slate-400 hover:text-[#00ff9c] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              {[
                ['/dsa', 'Daily DSA'],
                ['/ai', 'AI Assistant'],
                ['/contact', 'Contact'],
                ['https://geeksforgeeks.org', 'GeeksforGeeks ↗'],
              ].map(([path, label]) => (
                <li key={path}>
                  {path.startsWith('http') ? (
                    <a href={path} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#00ff9c] text-sm transition-colors">{label}</a>
                  ) : (
                    <Link to={path} className="text-slate-400 hover:text-[#00ff9c] text-sm transition-colors">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 GFG Campus Club – RIT. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-mono">
            Built with <span className="text-[#00ff9c]">{'<Code />'}</span> & ☕
          </p>
        </div>
      </div>
    </footer>
  )
}
