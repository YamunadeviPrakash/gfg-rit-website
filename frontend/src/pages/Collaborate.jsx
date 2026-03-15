import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

export default function Collaborate() {

  const { coordinator } = useAuth()

  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    type: "Project",
    tags: ""
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/api/collaborations")
    setPosts(res.data)
  }

  const createPost = async () => {

    if (form.id) {

      await axios.put(
        `http://localhost:5000/api/collaborations/${form.id}`,
        {
          title: form.title,
          description: form.description,
          type: form.type,
          tags: form.tags.split(",")
        }
      )

    } else {

      await axios.post(
        "http://localhost:5000/api/collaborations",
        {
          title: form.title,
          description: form.description,
          type: form.type,
          tags: form.tags.split(",")
        }
      )

    }

    setForm({
      id: null,
      title: "",
      description: "",
      type: "Project",
      tags: ""
    })

    fetchPosts()
  }

  const deletePost = async (id) => {

    if (!coordinator) {
      alert("Only coordinators can delete posts")
      return
    }

    if (!window.confirm("Delete this post?")) return

    await axios.delete(
      `http://localhost:5000/api/collaborations/${id}`
    )

    fetchPosts()
  }

  const editPost = (post) => {

    if (!coordinator) {
      alert("Only coordinators can edit posts")
      return
    }

    setForm({
      id: post.id,
      title: post.title,
      description: post.description,
      type: post.type,
      tags: post.tags
    })
  }

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="pt-24 pb-16 max-w-6xl mx-auto px-6">

      {/* HEADER */}

      <h1 className="text-4xl font-bold text-white mb-2">
        🤝 Collaboration Board
      </h1>

      <p className="text-slate-400 mb-8">
        Find coding partners, form hackathon teams, and collaborate on projects.
      </p>


      {/* SEARCH */}

      <div className="flex gap-4 mb-10">

        <input
          className="flex-1 bg-[#1e293b] border border-white/10 rounded-xl p-3 text-white"
          placeholder="Search by skill or title..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {coordinator && (
          <button
            onClick={createPost}
            className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-semibold"
          >
            {form.id ? "Update Post" : "+ Post"}
          </button>
        )}

      </div>


      {/* CREATE POST */}

      {coordinator && (

      <div className="bg-[#111827] border border-white/10 rounded-xl p-6 mb-10">

        <h3 className="text-white font-semibold mb-4">
          {form.id ? "Edit Collaboration Post" : "Create Collaboration Post"}
        </h3>

        <div className="grid gap-4">

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="bg-[#1e293b] p-3 rounded-lg text-white"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-[#1e293b] p-3 rounded-lg text-white"
          />

          <input
            placeholder="Tags (React,Node,ML)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="bg-[#1e293b] p-3 rounded-lg text-white"
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="bg-[#1e293b] p-3 rounded-lg text-white"
          >
            <option>Project</option>
            <option>Find Partner</option>
            <option>Form Team</option>
          </select>

        </div>

      </div>

      )}


      {/* POSTS */}

      <div className="space-y-6">

        {filtered.map((post) => {

          const tags = post.tags ? post.tags.split(",") : []

          return (

            <div
              key={post.id}
              className="bg-[#111827] border border-white/10 rounded-xl p-6"
            >

              <div className="flex justify-between mb-2">

                <span className="text-green-400 text-sm">
                  {post.type}
                </span>

                <span className="text-slate-400 text-sm">
                  {post.date}
                </span>

              </div>

              <h2 className="text-xl font-semibold text-white mb-2">
                {post.title}
              </h2>

              <p className="text-slate-400 mb-4">
                {post.description}
              </p>


              {/* TAGS */}

              <div className="flex gap-2 flex-wrap mb-4">

                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-700 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}

              </div>


              <div className="flex justify-between items-center">

                <span className="text-slate-400 text-sm">
                  💬 0
                </span>


                <div className="flex gap-2">

                  <button
                    className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10"
                  >
                    Connect
                  </button>


                  {coordinator && (

                    <>
                      <button
                        onClick={() => editPost(post)}
                        className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400/10"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deletePost(post.id)}
                        className="border border-red-500 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </>

                  )}

                </div>

              </div>

            </div>

          )

        })}

      </div>

    </div>

  )

}