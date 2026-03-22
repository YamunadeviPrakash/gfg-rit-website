import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Resources from './pages/Resources'
import DSAProblems from './pages/DSAProblems'
import AIAssistant from './pages/AIAssistant'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Collaborate from "./pages/Collaborate"
import FloatingAI from "./components/FloatingAI"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col" style={{ background: '#0f172a' }}>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/dsa" element={<DSAProblems />} />
              <Route path="/ai" element={<AIAssistant />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/collaborate" element={<Collaborate />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <FloatingAI />
      </BrowserRouter>
    </AuthProvider>
  )
}
