import React from "react";

export default function VaultItemRow({ item, onEdit, onDelete }) {
  return (
    <tr className="vault-row">
      <td data-label="Title">{item.title}</td>
      <td data-label="Username">{item.username}</td>
      <td data-label="Password">{item.password}</td>
      <td data-label="URL">{item.url}</td>
      <td data-label="Notes">{item.notes}</td>
      <td data-label="Actions">
        <button className="btn small edit" onClick={() => onEdit(item)}>Edit</button>
        <button className="btn small delete" onClick={() => onDelete(item.id)}>Delete</button>
      </td>

      <style jsx>{`
        .vault-row td {
          padding: 8px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-size: 0.95rem;
          word-break: break-word;
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

        /* 📱 Responsive for small screens */
        @media (max-width: 768px) {
          .vault-row {
            display: block;
            margin-bottom: 12px;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 10px 12px;
            background: rgba(255,255,255,0.03);
          }

          .vault-row td {
            display: block;
            padding: 6px 0;
            border: none;
            font-size: 0.9rem;
          }

          .vault-row td::before {
            content: attr(data-label);
            font-weight: bold;
            color: #aaa;
            display: block;
            margin-bottom: 4px;
          }

          .vault-row td:last-child {
            display: flex;
            gap: 6px;
            margin-top: 6px;
          }

          .btn.small {
            padding: 5px 8px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .vault-row td {
            font-size: 0.85rem;
          }

          .vault-row td::before {
            margin-bottom: 2px;
          }

          .btn.small {
            font-size: 0.75rem;
            padding: 4px 6px;
          }

          .vault-row {
            padding: 8px 10px;
          }
        }
      `}</style>
    </tr>
  );
}
