from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import sqlite3
import hashlib
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv
import os
import random

load_dotenv()

app = Flask(__name__)
CORS(app)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def ensure_today_problem():
    today = datetime.now().strftime("%Y-%m-%d")
    conn = get_db()
    existing = conn.execute(
        "SELECT * FROM dsa_problems WHERE date=?",
        (today,)
    ).fetchone()

    if not existing:
        title, difficulty, description, link = random.choice(PROBLEM_POOL)
        conn.execute("""
        INSERT INTO dsa_problems
        (title,difficulty,description,practice_link,date,is_today)
        VALUES (?,?,?,?,?,1)
        """,(title,difficulty,description,link,today))
        conn.execute("UPDATE dsa_problems SET is_today=0 WHERE date != ?",(today,))

    conn.commit()
    
    conn.execute("""
    DELETE FROM dsa_problems
    WHERE id NOT IN (
        SELECT id FROM dsa_problems
        ORDER BY date DESC
        LIMIT 6
    )
    """)

    conn.commit()
    conn.close()


PROBLEM_POOL = [
    ("Two Sum","Easy","Find two numbers that add to target","https://leetcode.com/problems/two-sum/"),
    ("Reverse Linked List","Easy","Reverse a singly linked list","https://leetcode.com/problems/reverse-linked-list/"),
    ("Binary Search","Easy","Find target in sorted array","https://leetcode.com/problems/binary-search/"),
    ("Maximum Subarray","Medium","Find subarray with max sum","https://leetcode.com/problems/maximum-subarray/"),
    ("Merge Intervals","Medium","Merge overlapping intervals","https://leetcode.com/problems/merge-intervals/"),
    ("Climbing Stairs","Easy","Count ways to reach top","https://leetcode.com/problems/climbing-stairs/"),
    ("Longest Substring Without Repeating Characters","Medium","Sliding window problem","https://leetcode.com/problems/longest-substring-without-repeating-characters/"),
    ("Valid Parentheses","Easy","Check balanced parentheses","https://leetcode.com/problems/valid-parentheses/"),
    ("Linked List Cycle","Easy","Detect cycle in linked list","https://leetcode.com/problems/linked-list-cycle/"),
    ("Container With Most Water","Medium","Two pointer optimization","https://leetcode.com/problems/container-with-most-water/")
    ]


def init_db():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS coordinators (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT DEFAULT 'Coordinator'
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            date TEXT NOT NULL,
            type TEXT NOT NULL,
            winner TEXT,
            registration_link TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS dsa_problems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            description TEXT NOT NULL,
            practice_link TEXT NOT NULL,
            date TEXT NOT NULL,
            is_today INTEGER DEFAULT 0
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            linkedin TEXT,
            github TEXT,
            avatar TEXT,
            is_coordinator INTEGER DEFAULT 0
        )
    ''')

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS collaborations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            type TEXT,
            tags TEXT,
            date TEXT
        )
    """)

    # Seed coordinators
    pwd = hashlib.sha256("admin123".encode()).hexdigest()
    cursor.execute("INSERT OR IGNORE INTO coordinators (username, password, name, role) VALUES (?, ?, ?, ?)",
                   ("admin", pwd, "Admin Coordinator", "Club Lead"))
    cursor.execute("INSERT OR IGNORE INTO coordinators (username, password, name, role) VALUES (?, ?, ?, ?)",
                   ("coord1", hashlib.sha256("coord123".encode()).hexdigest(), "Priya Sharma", "Technical Lead"))

    # Seed members
    members_data = [
        ("Arjun Mehta", "Club Lead", "https://linkedin.com", "https://github.com", None, 1),
        ("Priya Sharma", "Technical Lead", "https://linkedin.com", "https://github.com", None, 1),
        ("Rahul Verma", "Event Coordinator", "https://linkedin.com", "https://github.com", None, 1),
        ("Sneha Patel", "Content Lead", "https://linkedin.com", "https://github.com", None, 1),
        ("Kiran Das", "Member", "https://linkedin.com", "https://github.com", None, 0),
        ("Ananya Roy", "Member", "https://linkedin.com", "https://github.com", None, 0),
        ("Dev Kumar", "Member", "https://linkedin.com", "https://github.com", None, 0),
        ("Meera Nair", "Member", "https://linkedin.com", "https://github.com", None, 0),
    ]
    for m in members_data:
        cursor.execute("INSERT OR IGNORE INTO members (name, role, linkedin, github, avatar, is_coordinator) SELECT ?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM members WHERE name=?)",
                       (*m, m[0]))

    # Seed events
    events_data = [
    ("Hackathon 2024","24-hour coding hackathon with 50+ participants.","2024-03-15","past","Team ByteForce",None),
    ("DSA Workshop Series","6-week intensive DSA preparation workshop.","2024-01-20","past",None,None),
    ("CP Bootcamp","Competitive programming bootcamp.","2024-02-10","past","Arjun Mehta",None),
    ("LeetCode Weekly Challenge","Weekly coding challenge.","2026-03-20","current",None,"https://leetcode.com"),
    ("Web Dev Workshop","Full-stack development workshop.","2026-03-25","current",None,"https://forms.google.com"),
    ("Inter-College CodeFest","Annual inter-college coding competition.","2026-04-15","upcoming",None,None),
    ("Open Source Contribution Drive","Contribute to real open-source projects.","2026-04-22","upcoming",None,None)
    ]
    for e in events_data:
        cursor.execute("INSERT OR IGNORE INTO events (title, description, date, type, winner, registration_link) SELECT ?,?,?,?,?,? WHERE NOT EXISTS (SELECT 1 FROM events WHERE title=?)",
                       (*e, e[0]))
    
    conn.commit()
    conn.close()

# ─── AUTH ───────────────────────────────────────────
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = hashlib.sha256(data.get('password', '').encode()).hexdigest()
    conn = get_db()
    coord = conn.execute("SELECT * FROM coordinators WHERE username=? AND password=?", (username, password)).fetchone()
    conn.close()
    if coord:
        return jsonify({"success": True, "coordinator": {"id": coord["id"], "name": coord["name"], "role": coord["role"], "username": coord["username"]}})
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

# ─── STATS ──────────────────────────────────────────
@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db()
    members_count = conn.execute("SELECT COUNT(*) as c FROM members").fetchone()["c"]
    events_count = conn.execute("SELECT COUNT(*) as c FROM events").fetchone()["c"]
    conn.close()
    return jsonify({
        "members": members_count,
        "events": events_count,
        "problems_solved": 1247,
        "active_learners": 89
    })

# ─── MEMBERS ────────────────────────────────────────
@app.route('/api/members', methods=['GET'])
def get_members():
    conn = get_db()
    members = conn.execute("SELECT * FROM members ORDER BY is_coordinator DESC, id ASC").fetchall()
    conn.close()
    return jsonify([dict(m) for m in members])

# ─── EVENTS ─────────────────────────────────────────
@app.route('/api/events', methods=['GET'])
def get_events():
    conn = get_db()
    event_type = request.args.get('type')
    if event_type:
        events = conn.execute("SELECT * FROM events WHERE type=? ORDER BY date DESC", (event_type,)).fetchall()
    else:
        events = conn.execute("SELECT * FROM events ORDER BY date DESC").fetchall()
    conn.close()
    return jsonify([dict(e) for e in events])

@app.route('/api/events', methods=['POST'])
def create_event():
    data = request.json
    conn = get_db()
    conn.execute("INSERT INTO events (title, description, date, type, winner, registration_link) VALUES (?,?,?,?,?,?)",
                 (data['title'], data['description'], data['date'], data['type'], data.get('winner'), data.get('registration_link')))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Event created"})

@app.route('/api/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    data = request.json
    conn = get_db()
    conn.execute("UPDATE events SET title=?, description=?, date=?, type=?, winner=?, registration_link=? WHERE id=?",
                 (data['title'], data['description'], data['date'], data['type'], data.get('winner'), data.get('registration_link'), event_id))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

@app.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    conn = get_db()
    conn.execute("DELETE FROM events WHERE id=?", (event_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# ─── DSA PROBLEMS ────────────────────────────────────

@app.route('/api/problems', methods=['GET'])
def get_problems():
    conn = get_db()
    problems = conn.execute("""
    SELECT * FROM dsa_problems
    WHERE is_today=0
    ORDER BY date DESC
    LIMIT 5
    """).fetchall()
    conn.close()
    return jsonify([dict(p) for p in problems])

@app.route('/api/problems/today', methods=['GET'])
def get_today_problem():
    ensure_today_problem()
    conn = get_db()
    
    problem = conn.execute(
        "SELECT * FROM dsa_problems WHERE is_today=1"
    ).fetchone()

    conn.close()
    return jsonify(dict(problem))

# ─── AI ASSISTANT ────────────────────────────────────
AI_RESPONSES = {
    "recursion": {
        "answer": "**Recursion** is a programming technique where a function calls itself to solve a problem by breaking it into smaller subproblems.\n\n**Key Components:**\n1. **Base Case** – The condition where recursion stops\n2. **Recursive Case** – Where the function calls itself\n\n**Example – Factorial:**\n```python\ndef factorial(n):\n    if n == 0:  # Base case\n        return 1\n    return n * factorial(n - 1)  # Recursive case\n\nprint(factorial(5))  # Output: 120\n```\n\n**How it works:**\n- `factorial(5)` → `5 * factorial(4)` → `5 * 4 * factorial(3)` → ... → `5 * 4 * 3 * 2 * 1 = 120`\n\n**Time Complexity:** O(n) | **Space Complexity:** O(n) due to call stack\n\n💡 **Tip:** Always define a base case to avoid infinite recursion (stack overflow)!"
    },
    "binary search": {
        "answer": "**Binary Search** is an efficient algorithm to find a target in a **sorted array** by repeatedly halving the search space.\n\n**Time Complexity:** O(log n) vs Linear Search O(n)\n\n**Algorithm:**\n```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        \n        if arr[mid] == target:\n            return mid        # Found!\n        elif arr[mid] < target:\n            left = mid + 1    # Search right half\n        else:\n            right = mid - 1   # Search left half\n    \n    return -1  # Not found\n\n# Example\narr = [1, 3, 5, 7, 9, 11, 13]\nprint(binary_search(arr, 7))  # Output: 3\n```\n\n**Visual:**\n```\n[1, 3, 5, 7, 9, 11, 13]  target=7\n         ↑ mid=5, too small\n      [7, 9, 11, 13]\n         ↑ mid=9, too big  \n      [7]\n         ↑ Found! index=3\n```\n\n💡 **Use Case:** Searching in phone books, databases, version control bisect"
    },
    "dynamic programming": {
        "answer": "**Dynamic Programming (DP)** is an optimization technique that solves complex problems by breaking them into overlapping subproblems and storing results to avoid recomputation.\n\n**Two Approaches:**\n\n**1. Top-Down (Memoization):**\n```python\ndef fib_memo(n, memo={}):\n    if n <= 1: return n\n    if n in memo: return memo[n]\n    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)\n    return memo[n]\n```\n\n**2. Bottom-Up (Tabulation):**\n```python\ndef fib_dp(n):\n    if n <= 1: return n\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]\n```\n\n**Classic DP Problems:**\n- 0/1 Knapsack\n- Longest Common Subsequence\n- Coin Change\n- Matrix Chain Multiplication\n\n**When to use DP?**\n✅ Overlapping subproblems\n✅ Optimal substructure\n\n💡 **Tip:** Start with recursion → add memoization → convert to tabulation"
    },
    "arrays": {
        "answer": "**Arrays** are the most fundamental data structure – a collection of elements stored in contiguous memory locations.\n\n**Key Operations & Complexity:**\n| Operation | Time | Space |\n|-----------|------|-------|\n| Access    | O(1) | -     |\n| Search    | O(n) | -     |\n| Insert    | O(n) | O(1)  |\n| Delete    | O(n) | O(1)  |\n\n**Common Patterns:**\n```python\n# Two Pointer\ndef two_sum_sorted(arr, target):\n    l, r = 0, len(arr) - 1\n    while l < r:\n        s = arr[l] + arr[r]\n        if s == target: return [l, r]\n        elif s < target: l += 1\n        else: r -= 1\n\n# Sliding Window\ndef max_sum_subarray(arr, k):\n    window = sum(arr[:k])\n    max_sum = window\n    for i in range(k, len(arr)):\n        window += arr[i] - arr[i-k]\n        max_sum = max(max_sum, window)\n    return max_sum\n```\n\n**Must-Know Patterns:**\n- Two Pointers, Sliding Window, Prefix Sum\n- Kadane's Algorithm (Max Subarray)\n- Dutch National Flag (3-way partition)"
    },
    "linked list": {
        "answer": "**Linked Lists** are linear data structures where elements (nodes) are stored in non-contiguous memory and connected via pointers.\n\n**Node Structure:**\n```python\nclass Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None  # Pointer to next node\n```\n\n**Types:** Singly → Doubly → Circular\n\n**Common Operations:**\n```python\n# Reverse a Linked List (Classic Interview Q)\ndef reverse(head):\n    prev, curr = None, head\n    while curr:\n        next_node = curr.next\n        curr.next = prev\n        prev = curr\n        curr = next_node\n    return prev\n\n# Detect Cycle (Floyd's Algorithm)\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False\n```\n\n**vs Arrays:**\n- ✅ O(1) insert/delete at head\n- ❌ O(n) random access\n- ❌ Extra memory for pointers"
    },
    "trees": {
        "answer": "**Trees** are hierarchical data structures with a root node and subtrees of children.\n\n**Binary Tree Traversals:**\n```python\nclass TreeNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.left = self.right = None\n\n# Inorder: Left → Root → Right\ndef inorder(root):\n    if not root: return []\n    return inorder(root.left) + [root.val] + inorder(root.right)\n\n# Level Order (BFS)\nfrom collections import deque\ndef level_order(root):\n    if not root: return []\n    queue, result = deque([root]), []\n    while queue:\n        level = []\n        for _ in range(len(queue)):\n            node = queue.popleft()\n            level.append(node.val)\n            if node.left: queue.append(node.left)\n            if node.right: queue.append(node.right)\n        result.append(level)\n    return result\n```\n\n**BST Property:** Left < Root < Right\n\n**Key Concepts:**\n- Height, Depth, Diameter\n- Balanced vs Unbalanced\n- AVL Trees, Red-Black Trees\n- Segment Trees, Tries"
    },
    "graphs": {
        "answer": "**Graphs** are non-linear structures consisting of vertices (nodes) connected by edges.\n\n**Representations:**\n```python\n# Adjacency List (most common)\ngraph = {\n    0: [1, 2],\n    1: [0, 3],\n    2: [0, 4],\n    3: [1],\n    4: [2]\n}\n\n# BFS - Shortest path in unweighted graph\nfrom collections import deque\ndef bfs(graph, start):\n    visited, queue = {start}, deque([start])\n    while queue:\n        node = queue.popleft()\n        print(node)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n\n# DFS\ndef dfs(graph, node, visited=set()):\n    visited.add(node)\n    print(node)\n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)\n```\n\n**Key Algorithms:**\n- Dijkstra's (shortest path)\n- Bellman-Ford (negative weights)\n- Floyd-Warshall (all pairs)\n- Kruskal's / Prim's (MST)\n- Topological Sort (DAG)"
    }
}

def get_ai_response(question):
    q = question.lower()

    for keyword, data in AI_RESPONSES.items():
        if keyword in q:
            return data["answer"]

    try:

        prompt = f"""
You are an expert coding mentor for a college programming club.

When answering:
• Explain concepts clearly
• Provide examples
• Include time complexity when relevant
• Use simple language

Question:
{question}
"""

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:
        print("GEMINI ERROR:", e)
        return f"AI Error: {str(e)}"

@app.route('/api/ai/chat', methods=['POST'])
@app.route('/api/ai/chat', methods=['POST'])
def ai_chat():
    try:
        data = request.json
        question = data.get("question")

        response = model.generate_content(question)

        return jsonify({
            "answer": response.text
        })

    except Exception as e:
        print("AI Error:", e)
        return jsonify({
            "answer": f"AI Error: {str(e)}"
        })
# ─── CONTACT ────────────────────────────────────────
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    data = request.json
    conn = get_db()
    conn.execute("INSERT INTO contacts (name, email, message) VALUES (?,?,?)",
                 (data['name'], data['email'], data['message']))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": "Message received! We'll get back to you soon."})

@app.route('/api/contact', methods=['GET'])
def get_contacts():
    conn = get_db()
    contacts = conn.execute("SELECT * FROM contacts ORDER BY created_at DESC").fetchall()
    conn.close()
    return jsonify([dict(c) for c in contacts])

# ─── COLLABORATE ────────────────────────────────────────
@app.route("/api/collaborations", methods=["GET"])
def get_collaborations():
    conn = get_db()
    posts = conn.execute("""
        SELECT * FROM collaborations
        ORDER BY id DESC
    """).fetchall()
    conn.close()
    return jsonify([dict(p) for p in posts])

@app.route("/api/collaborations", methods=["POST"])
def create_collaboration():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    type = data.get("type")
    tags = ",".join(data.get("tags", []))
    conn = get_db()
    conn.execute(
        """
        INSERT INTO collaborations (title, description, type, tags, date)
        VALUES (?, ?, ?, ?, DATE('now'))
        """,
        (title, description, type, tags)
    )
    conn.commit()
    conn.close()

    return jsonify({"message": "Post created"})

@app.route("/api/collaborations/<int:id>", methods=["DELETE"])
def delete_post(id):
    user_id = request.json.get("user_id")
    conn = get_db()
    post = conn.execute(
        "SELECT user_id FROM collaborations WHERE id=?",
        (id,)
    ).fetchone()
    if not post or post["user_id"] != user_id:
        return jsonify({"error": "Not allowed"}), 403
    conn.execute(
        "DELETE FROM collaborations WHERE id=?",
        (id,)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Post deleted"})

@app.route("/api/collaborations/<int:id>", methods=["PUT"])
def update_collaboration(id):
    data = request.json
    title = data.get("title")
    description = data.get("description")
    type = data.get("type")
    tags = ",".join(data.get("tags", []))
    conn = get_db()
    conn.execute(
        """
        UPDATE collaborations
        SET title=?, description=?, type=?, tags=?
        WHERE id=?
        """,
        (title, description, type, tags, id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Post updated successfully"})

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
