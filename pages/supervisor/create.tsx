import { useState } from "react";

export default function Create() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    async function save() {
        await fetch("/api/documents/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });
        alert("Draft saved!");
      }

    async function submitDoc() {
        const res = await fetch("/api/documents/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });
        const doc = await res.json();
        await fetch("/api/documents/submit", {
            method: "POST",
            headers: { "Content-Tyoe": "application/json" },
            body: JSON.stringify({ id: doc.id}), 
        })
        alert("Submitted:");
    }

     return (
    <div style={{ padding: 20 }}>
      <h1>Create Document</h1>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} /><br />
      <button onClick={save}>Save Draft</button>{" "}
      <button onClick={submitDoc}>Submit</button>
    </div>
  );
}