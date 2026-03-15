import { ExternalLink, BookOpen, Code, Layers, GitBranch, Network, Brain, ChevronRight } from 'lucide-react'

const dsaTopics = [
  { name: "Arrays & Strings", icon: "[]", desc: "Two pointers, sliding window, prefix sums, string manipulation", link: "https://www.geeksforgeeks.org/array-data-structure/", color: "#00ff9c" },
  { name: "Linked Lists", icon: "→", desc: "Singly, doubly, circular – reversal, cycle detection, merge", link: "https://www.geeksforgeeks.org/data-structures/linked-list/", color: "#38bdf8" },
  { name: "Trees & BST", icon: "🌲", desc: "Traversals, height, BST operations, LCA, segment trees", link: "https://www.geeksforgeeks.org/binary-tree-data-structure/", color: "#a78bfa" },
  { name: "Graphs", icon: "◎", desc: "BFS, DFS, Dijkstra, topological sort, MST algorithms", link: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/", color: "#fb923c" },
  { name: "Dynamic Programming", icon: "DP", desc: "Memoization, tabulation, knapsack, LCS, LIS problems", link: "https://www.geeksforgeeks.org/dynamic-programming/", color: "#f472b6" },
  { name: "Sorting & Searching", icon: "⇅", desc: "Merge sort, quicksort, binary search, search patterns", link: "https://www.geeksforgeeks.org/sorting-algorithms/", color: "#34d399" },
]

const platforms = [
  { name: "GeeksforGeeks", desc: "Articles, tutorials, and practice problems for all levels", url: "https://geeksforgeeks.org", color: "#00ff9c", label: "Comprehensive Learning" },
  { name: "LeetCode", desc: "Top interview questions and weekly coding contests", url: "https://leetcode.com", color: "#fbbf24", label: "Interview Prep" },
  { name: "HackerRank", desc: "Skill certifications and domain-based challenges", url: "https://hackerrank.com", color: "#38bdf8", label: "Skill Building" },
  { name: "CodeChef", desc: "Long challenges, cook-offs, and competitive programming", url: "https://codechef.com", color: "#a78bfa", label: "Competitive Programming" },
  { name: "Codeforces", desc: "Regular rated contests for CP enthusiasts", url: "https://codeforces.com", color: "#fb923c", label: "CP Contests" },
  { name: "AtCoder", desc: "High-quality algorithmic programming contests", url: "https://atcoder.jp", color: "#f472b6", label: "Algorithm Focus" },
]

const learningPaths = [
  {
    title: "🟢 Beginner Path",
    duration: "8–12 weeks",
    color: "#00ff9c",
    steps: [
      "Week 1–2: Learn a programming language (Python/Java/C++)",
      "Week 3–4: Arrays, Strings, Time & Space Complexity",
      "Week 5–6: Recursion, Searching, Sorting",
      "Week 7–8: Linked Lists, Stacks, Queues",
      "Week 9–12: Trees, Hashing, solve 100 easy problems on LeetCode",
    ]
  },
  {
    title: "🟡 Intermediate Path",
    duration: "12–16 weeks",
    color: "#fbbf24",
    steps: [
      "Week 1–3: Advanced Trees (BST, AVL, Trie, Segment Tree)",
      "Week 4–6: Graphs (BFS, DFS, Dijkstra, Bellman-Ford)",
      "Week 7–10: Dynamic Programming (all classic problems)",
      "Week 11–13: Greedy, Backtracking, Divide & Conquer",
      "Week 14–16: Solve 100 medium LeetCode + Codeforces Div 2",
    ]
  },
  {
    title: "🔴 Advanced Path",
    duration: "12+ weeks",
    color: "#f87171",
    steps: [
      "Advanced DP (Bitmask, DP on Trees, Digit DP)",
      "Advanced Graphs (SCC, Bridges, Articulation Points)",
      "Segment Trees with lazy propagation, Fenwick Trees",
      "Competitive Programming: CF Div 1, ICPC prep",
      "System Design basics for interviews",
    ]
  },
]

export default function Resources() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-mono rounded-full mb-4"
            style={{ background: '#a78bfa10', border: '1px solid #a78bfa30', color: '#a78bfa' }}>
            Learning Resources
          </span>
          <h1 className="text-4xl font-black text-white mb-3">DSA & Coding Resources</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything you need to master Data Structures, Algorithms, and Competitive Programming
          </p>
        </div>

        {/* DSA Topics */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Code size={20} color="#00ff9c" />
            <h2 className="text-xl font-bold text-white">DSA Topics</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dsaTopics.map(({ name, icon, desc, link, color }) => (
              <a key={name} href={link} target="_blank" rel="noreferrer"
                className="card-hover bg-[#1e293b] rounded-xl p-5 flex flex-col gap-3 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono"
                    style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}>
                    {icon}
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-[#00ff9c] transition-colors">{name}</h3>
                </div>
                <p className="text-sm text-slate-400">{desc}</p>
                <div className="flex items-center gap-1 text-xs" style={{ color }}>
                  Study on GFG <ExternalLink size={10} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Platforms */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <Layers size={20} color="#38bdf8" />
            <h2 className="text-xl font-bold text-white">Coding Platforms</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map(({ name, desc, url, color, label }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer"
                className="card-hover bg-[#1e293b] rounded-xl p-5 flex flex-col gap-3 group">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white group-hover:text-[#00ff9c] transition-colors">{name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
                    {label}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{desc}</p>
                <div className="flex items-center gap-1 text-xs mt-auto" style={{ color }}>
                  Visit Platform <ExternalLink size={10} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <GitBranch size={20} color="#a78bfa" />
            <h2 className="text-xl font-bold text-white">Recommended Learning Paths</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {learningPaths.map(({ title, duration, color, steps }) => (
              <div key={title} className="card-hover bg-[#1e293b] rounded-xl overflow-hidden">
                <div className="h-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white">{title}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
                      {duration}
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-mono"
                          style={{ background: `${color}20`, color }}>
                          {i + 1}
                        </div>
                        <span className="text-sm text-slate-400 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
