import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { Send, Bot, User, Sparkles, Code2 } from 'lucide-react'

const SUGGESTIONS = [
  "Explain recursion with an example",
  "How does binary search work?",
  "What is dynamic programming?",
  "Explain arrays and common patterns",
  "How do linked lists work?",
  "Explain trees and traversals",
  "Graph algorithms explained",
]

function Message({ msg }) {
  const isBot = msg.role === 'assistant'
  return (
    <div className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
        isBot ? 'bg-[#00ff9c]/10 border border-[#00ff9c]/30' : 'bg-[#38bdf8]/10 border border-[#38bdf8]/30'
      }`}>
        {isBot ? <Bot size={16} color="#00ff9c" /> : <User size={16} color="#38bdf8" />}
      </div>
      <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
        isBot
          ? 'bg-[#1e293b] text-slate-300 border border-white/5'
          : 'text-white border border-[#38bdf8]/20'
      }`}
        style={!isBot ? { background: 'linear-gradient(135deg, #0f2a40, #1e293b)' } : {}}>
        {isBot ? (
          <div className="markdown text-sm leading-relaxed">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm">{msg.content}</p>
        )}
        <p className="text-xs text-slate-600 mt-2">{msg.time}</p>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#00ff9c]/10 border border-[#00ff9c]/30">
        <Bot size={16} color="#00ff9c" />
      </div>
      <div className="bg-[#1e293b] rounded-xl px-4 py-3 border border-white/5 flex items-center gap-1.5">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  )
}

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hello! I'm your **GFG AI Coding Assistant**.\n\nI can help you understand coding concepts like:\n- Recursion, Binary Search, Dynamic Programming\n- Arrays, Linked Lists, Trees, Graphs\n- Algorithm patterns and implementations\n\nTry asking me anything! 🚀",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const q = (text || input).trim()
    if (!q || loading) return
    setInput('')

    const userMsg = {
      role: 'user',
      content: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await axios.post('/api/ai/chat', { question: q })
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I couldn't process that. Please try again!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="pt-24 pb-6 min-h-screen flex flex-col">
      <div className="max-w-3xl mx-auto px-4 w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-3"
            style={{ background: '#a78bfa10', border: '1px solid #a78bfa30', color: '#a78bfa' }}>
            <Sparkles size={12} />
            AI-Powered
          </div>
          <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2 justify-center">
            <Code2 size={28} color="#00ff9c" />
            AI Coding Assistant
          </h1>
          <p className="text-slate-400 text-sm">Ask any coding or DSA concept question</p>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {SUGGESTIONS.slice(0, 4).map(s => (
            <button key={s} onClick={() => sendMessage(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-slate-400 hover:border-[#00ff9c]/40 hover:text-[#00ff9c] transition-all">
              {s}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="flex-1 bg-[#0d1520] rounded-2xl border border-white/5 flex flex-col overflow-hidden"
          style={{ minHeight: '500px', maxHeight: '60vh' }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/5">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask a coding question... (Enter to send)"
                rows={1}
                className="flex-1 bg-[#1e293b] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none border border-white/5 focus:border-[#00ff9c]/30 transition-colors"
                style={{ maxHeight: '120px' }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #00ff9c, #00d47e)' }}>
                <Send size={16} color="#0f172a" />
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2 text-center">
              Try: "recursion", "binary search", "dynamic programming", "arrays", "trees", "graphs"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
