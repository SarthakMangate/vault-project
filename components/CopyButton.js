import { useState, useEffect } from "react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      navigator.clipboard.writeText("");
      setCopied(false);
    }, 12000);
  }

  return (
    <button onClick={copyText} className="btn small">
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
