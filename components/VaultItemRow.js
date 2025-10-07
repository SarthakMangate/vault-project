import React from "react";

export default function VaultItemRow({ item, onEdit, onDelete }) {
  return (
    <tr className="vault-row">
      <td>{item.title}</td>
      <td>{item.username}</td>
      <td>{item.password}</td>
      <td>{item.url}</td>
      <td>{item.notes}</td>
      <td>
        <button className="btn small edit" onClick={() => onEdit(item)}>Edit</button>
        <button className="btn small delete" onClick={() => onDelete(item.id)}>Delete</button>
      </td>
      <style jsx>{`
        .vault-row td {
          padding: 8px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-size: 0.95rem;
        }
        .btn.small {
          padding: 4px 8px;
          margin-right: 4px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }
        .btn.small.edit {
          background: rgba(255,255,255,0.25);
          color: #fff;
        }
        .btn.small.edit:hover {
          background: #ffffff;
          color: #764ba2;
        }
        .btn.small.delete {
          background: rgba(255,0,0,0.3);
          color: #fff;
        }
        .btn.small.delete:hover {
          background: #ff4b4b;
          color: #fff;
        }
      `}</style>
    </tr>
  );
}
