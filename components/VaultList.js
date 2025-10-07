import { useState } from "react";
import VaultItemRow from "./VaultItemRow";
import { v4 as uuidv4 } from "uuid";

export default function VaultList({ vaultItems, onSave }) {
  const [form, setForm] = useState({ title: "", username: "", password: "", url: "", notes: "" });
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const filteredItems = vaultItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editing) {
      onSave(vaultItems.map((v) => (v.id === editing.id ? { ...form, id: editing.id } : v)));
    } else {
      onSave([...vaultItems, { ...form, id: uuidv4() }]);
    }
    setForm({ title: "", username: "", password: "", url: "", notes: "" });
    setEditing(null);
  }

  function handleEdit(item) {
    setForm(item);
    setEditing(item);
  }

  function handleDelete(id) {
    onSave(vaultItems.filter((i) => i.id !== id));
  }

  return (
    <div className="container">
      <div className="glass-card">
        <h2 className="title">🔐 Your Vault</h2>

        <input
          type="text"
          placeholder="Search by title or username..."
          className="input search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <form onSubmit={handleSubmit} className="vault-form">
          <div className="form-grid">
            <input name="title" placeholder="Title" className="input" value={form.title} onChange={handleChange} required />
            <input name="username" placeholder="Username" className="input" value={form.username} onChange={handleChange} />
            <input name="password" placeholder="Password" className="input" value={form.password} onChange={handleChange} />
            <input name="url" placeholder="URL" className="input" value={form.url} onChange={handleChange} />
            <textarea name="notes" placeholder="Notes" className="input notes" value={form.notes} onChange={handleChange} />
          </div>
          <button type="submit" className="btn">{editing ? "Update Item" : "Add Item"}</button>
        </form>

        <table className="vault-table">
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px", fontStyle: "italic" }}>No items found.</td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <VaultItemRow key={item.id} item={item} onEdit={handleEdit} onDelete={handleDelete} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 60px 20px;
          background: #121212;
          font-family: 'Arial', sans-serif;
        }

        .glass-card {
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(15px);
          border-radius: 24px;
          padding: 40px 30px;
          width: 800px;
          max-width: 95%;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
          color: #e0e0e0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 50px rgba(0,0,0,0.8);
        }

        .title {
          margin-bottom: 24px;
          font-size: 2rem;
          text-align: center;
          color: #fff;
        }

        .input {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 12px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(40, 40, 40, 0.6);
          color: #fff;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .input::placeholder {
          color: #aaa;
        }

        .input:focus {
          background: rgba(40, 40, 40, 0.8);
          border: 1px solid #fff;
          outline: none;
        }

        .input.search {
          margin-bottom: 20px;
        }

        .vault-form .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        textarea.input.notes {
          grid-column: 1 / -1;
          min-height: 80px;
        }

        .btn {
          width: 100%;
          padding: 14px 0;
          border: none;
          border-radius: 12px;
          background: linear-gradient(90deg, #333, #555);
          color: #fff;
          font-weight: bold;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.3s ease;
        }

        .btn:hover {
          background: linear-gradient(90deg, #555, #777);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.8);
        }

        .vault-table {
          width: 100%;
          margin-top: 28px;
          border-collapse: collapse;
        }

        .vault-table td {
          padding: 10px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .vault-table tr:hover {
          background: rgba(255,255,255,0.05);
          transition: background 0.3s ease;
        }
      `}</style>
    </div>
  );
}
