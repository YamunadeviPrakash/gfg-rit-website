import { Target, Users, Star, BookOpen, Code, Trophy, Rocket, CheckCircle } from 'lucide-react'

export default function About() {
  const mission = [
    { icon: Code, title: "Foster Coding Culture", desc: "Create an environment where students regularly practice coding, discuss algorithms, and help each other grow.", color: "#00ff9c" },
    { icon: BookOpen, title: "Structured Learning", desc: "Provide curated learning paths, workshops, and resources to help students master DSA and competitive programming.", color: "#38bdf8" },
    { icon: Users, title: "Build Community", desc: "Connect passionate coders from across RIT to collaborate, compete, and create together.", color: "#a78bfa" },
    { icon: Trophy, title: "Excel in Competitions", desc: "Prepare students for coding competitions, hackathons, and placement-level interviews.", color: "#fb923c" },
  ]

  const benefits = [
    "Access to curated DSA learning paths from basics to advanced",
    "Weekly coding challenges and competitive programming sessions",
    "Mentorship from seniors with FAANG/top-company experience",
    "Hands-on workshops on web dev, ML, and system design",
    "Hackathon team formation and project collaboration",
    "Interview preparation and mock coding rounds",
    "Exclusive access to our growing resource library",
    "Network with 100+ active coders and alumni",
    "Recognition and awards for top performers",
    "Internship and placement referrals through alumni network",
  ]

  const objectives = [
    { num: "01", title: "Weekly DSA Practice", desc: "Conduct weekly DSA sessions covering all major topics with problem sets and solutions." },
    { num: "02", title: "Monthly Contests", desc: "Organize intra-college coding contests to foster competitive spirit among members." },
    { num: "03", title: "Industry Workshops", desc: "Invite industry experts for workshops on real-world software development practices." },
    { num: "04", title: "Open Source Projects", desc: "Guide members to contribute to open-source and build portfolio-worthy projects." },
    { num: "05", title: "Placement Prep", desc: "Conduct mock interviews and placement training aligned with top tech companies." },
    { num: "06", title: "Cross-Club Collaboration", desc: "Partner with other technical clubs for interdisciplinary projects and events." },
  ]

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-mono rounded-full mb-4"
            style={{ background: '#00ff9c10', border: '1px solid #00ff9c30', color: '#00ff9c' }}>
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            About GFG Campus Club
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            The official GeeksforGeeks Campus Club at Rajalakshmi Institute of Technology – 
            a student-led community dedicated to building world-class programmers.
          </p>
        </div>

        {/* What is GFG Club */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What is GeeksforGeeks Campus Club?</h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                The <span className="text-[#00ff9c]">GeeksforGeeks Campus Club</span> is an official chapter of the global 
                GeeksforGeeks community, established at Rajalakshmi Institute of Technology to bring together 
                the brightest coding minds on campus.
              </p>
              <p>
                Founded with the vision of making quality computer science education accessible to every 
                RIT student, our club bridges the gap between academic learning and industry requirements.
              </p>
              <p>
                We organize regular coding contests, DSA workshops, hackathons, and webinars – creating 
                a thriving ecosystem for students to learn, compete, and grow together.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Founded", value: "2022" },
              { label: "Active Members", value: "120+" },
              { label: "Events Held", value: "24+" },
              { label: "Problems Solved", value: "1200+" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#1e293b] rounded-xl p-5 border border-white/5">
                <p className="text-2xl font-black font-mono text-[#00ff9c]">{value}</p>
                <p className="text-sm text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Target size={20} color="#00ff9c" />
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mission.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card-hover bg-[#1e293b] rounded-xl p-5 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon size={18} color={color} />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Rocket size={20} color="#38bdf8" />
            <h2 className="text-2xl font-bold text-white">Our Objectives</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {objectives.map(({ num, title, desc }) => (
              <div key={num} className="card-hover bg-[#1e293b] rounded-xl p-6 flex gap-4">
                <span className="text-3xl font-black font-mono text-[#38bdf8]/30 leading-none shrink-0">{num}</span>
                <div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="rounded-2xl p-8 md:p-10"
          style={{ background: 'linear-gradient(135deg, #1e293b, #0f2040)', border: '1px solid rgba(0,255,156,0.15)' }}>
          <div className="flex items-center gap-3 mb-6">
            <Star size={20} color="#00ff9c" />
            <h2 className="text-2xl font-bold text-white">Benefits for Students</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map(benefit => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle size={16} color="#00ff9c" className="shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
