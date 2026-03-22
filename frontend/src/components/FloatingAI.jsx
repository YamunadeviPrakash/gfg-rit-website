import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import AIAssistant from "../pages/AIAssistant"

export default function FloatingAI() {
    const [open, setOpen] = useState(false)
    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-[0_0_15px_#00ff9c55] hover:scale-105"
                style={{
                    background: "linear-gradient(135deg,#00ff9c,#00d47e)"
                }}
            >
                {open ? <X color="#022c22" size={18}/> : <MessageCircle color="#022c22" size={18}/>}
            </button>
            {/* Chat Window */}
            {open && (
                <div
                    className="fixed bottom-24 right-6 w-[580px] max-w-[90vw] z-50 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    style={{ background: "#020617" }}
                >
                    <AIAssistant />
                </div>
            )}
        </>
    )
}