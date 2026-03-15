import { useState } from 'react'
import axios from 'axios'
import { Mail, MessageCircle, Github, Linkedin, Send, CheckCircle, MapPin } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 4000)
    }
  }

  const socials = [
    { icon: Mail, label: 'Email', value: 'gfgclub@rit.edu', href: 'mailto:gfgclub@rit.edu', color: '#00ff9c' },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Join our community', href: 'https://chat.whatsapp.com/HZjaf6LCpEPCvgiJkdQxi8', color: '#25D366' },
    { icon: Github, label: 'GitHub', value: 'github.com/gfg-rit', href: 'https://github.com', color: '#e2e8f0' },
    { icon: Linkedin, label: 'LinkedIn', value: 'GFG Campus Club RIT', href: 'https://linkedin.com', color: '#38bdf8' },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-mono rounded-full mb-4"
            style={{ background: '#38bdf810', border: '1px solid #38bdf830', color: '#38bdf8' }}>
            Contact
          </span>
          <h1 className="text-4xl font-black text-white mb-3">Get In Touch</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Have a question, suggestion, or want to collaborate? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Contact Information</h2>
            <div className="space-y-4 mb-8">
              {socials.map(({ icon: Icon, label, value, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="card-hover bg-[#1e293b] rounded-xl p-4 flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-white group-hover:text-[#00ff9c] transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-[#1e293b] rounded-xl p-5 border border-white/5">
              <div className="flex items-start gap-3">
                <MapPin size={18} color="#a78bfa" className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-1">Find Us</p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Rajalakshmi Institute of Technology,<br />
                    Poonamalli, Chennai – 600124,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/5">
            <h2 className="text-lg font-bold text-white mb-6">Send a Message</h2>

            {status === 'success' && (
              <div className="flex items-center gap-3 p-4 rounded-xl mb-5"
                style={{ background: '#00ff9c10', border: '1px solid #00ff9c30' }}>
                <CheckCircle size={18} color="#00ff9c" />
                <p className="text-sm text-[#00ff9c]">Message sent! We'll get back to you soon.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-xl mb-5" style={{ background: '#f8717110', border: '1px solid #f8717130' }}>
                <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full bg-[#0d1520] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 border border-white/5 focus:border-[#00ff9c]/40 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-[#0d1520] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 border border-white/5 focus:border-[#00ff9c]/40 focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="What's on your mind?"
                  rows={5}
                  className="w-full bg-[#0d1520] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 border border-white/5 focus:border-[#00ff9c]/40 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
              <button type="submit" disabled={status === 'sending'}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50">
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0f172a]/40 border-t-[#0f172a] rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
